import { givenBeneficiaire } from '@app/fixtures/givenBeneficiaire'
import { mediateurAvecActiviteMediateurId } from '@app/fixtures/users'

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

export const beneficiairesMediateurAvecActivite = [
  beneficiaireMinimaleMediateurAvecActivite,
  beneficiaireMaximaleMediateurAvecActivite,
]

export const fixtureBeneficiaires = [...beneficiairesMediateurAvecActivite]
