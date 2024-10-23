import {
  givenBeneficiaire,
  givenBeneficiaireAnonyme,
} from '@app/fixtures/givenBeneficiaire'
import { conseillerNumeriqueMediateurId } from '@app/fixtures/users/conseillerNumerique'
import { mediateurAvecActiviteMediateurId } from '@app/fixtures/users/mediateurAvecActivite'

export const beneficiaireMinimaleMediateurAvecActivite = givenBeneficiaire({
  id: 'f4dbca97-6fe8-4be1-97be-bdf5e66b9ea8',
  prenom: 'Jeanne',
  nom: 'Minimale',
  mediateurId: mediateurAvecActiviteMediateurId,
  telephone: null,
  pasDeTelephone: null,
  email: null,
  anneeNaissance: null,
  adresse: null,
  commune: null,
  communeCodePostal: null,
  communeCodeInsee: null,
  vaPoursuivreParcoursAccompagnement: null,
  genre: null,
  trancheAge: null,
  statutSocial: null,
  notes: null,
  creation: new Date('2024-01-01'),
  modification: new Date('2024-05-05'),
  suppression: null,
})

export const beneficiaireMaximaleMediateurAvecActivite = givenBeneficiaire({
  id: '36929ed7-3b6f-4ed3-9924-b5e1a6c27096',
  prenom: 'Jean',
  nom: 'Maximal',
  mediateurId: mediateurAvecActiviteMediateurId,
  telephone: '0123456789',
  pasDeTelephone: false,
  email: 'jean.maximal@coop-mediation-numerique.incubateur.anct.gouv.fr',
  anneeNaissance: 1980,
  adresse: '1 rue de la Paix',
  commune: 'Paris',
  communeCodePostal: '75001',
  communeCodeInsee: '75101',
  vaPoursuivreParcoursAccompagnement: true,
  genre: 'Masculin',
  trancheAge: 'QuaranteCinquanteNeuf',
  statutSocial: 'EnEmploi',
  notes: 'Notes de Jean Maximal',
  creation: new Date('2024-01-01'),
  modification: new Date('2024-05-05'),
  suppression: null,
})

export const beneficiaireSansAccompagnementsMediateurAvecActivite =
  givenBeneficiaire({
    id: 'b8a9306e-6e3d-410d-bf21-6ca4e17ee371',
    mediateurId: mediateurAvecActiviteMediateurId,
    anonyme: false,
    prenom: 'Félix',
    nom: 'Sans accompagnements',
    commune: 'Crolles',
    communeCodePostal: '38920',
    communeCodeInsee: '38140',
    vaPoursuivreParcoursAccompagnement: null,
    genre: 'Masculin',
    trancheAge: 'VingtCinqTrenteNeuf',
    statutSocial: 'EnEmploi',
    notes: null,
    creation: new Date('2024-03-03'),
    modification: new Date('2024-06-06'),
    suppression: null,
  })

export const beneficiaireAnonymeMediateurAvecActivite =
  givenBeneficiaireAnonyme({
    id: 'c6f21f86-8334-488c-ba48-c29a4ed74669',
    mediateurId: mediateurAvecActiviteMediateurId,
    anonyme: true,
    commune: null,
    communeCodePostal: null,
    communeCodeInsee: null,
    vaPoursuivreParcoursAccompagnement: true,
    genre: null,
    trancheAge: 'DixHuitVingtQuatre',
    creation: new Date('2024-08-08'),
    modification: new Date('2024-08-12'),
    suppression: null,
  })

export const beneficiairesMediateurAvecActivite = [
  beneficiaireMinimaleMediateurAvecActivite,
  beneficiaireMaximaleMediateurAvecActivite,
  beneficiaireSansAccompagnementsMediateurAvecActivite,
  beneficiaireAnonymeMediateurAvecActivite,
]

export const beneficiaireMinimaleConseillerNumerique = givenBeneficiaire({
  id: 'f24c9b33-c9d6-4d4b-8785-0b7664a8cf5d',
  prenom: 'Anna',
  nom: 'Minimale',
  mediateurId: conseillerNumeriqueMediateurId,
  telephone: null,
  pasDeTelephone: null,
  email: null,
  anneeNaissance: null,
  adresse: null,
  commune: null,
  communeCodePostal: null,
  communeCodeInsee: null,
  vaPoursuivreParcoursAccompagnement: null,
  genre: null,
  trancheAge: null,
  statutSocial: null,
  notes: null,
  creation: new Date('2024-01-01'),
  modification: new Date('2024-05-05'),
  suppression: null,
})

export const beneficiaireMaximaleConseillerNumerique = givenBeneficiaire({
  id: '7181b867-d944-40b0-8c3c-6b6f4a4cbdc8',
  prenom: 'Anatole',
  nom: 'Maximal',
  mediateurId: conseillerNumeriqueMediateurId,
  telephone: '0123456789',
  pasDeTelephone: false,
  email: 'anatole.maximal@coop-mediation-numerique.incubateur.anct.gouv.fr',
  anneeNaissance: 1980,
  adresse: '2 rue de la République',
  commune: 'Lyon',
  communeCodePostal: '69002',
  communeCodeInsee: '69382',
  vaPoursuivreParcoursAccompagnement: false,
  genre: 'Masculin',
  trancheAge: 'QuaranteCinquanteNeuf',
  statutSocial: 'EnEmploi',
  notes: 'Notes de Anatole Maximal',
  creation: new Date('2024-01-01'),
  modification: new Date('2024-05-05'),
  suppression: null,
})

export const beneficiaireSansAccompagnementsConseillerNumerique =
  givenBeneficiaire({
    id: '2bfb6e40-7add-47b8-86a7-cc58aa32fe01',
    mediateurId: conseillerNumeriqueMediateurId,
    anonyme: false,
    prenom: 'Antoine',
    nom: 'Sans accompagnements',
    commune: 'Crolles',
    communeCodePostal: '38920',
    communeCodeInsee: '38140',
    vaPoursuivreParcoursAccompagnement: null,
    genre: 'Masculin',
    trancheAge: 'VingtCinqTrenteNeuf',
    statutSocial: 'SansEmploi',
    notes: null,
    creation: new Date('2024-08-03'),
    modification: new Date('2024-08-06'),
    suppression: null,
  })

export const beneficiaireAnonymeConseillerNumerique = givenBeneficiaireAnonyme({
  id: '1fe1c88b-25a0-4414-92de-7171d2c39ad5',
  mediateurId: conseillerNumeriqueMediateurId,
  anonyme: true,
  commune: null,
  communeCodePostal: null,
  communeCodeInsee: null,
  vaPoursuivreParcoursAccompagnement: true,
  genre: 'Feminin',
  trancheAge: null,
  creation: new Date('2024-08-08'),
  modification: new Date('2024-08-12'),
  suppression: null,
})

export const beneficiairesConseillerNumerique = [
  beneficiaireMinimaleConseillerNumerique,
  beneficiaireMaximaleConseillerNumerique,
  beneficiaireSansAccompagnementsConseillerNumerique,
  beneficiaireAnonymeConseillerNumerique,
]

export const fixtureBeneficiaires = [
  ...beneficiairesMediateurAvecActivite,
  ...beneficiairesConseillerNumerique,
]
