import { TargetAudience } from '@prisma/client'
import { SelectOption } from '@app/ui/components/Form/utils/options'

export const targetAudienceCategories = [
  'Acteurs du numérique d’intérêt général',
  'Bénéficiaires',
] as const

export type TargetAudienceCategory = (typeof targetAudienceCategories)[number]

// Create the same enum but sorted in alphabetical order
export const targetAudienceLabels: {
  [targetAudience in TargetAudience]: string
} = {
  [TargetAudience.AdministrationsEtablissementsPublics]:
    'Administrations & établissements publics',
  [TargetAudience.Adultes]: 'Adultes',
  [TargetAudience.AidantsNumeriques]: 'Aidants numériques',
  [TargetAudience.Adolescents_12_18]: 'Adolescents (12-18 ans)',
  [TargetAudience.AutresProfessionnels]: 'Autres professionnels',
  [TargetAudience.AssociationsActeursEss]: 'Associations & acteurs de l’ESS',
  [TargetAudience.CollectivitesTerritoriales]: 'Collectivités territoriales',
  [TargetAudience.Elus]: 'Élus',
  [TargetAudience.Enfants_6_12]: 'Enfants (6-12 ans)',
  [TargetAudience.EnseignantsProfessionnelsFormation]:
    'Enseignants & professionnels de la formation',
  [TargetAudience.Entreprises]: 'Entreprises',
  [TargetAudience.JeunesAdultes_18_25]: 'Jeunes adultes (18-25 ans)',
  [TargetAudience.JeunesEnfants_6]: 'Jeunes enfants (<6 ans)',
  [TargetAudience.MediateursNumeriques]: 'Médiateurs numériques',
  [TargetAudience.Particuliers]: 'Particuliers',
  [TargetAudience.Parents]: 'Parents',
  [TargetAudience.PersonneAllophone]: 'Personne allophone',
  [TargetAudience.PersonneSituationHandicap]:
    'Personne en situation de handicap',
  [TargetAudience.PersonneSituationIlletrisme]:
    'Personne en situation d’illetrisme',
  [TargetAudience.PersonnesEnInsertionSociale]:
    'Personnes en insertion sociale',
  [TargetAudience.PersonnesInsertionProfessionnelle]:
    'Personnes en insertion professionnelle',
  [TargetAudience.PersonnesPerteAutonomie]: 'Personnes en perte d’autonomie',
  [TargetAudience.PersonnesTresEloigneesNumerique]:
    'Personnes très éloignées du numérique',
  [TargetAudience.RefugiesDemandeursAsile]: 'Réfugiés/demandeurs d’asile',
  [TargetAudience.SeniorsPersonnesAgees]: 'Seniors & personnes âgées',
  [TargetAudience.TousPublics]: 'Tous publics',
  [TargetAudience.TravailleursSociaux]: 'Travailleurs sociaux',
}

export const targetAudienceCategoriesMap: {
  [targetAudience in TargetAudience]: TargetAudienceCategory
} = {
  [TargetAudience.AdministrationsEtablissementsPublics]:
    'Acteurs du numérique d’intérêt général',
  [TargetAudience.Adultes]: 'Bénéficiaires',
  [TargetAudience.AidantsNumeriques]: 'Acteurs du numérique d’intérêt général',
  [TargetAudience.Adolescents_12_18]: 'Bénéficiaires',
  [TargetAudience.AutresProfessionnels]:
    'Acteurs du numérique d’intérêt général',
  [TargetAudience.AssociationsActeursEss]:
    'Acteurs du numérique d’intérêt général',
  [TargetAudience.CollectivitesTerritoriales]:
    'Acteurs du numérique d’intérêt général',
  [TargetAudience.Elus]: 'Acteurs du numérique d’intérêt général',
  [TargetAudience.Enfants_6_12]: 'Bénéficiaires',
  [TargetAudience.EnseignantsProfessionnelsFormation]:
    'Acteurs du numérique d’intérêt général',
  [TargetAudience.Entreprises]: 'Acteurs du numérique d’intérêt général',
  [TargetAudience.JeunesAdultes_18_25]: 'Bénéficiaires',
  [TargetAudience.JeunesEnfants_6]: 'Bénéficiaires',
  [TargetAudience.MediateursNumeriques]:
    'Acteurs du numérique d’intérêt général',
  [TargetAudience.Particuliers]: 'Bénéficiaires',
  [TargetAudience.Parents]: 'Bénéficiaires',
  [TargetAudience.PersonneAllophone]: 'Bénéficiaires',
  [TargetAudience.PersonneSituationHandicap]: 'Bénéficiaires',
  [TargetAudience.PersonneSituationIlletrisme]: 'Bénéficiaires',
  [TargetAudience.PersonnesEnInsertionSociale]: 'Bénéficiaires',
  [TargetAudience.PersonnesInsertionProfessionnelle]: 'Bénéficiaires',
  [TargetAudience.PersonnesPerteAutonomie]: 'Bénéficiaires',
  [TargetAudience.PersonnesTresEloigneesNumerique]: 'Bénéficiaires',
  [TargetAudience.RefugiesDemandeursAsile]: 'Bénéficiaires',
  [TargetAudience.SeniorsPersonnesAgees]: 'Bénéficiaires',
  [TargetAudience.TousPublics]: 'Bénéficiaires',
  [TargetAudience.TravailleursSociaux]:
    'Acteurs du numérique d’intérêt général',
}
export const targetAudienceOptions = Object.entries(targetAudienceLabels).map(
  ([value, name]) => ({
    value,
    name,
  }),
)

export const categoryTargetAudiences = (() => {
  const index: { [category in TargetAudienceCategory]: TargetAudience[] } = {
    'Acteurs du numérique d’intérêt général': [],
    Bénéficiaires: [],
  }

  for (const [targetAudience, category] of Object.entries(
    targetAudienceCategoriesMap,
  )) {
    index[category].push(targetAudience as TargetAudience)
  }

  return index
})()

export const categoryTargetAudiencesOptions = (() => {
  const index: { [category in TargetAudienceCategory]: SelectOption[] } = {
    'Acteurs du numérique d’intérêt général': [],
    Bénéficiaires: [],
  }

  for (const [targetAudience, category] of Object.entries(
    targetAudienceCategoriesMap,
  )) {
    index[category].push({
      name: targetAudienceLabels[targetAudience as TargetAudience],
      value: targetAudience as TargetAudience,
    })
  }

  return index
})()
