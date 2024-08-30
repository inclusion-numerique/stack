import { Meta, StoryObj } from '@storybook/react'
import { Activite } from '@app/web/cra/activitesQueries'
import {
  AccompagnementLabel,
  QuantifiedShare,
} from '@app/web/app/coop/mes-statistiques/quantifiedShare'
import { Accueil } from './Accueil'

export default {
  title: 'Coop/Accueil',
  component: Accueil,
} as Meta<typeof Accueil>

type Story = StoryObj<typeof Accueil>

const accompagnementBeneficiairesDernierMois = {
  accompagnements: 329,
  beneficiaires: 477,
  anonymes: 223,
}

const accompagnementBeneficiairesDerniereSemaine = {
  accompagnements: 68,
  beneficiaires: 136,
  anonymes: 58,
}

const modalitesAccompagnementDernierMois: (QuantifiedShare<AccompagnementLabel> & {
  participants?: number
})[] = [
  {
    label: 'Accompagnements individuels',
    count: 121,
    participants: 0,
    proportion: 0,
  },
  { label: 'Ateliers collectifs', count: 4, participants: 40, proportion: 0 },
  {
    label: 'Aide aux démarches administratives',
    count: 68,
    participants: 0,
    proportion: 0,
  },
]

const modalitesAccompagnementDerniereSemaine: (QuantifiedShare<AccompagnementLabel> & {
  participants?: number
})[] = [
  {
    label: 'Accompagnements individuels',
    count: 32,
    participants: 0,
    proportion: 0,
  },
  { label: 'Ateliers collectifs', count: 1, participants: 8, proportion: 0 },
  {
    label: 'Aide aux démarches administratives',
    count: 18,
    participants: 0,
    proportion: 0,
  },
]

const activites: Activite[] = [
  {
    type: 'individuel',
    cra: {
      id: '0aebe496-6403-4feb-a60a-da2e228e95d2',
      date: new Date('2024-06-15T00:00:00.000Z'),
      autonomie: null,
      thematiques: ['Sante', 'CultureNumerique'],
      duree: 90,
      materiel: [],
      notes: null,
      lieuAccompagnement: 'ADistance',
      lieuActivite: null,
      lieuAccompagnementDomicileCommune: null,
      lieuAccompagnementDomicileCodeInsee: null,
      lieuAccompagnementDomicileCodePostal: null,
      orienteVersStructure: null,
      structureDeRedirection: null,
      beneficiaire: {
        id: 'f4dbca97-6fe8-4be1-97be-bdf5e66b9ea8',
        prenom: 'Jeanne',
        nom: 'Minimale',
        trancheAge: null,
        statutSocial: null,
        genre: null,
        commune: null,
        communeCodePostal: null,
        vaPoursuivreParcoursAccompagnement: null,
        _count: {
          activites: 5,
        },
      },
    },
  },
  {
    type: 'collectif',
    cra: {
      id: 'f9b4fdb1-f43b-4559-b825-da69343bb6c9',
      date: new Date('2024-07-05T00:00:00.000Z'),
      niveau: null,
      thematiques: [
        'BanqueEtAchatsEnLigne',
        'NavigationSurInternet',
        'CreerAvecLeNumerique',
      ],
      titreAtelier:
        'Conduites à risque sur internet et les bons usages du numérique',
      duree: 90,
      notes: null,
      lieuAtelier: 'Autre',
      lieuActivite: null,
      lieuAccompagnementAutreCommune: null,
      lieuAccompagnementAutreCodeInsee: null,
      lieuAccompagnementAutreCodePostal: null,
      participants: [
        {
          beneficiaire: {
            id: '36929ed7-3b6f-4ed3-9924-b5e1a6c27096',
            prenom: 'Jean',
            nom: 'Maximal',
          },
        },
        {
          beneficiaire: {
            id: 'c6f21f86-8334-488c-ba48-c29a4ed74669',
            prenom: null,
            nom: null,
          },
        },
        {
          beneficiaire: {
            id: 'f4dbca97-6fe8-4be1-97be-bdf5e66b9ea8',
            prenom: 'Jeanne',
            nom: 'Minimale',
          },
        },
      ],
      participantsAnonymes: {
        id: 'd372d0d4-2bb6-4a4a-add4-83db060a5ad2',
        total: 10,
        genreFeminin: 0,
        genreMasculin: 0,
        genreNonCommunique: 10,
        trancheAgeMineur: 0,
        trancheAgeDixHuitVingtQuatre: 0,
        trancheAgeVingtCinqTrenteNeuf: 3,
        trancheAgeQuaranteCinquanteNeuf: 5,
        trancheAgeSoixanteSoixanteNeuf: 0,
        trancheAgeSoixanteDixPlus: 0,
        trancheAgeNonCommunique: 2,
        statutSocialScolarise: 2,
        statutSocialSansEmploi: 0,
        statutSocialEnEmploi: 8,
        statutSocialRetraite: 0,
        statutSocialNonCommunique: 0,
      },
    },
  },
  {
    type: 'demarche',
    cra: {
      id: 'a7b3f09a-7433-4ad2-8681-aba6a285161e',
      date: new Date('2024-05-20T00:00:00.000Z'),
      autonomie: null,
      thematiques: ['Justice', 'FamilleScolarite'],
      duree: 90,
      notes: null,
      lieuAccompagnement: 'ADistance',
      precisionsDemarche: null,
      lieuActivite: {
        id: '36929ed7-3b6f-4ed3-9924-b5e1a6c27096',
        commune: 'Paris 2eme',
        codePostal: '75002',
        nom: 'Exemple de Mediateque',
      },
      lieuAccompagnementDomicileCommune: null,
      lieuAccompagnementDomicileCodeInsee: null,
      lieuAccompagnementDomicileCodePostal: null,
      structureDeRedirection: null,
      degreDeFinalisation: null,
      beneficiaire: {
        id: 'c6f21f86-8334-488c-ba48-c29a4ed74669',
        prenom: null,
        nom: null,
        trancheAge: 'DixHuitVingtQuatre',
        statutSocial: null,
        genre: null,
        commune: 'Paris',
        communeCodePostal: '75001',
        vaPoursuivreParcoursAccompagnement: true,
        _count: {
          activites: 3,
        },
      },
    },
  },
]

export const Statistiques: Story = {
  args: {
    firstName: 'John',
    name: 'Doe',
    email: 'john@doe.com',
    statistiques: {
      accompagnementBeneficiaires: {
        dernierMois: accompagnementBeneficiairesDernierMois,
        derniereSemaine: accompagnementBeneficiairesDerniereSemaine,
      },
      modalitesAccompagnement: {
        dernierMois: modalitesAccompagnementDernierMois,
        derniereSemaine: modalitesAccompagnementDerniereSemaine,
      },
    },
    activites,
  },
}
Statistiques.storyName = 'Accueil'
