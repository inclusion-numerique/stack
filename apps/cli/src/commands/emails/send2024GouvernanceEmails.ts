import { existsSync, writeFileSync } from 'node:fs'
import { Command } from '@commander-js/extra-typings'
import { prismaClient } from '@app/web/prismaClient'
import picocolors from 'picocolors'
import { varDirectory } from '@app/config/varDirectory'
import { parseCsvFile } from '@app/web/data/parseCsvFile'
import { stringify } from 'csv-stringify/sync'
// import { infosGouvernancePourMembres } from '@app/emails/templates/infosGouvernancePourMembres'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { compileMjml } from '@app/emails/mjml'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'
import { infosGouvernancePourMembres } from '@app/emails/templates/infosGouvernancePourMembres'
import {
  configureDeploymentTarget,
  DeploymentTargetOption,
} from '@app/cli/deploymentTarget'
import { output } from '@app/cli/output'

/**
 * This file is a one shot script to send emails to gouvernance members
 * to inform them of the status of their gouvernance.
 *
 * It is not meant to be used as a regular command, but as a one shot script.
 *
 * The already sent emails are stored in a non-versioned local csv file to avoid sending the same email twice.
 */

type EmailRecipient = {
  type: string
  nom: string | null
  email: string
}

// Same headers but lowercase snakecase without accents

const sentEmailHeaders = [
  'envoye',
  'departement_code',
  'departement_nom',
  'avec_besoins',
  'gouvernance_id',
  'lien_gouvernance',
  'email',
  'nom',
  'type',
] as const

type SentEmailInfo = {
  envoye: string // Date de l’envoi
  departement_code: string
  departement_nom: string
  avec_besoins: string
  gouvernance_id: string
  lien_gouvernance: string
  email: string
  nom: string
  type: string
}

const sentEmailsFile = `${varDirectory}/sent_2024_gouvernance_emails.csv`

// Email can be sent to the same person for different gouvernances
const sentEmailDuplicationString = (email: string, departementCode: string) =>
  `${email}-${departementCode}`

const getSentEmails = async () => {
  if (!existsSync(sentEmailsFile)) {
    return { info: [], emails: new Set<string>() }
  }
  const data = await parseCsvFile<SentEmailInfo>(
    sentEmailsFile,
    sentEmailHeaders,
  )

  return {
    info: data,
    emails: new Set(
      data.map((info) =>
        sentEmailDuplicationString(info.email, info.departement_code),
      ),
    ),
  }
}

const booleanToString = (value: boolean) => (value ? 'Oui' : 'Non')

const appendSentEmail = (info: SentEmailInfo) => {
  if (!existsSync(sentEmailsFile)) {
    // Create file with one row of data
    const headers = sentEmailHeaders.join(',')
    // Write to sentEmailsFile with writeFileSync
    writeFileSync(sentEmailsFile, `${headers}\r\n`)
  }

  // Write new csv line to file, append, not replace data
  const row = stringify([sentEmailHeaders.map((header) => info[header])], {
    delimiter: ',',
    record_delimiter: '\r\n', // For Windows compatibility
  })

  writeFileSync(sentEmailsFile, row, { flag: 'a' })
}

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
          id: true,
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

export type PrefecturesAndGouvernances = Awaited<
  ReturnType<typeof getPrefecturesWithGouvernances>
>

export type PrefectureWithGouvernance =
  PrefecturesAndGouvernances['prefecturesAvecGouvernanceV2AvecBesoins'][number]

export type GouvernanceForEmailMembre =
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
    type: 'Membre - Créateur formulaire',
    nom: createur.name?.trim(),
    email: createur.email,
  },
  {
    type: 'Membre - Contact Politique',
    nom: `${contactPolitique?.prenom} ${contactPolitique?.nom}`.trim(),
    email: contactPolitique?.email,
  },
  {
    type: 'Membre - Contact Technique',
    nom: `${contactTechnique?.prenom} ${contactTechnique?.nom}`.trim(),
    email: contactTechnique?.email,
  },
  {
    type: 'Membre - Contact Structure',
    nom: `${contactStructure?.prenom} ${contactStructure?.nom}`.trim(),
    email: contactStructure?.email,
  },
]

const deduplicateAndCleanContacts = <
  T extends {
    email: string | null | undefined
    nom: string | null | undefined
    type: string
  },
>(
  contacts: T[],
): EmailRecipient[] => {
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

type GouvernanceWithContacts = Awaited<
  ReturnType<typeof getContactsForGouvernance>
>

const sendEmailsForGouvernances = async ({
  sentEmails,
  gouvernances,
  hasBesoins,
}: {
  sentEmails: Awaited<ReturnType<typeof getSentEmails>>
  gouvernances: GouvernanceWithContacts[]
  hasBesoins: boolean
}) => {
  let done = 0

  const total = gouvernances.reduce(
    (accumulator, { deduplicatedContacts }) =>
      accumulator + deduplicatedContacts.length,
    0,
  )

  for (const {
    departement,
    gouvernance,
    deduplicatedContacts,
  } of gouvernances) {
    const url = `http://inclusion-numerique.anct.gouv.fr/gouvernances/departements/${departement.code}`
    for (const contact of deduplicatedContacts) {
      if (
        sentEmails.emails.has(
          sentEmailDuplicationString(contact.email, departement.code),
        )
      ) {
        output(
          `Email already sent to ${contact.email} (${departement.nom} - ${contact.type}), skipping`,
        )
        done += 1
        continue
      }

      const emailProps = {
        departement: departement.nom,
        hasBesoins,
        url,
      }

      const emailContent = {
        subject: infosGouvernancePourMembres.subject(emailProps),
        text: infosGouvernancePourMembres.text(emailProps),
        mjml: infosGouvernancePourMembres.mjml(emailProps),
        html: '',
      }

      emailContent.html = compileMjml(emailContent.mjml)

      const to = contact.nom
        ? `${contact.nom} <${contact.email}>`
        : contact.email

      const reallyExecuteSendMail = false

      if (reallyExecuteSendMail) {
        // eslint-disable-next-line no-await-in-loop
        const emailResult = await emailTransport.sendMail({
          to,
          from: ServerWebAppConfig.Email.from,
          subject: emailContent.subject,
          text: emailContent.text,
          html: emailContent.html,
          replyTo: 'societe.numerique@anct.gouv.fr',
        })

        throwOnSendMailFailure(emailResult)
      }

      appendSentEmail({
        envoye: new Date().toISOString(),
        departement_code: departement.code,
        departement_nom: departement.nom,
        avec_besoins: booleanToString(hasBesoins),
        gouvernance_id: gouvernance.id,
        lien_gouvernance: url,
        email: contact.email,
        nom: contact.nom || '',
        type: contact.type,
      })

      // Output progress every 5% of contacts
      done += 1

      if (done % Math.floor(total / 20) === 0) {
        output(`Sent ${done} emails - ${Math.round((100 * done) / total)}%`)
      }
    }
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

    const sentEmails = await getSentEmails()

    await sendEmailsForGouvernances({
      sentEmails,
      gouvernances: prefecturesAvecGouvernanceV2SansBesoinsAvecContacts,
      hasBesoins: false,
    })

    output(
      `Sent emails to ${prefecturesAvecGouvernanceV2SansBesoinsAvecContacts.length} contacts of gouvernances without besoins en ingénierie financière`,
    )

    await sendEmailsForGouvernances({
      sentEmails,
      gouvernances: prefecturesAvecGouvernanceV2AvecBesoinsAvecContacts,
      hasBesoins: true,
    })

    output(
      `Sent emails to ${prefecturesAvecGouvernanceV2AvecBesoinsAvecContacts.length} contacts of gouvernances with besoins en ingénierie financière`,
    )
  })
