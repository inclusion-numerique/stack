import { Command } from '@commander-js/extra-typings'
import { prismaClient } from '@app/web/prismaClient'
import picocolors from 'picocolors'
import {
  configureDeploymentTarget,
  DeploymentTargetOption,
} from '@app/cli/deploymentTarget'
import { output } from '@app/cli/output'

const getPrefecturesWithGouvernances = async () => {
  const departements = await prismaClient.departement.findMany({
    select: {
      nom: true,
      code: true,
      gouvernancesRemontees: {
        where: {
          supression: null,
        },
        orderBy: [
          {
            v2Enregistree: 'asc',
          },
          {
            creation: 'desc',
          },
        ],
        select: {
          createur: true,
          v2Enregistree: true,
          besoinsEnIngenierieFinanciere: true,
          sousPrefetReferentEmail: true,
          sousPrefetReferentNom: true,
          sousPrefetReferentPrenom: true,
          membres: {
            include: {
              formulaireGouvernance: {
                include: {
                  createur: true,
                  contactPolitique: true,
                  contactTechnique: true,
                  contactStructure: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      code: 'asc',
    },
  })

  // Ni v2 enregistrée, ni besoins en ingénierie financière
  const prefecturesSansGouvernance = departements.filter(
    ({ gouvernancesRemontees }) =>
      !gouvernancesRemontees.some(
        ({ v2Enregistree, besoinsEnIngenierieFinanciere }) =>
          !!v2Enregistree ||
          !!besoinsEnIngenierieFinanciere?.priorisationEnregistree,
      ),
  )

  const prefecturesAvecSeulementBesoin = departements.filter(
    ({ gouvernancesRemontees }) =>
      gouvernancesRemontees.some(
        ({ besoinsEnIngenierieFinanciere, v2Enregistree }) =>
          !v2Enregistree &&
          !!besoinsEnIngenierieFinanciere?.priorisationEnregistree,
      ),
  )

  const prefecturesAvecGouvernanceV2 = departements
    .filter(({ gouvernancesRemontees }) =>
      gouvernancesRemontees.some(({ v2Enregistree }) => !!v2Enregistree),
    )
    .map((departement) => ({
      departement,
      gouvernance: departement.gouvernancesRemontees[0],
    }))

  const prefecturesAvecGouvernanceV2SansBesoins =
    prefecturesAvecGouvernanceV2.filter(
      ({ gouvernance }) =>
        !gouvernance.besoinsEnIngenierieFinanciere?.priorisationEnregistree,
    )

  const prefecturesAvecGouvernanceV2AvecBesoins =
    prefecturesAvecGouvernanceV2.filter(
      ({ gouvernance }) =>
        !!gouvernance.besoinsEnIngenierieFinanciere?.priorisationEnregistree,
    )

  return {
    prefecturesSansGouvernance,
    prefecturesAvecSeulementBesoin,
    prefecturesAvecGouvernanceV2SansBesoins,
    prefecturesAvecGouvernanceV2AvecBesoins,
  }
}

type PrefecturesAndGouvernances = Awaited<
  ReturnType<typeof getPrefecturesWithGouvernances>
>

type PrefectureWithGouvernance =
  PrefecturesAndGouvernances['prefecturesAvecGouvernanceV2AvecBesoins'][number]

type GouvernanceForEmailMembre =
  PrefectureWithGouvernance['gouvernance']['membres'][number]

const getFormulaireGouvernancesForMembreWhere = ({
  regionCode,
  communeCode,
  epciCode,
  departementCode,
  siretStructure,
}: GouvernanceForEmailMembre['formulaireGouvernance']) => {
  if (regionCode) {
    return { regionCode }
  }

  if (communeCode) {
    return { communeCode }
  }

  if (epciCode) {
    return { epciCode }
  }

  if (siretStructure) {
    // Only structures from same departement
    return { siretStructure, departementCode }
  }

  if (departementCode) {
    return { departementCode }
  }

  throw new Error('No way to find formulaireGouvernance for this membre')
}

const getFormulaireGouvernancesForMembre = async (
  formulaireGouvernance: GouvernanceForEmailMembre['formulaireGouvernance'],
) => {
  const formulaireGouvernances =
    await prismaClient.formulaireGouvernance.findMany({
      select: {
        id: true,
        createur: true,
        contactPolitique: true,
        contactTechnique: true,
        contactStructure: true,
      },
      where: {
        AND: [
          getFormulaireGouvernancesForMembreWhere(formulaireGouvernance),
          { annulation: null, confirmeEtEnvoye: { not: null } },
        ],
      },
    })

  if (formulaireGouvernances.length === 0) {
    throw new Error('No formulaireGouvernance found for this membre')
  }

  return formulaireGouvernances
}

const getContactsForFormulaireGouvernance = ({
  contactPolitique,
  contactTechnique,
  contactStructure,
  createur,
}: Pick<
  GouvernanceForEmailMembre['formulaireGouvernance'],
  'contactPolitique' | 'contactTechnique' | 'contactStructure' | 'createur'
>) => [
  {
    type: 'Créateur formulaire',
    nom: createur.name?.trim(),
    email: createur.email,
  },
  {
    type: 'Politique',
    nom: `${contactPolitique?.prenom} ${contactPolitique?.nom}`.trim(),
    email: contactPolitique?.email,
  },
  {
    type: 'Technique',
    nom: `${contactTechnique?.prenom} ${contactTechnique?.nom}`.trim(),
    email: contactTechnique?.email,
  },
  {
    type: 'Structure',
    nom: `${contactStructure?.prenom} ${contactStructure?.nom}`.trim(),
    email: contactStructure?.email,
  },
]

const deduplicateAndCleanContacts = <
  T extends {
    email: string | null | undefined
    nom: string | null | undefined
  },
>(
  contacts: T[],
): (T & {
  email: string
  nom: string | null
})[] => {
  const contactsWithEmail = contacts
    .filter(
      (contact): contact is T & { email: string } => !!contact.email?.trim(),
    )
    .map(
      (
        contact,
      ): T & {
        email: string
        nom: string | null
      } => ({
        ...contact,
        email: contact.email.trim().toLowerCase(),
        nom: contact.nom?.trim() || null,
      }),
    )

  const contactsByEmail = new Map<
    string,
    T & {
      email: string
      nom: string | null
    }
  >(contactsWithEmail.map((contact) => [contact.email, contact]))

  return [...contactsByEmail.values()]
}

const getContactsForGouvernance = async ({
  gouvernance,
  departement,
}: PrefectureWithGouvernance) => {
  const sousPrefet = {
    type: 'Sous-Préfet référent',
    nom: `${gouvernance.sousPrefetReferentPrenom} ${gouvernance.sousPrefetReferentNom}`.trim(),
    email: gouvernance.sousPrefetReferentEmail,
  }

  const createur = {
    type: 'Créateur gouvernance',
    nom: gouvernance.createur.name?.trim(),
    email: gouvernance.createur.email,
  }

  const formulairesGouvernancesMembres = gouvernance.membres.map(
    ({ formulaireGouvernance }) => formulaireGouvernance,
  )

  const formulairesGouvernancesArrays = await Promise.all(
    formulairesGouvernancesMembres.map(getFormulaireGouvernancesForMembre),
  )

  const formulairesGouvernances = formulairesGouvernancesArrays.flat()

  const formulaireGouvernanceContacts = formulairesGouvernances.flatMap(
    getContactsForFormulaireGouvernance,
  )

  const deduplicatedContacts = deduplicateAndCleanContacts([
    sousPrefet,
    createur,
    ...formulaireGouvernanceContacts,
  ])

  return {
    departement,
    gouvernance,
    deduplicatedContacts,
  }
}

export const send2024GouvernanceEmails = new Command()
  .command('gouvernances:send-2024-emails')
  .addOption(DeploymentTargetOption)
  .description(
    'Fetches all gouvernance members and sends an email to each of them to inform them of the gouvernance status',
  )
  .action(async (args) => {
    await configureDeploymentTarget(args)

    const {
      prefecturesAvecGouvernanceV2SansBesoins,
      prefecturesAvecGouvernanceV2AvecBesoins,
      prefecturesAvecSeulementBesoin,
      prefecturesSansGouvernance,
    } = await getPrefecturesWithGouvernances()

    const prefecturesAvecGouvernanceV2SansBesoinsAvecContacts =
      await Promise.all(
        prefecturesAvecGouvernanceV2SansBesoins.map(getContactsForGouvernance),
      )

    const prefecturesAvecGouvernanceV2AvecBesoinsAvecContacts =
      await Promise.all(
        prefecturesAvecGouvernanceV2AvecBesoins.map(getContactsForGouvernance),
      )

    output(
      picocolors.bgYellow(
        `${prefecturesSansGouvernance.length} Préfectures sans gouvernance :`,
      ),
    )
    output(
      prefecturesSansGouvernance
        .map(({ code, nom }) => `${code} - ${nom}`)
        .join('\n'),
    )

    output(
      picocolors.bgYellow(
        `${prefecturesAvecSeulementBesoin.length} Préfectures avec seulement des besoins en ingénierie financière :`,
      ),
    )
    output(
      prefecturesAvecSeulementBesoin
        .map(({ code, nom }) => `${code} - ${nom}`)
        .join('\n'),
    )

    output(
      picocolors.bgYellow(
        `${prefecturesAvecGouvernanceV2SansBesoinsAvecContacts.length} Préfectures avec une gouvernance v2 sans besoins en ingénierie financière :`,
      ),
    )
    output(
      prefecturesAvecGouvernanceV2SansBesoinsAvecContacts
        .map(
          ({ departement: { code, nom }, deduplicatedContacts }) =>
            `${code} - ${nom}:\n  - ${deduplicatedContacts.length} contacts`,
        )
        .join('\n'),
    )

    output(
      picocolors.bgYellow(
        `${prefecturesAvecGouvernanceV2AvecBesoinsAvecContacts.length} Préfectures avec une gouvernance v2 avec besoins en ingénierie financière :`,
      ),
    )

    output(
      prefecturesAvecGouvernanceV2AvecBesoinsAvecContacts
        .map(
          ({ departement: { code, nom }, deduplicatedContacts }) =>
            `${code} - ${nom}:\n  - ${deduplicatedContacts.length} contacts`,
        )
        .join('\n'),
    )

    output(
      picocolors.bgYellow(
        `Sending emails to ${prefecturesAvecGouvernanceV2SansBesoinsAvecContacts.reduce(
          (accumulator, { deduplicatedContacts }) =>
            accumulator + deduplicatedContacts.length,
          0,
        )} contacts of gouvernances without besoins en ingénierie financière`,
      ),
    )

    output(
      picocolors.bgYellow(
        `Sending emails to ${prefecturesAvecGouvernanceV2AvecBesoinsAvecContacts.reduce(
          (accumulator, { deduplicatedContacts }) =>
            accumulator + deduplicatedContacts.length,
          0,
        )} contacts of gouvernances with besoins en ingénierie financière`,
      ),
    )
  })
