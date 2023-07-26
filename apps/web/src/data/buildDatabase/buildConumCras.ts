import type { Prisma } from '@prisma/client'
import { output } from '@app/cli/output'
import { getConumCrasByDepartement } from '@app/web/data/conumCras'
import type { BuildDepartementsOutput } from '@app/web/data/buildDatabase/buildDepartements'

export const buildConumCras = async ({
  departements,
}: {
  departements: BuildDepartementsOutput
}) => {
  output(
    '-- Getting data from local json (from preprocessed cli data:reduce-cras)...',
  )

  const crasByDepartement = await getConumCrasByDepartement()

  output(`-- Preparing data (${crasByDepartement.length})...`)

  const data: Prisma.CraConseillerNumeriqueParDepartementCreateManyInput[] = []

  for (const cras of crasByDepartement) {
    if (!departements.codes.has(cras.departement)) {
      console.error('Departements', [...departements.codes.values()].sort())

      console.error('Missing departement', cras)

      throw new Error('Missing departement')
    }

    data.push({
      codeDepartement: cras.departement,

      usagers: cras.usagers,
      accompagnements: cras.accompagnements,

      ageMoins12ans: cras.moins12ans,
      age12a18ans: cras.de12a18ans,
      age18a35ans: cras.de18a35ans,
      age35a60ans: cras.de35a60ans,
      agePlus60ans: cras.plus60ans,

      statutEtudiant: cras.statut.etudiant,
      statutSansEmploi: cras.statut.sansEmploi,
      statutEnEmploi: cras.statut.enEmploi,
      statutRetraite: cras.statut.retraite,
      statutHeterogene: cras.statut.heterogene,

      accompagnementAtelier: cras.accompagnement.atelier,
      accompagnementIndividuel: cras.accompagnement.individuel,
      accompagnementRedirection: cras.accompagnement.redirection,

      activiteCollectif: cras.activite.collectif,
      activiteIndividuel: cras.activite.individuel,
      activitePonctuel: cras.activite.ponctuel,

      themeAutre: cras.themes.autre ?? 0,
      themeEquipementInformatique: cras.themes.equipementInformatique ?? 0,
      themeDemarcheEnLigne: cras.themes.demarcheEnLigne ?? 0,
      themeSmartphone: cras.themes.smartphone ?? 0,
      themeCourriel: cras.themes.courriel ?? 0,
      themeInternet: cras.themes.internet ?? 0,
      themeVocabulaire: cras.themes.vocabulaire ?? 0,
      themeTraitementTexte: cras.themes.traitementTexte ?? 0,
      themeContenusNumeriques: cras.themes.contenusNumeriques ?? 0,
      themeTrouverEmploi: cras.themes.trouverEmploi ?? 0,
      themeEchanger: cras.themes.echanger ?? 0,
      themeTpePme: cras.themes.tpePme ?? 0,
      themeAccompagnerEnfant: cras.themes.accompagnerEnfant ?? 0,
      themeSecurite: cras.themes.securite ?? 0,
      themeFraudeEtHarcelement: cras.themes.fraudeEtHarcelement ?? 0,
      themeSante: cras.themes.sante ?? 0,
      themeDiagnostic: cras.themes.diagnostic ?? 0,
      themeBudget: cras.themes.budget ?? 0,
      themeScolaire: cras.themes.scolaire ?? 0,
    })
  }

  return { data }
}

export type BuildConumCrasOutput = Awaited<ReturnType<typeof buildConumCras>>
