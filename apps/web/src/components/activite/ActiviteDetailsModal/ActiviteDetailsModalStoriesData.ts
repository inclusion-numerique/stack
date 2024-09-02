import type { Activite } from '@app/web/cra/activitesQueries'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'

export const activiteIndividuelleInfosMinimum = {
  type: 'individuel',
  cra: {
    id: '1',
    date: new Date('2024-03-22'),
    duree: 90,
    thematiques: [
      'CreerAvecLeNumerique',
      'PrendreEnMainDuMateriel',
      'InsertionProfessionnelle',
    ],
    notes: null,
    beneficiaire: {
      id: '2',
      prenom: null,
      nom: null,
      _count: {
        activites: 5,
      },
      commune: null,
      communeCodePostal: null,
      vaPoursuivreParcoursAccompagnement: null,
      statutSocial: null,
      genre: null,
      trancheAge: null,
    },
    lieuAccompagnement: 'LieuActivite',
    autonomie: null,
    materiel: [],
    lieuAccompagnementDomicileCommune: null,
    lieuAccompagnementDomicileCodeInsee: null,
    lieuAccompagnementDomicileCodePostal: null,
    lieuActivite: {
      id: '1',
      nom: 'Bibliotheque Musee de l’Opera, au fond du couloir à droite',
      commune: 'Paris',
      codePostal: '75006',
    },
    orienteVersStructure: null,
    structureDeRedirection: null,
  },
} satisfies Activite

export const activiteIndividuelleBeneficiaireSuivi = {
  type: 'individuel',
  cra: {
    id: '1',
    date: new Date('2024-03-22'),
    duree: 120,
    thematiques: ['NavigationSurInternet', 'Email'],
    notes: null,
    beneficiaire: {
      id: '2',
      prenom: 'Jean',
      nom: 'Dupont',
      _count: {
        activites: 5,
      },
      commune: null,
      communeCodePostal: null,
      vaPoursuivreParcoursAccompagnement: null,
      statutSocial: 'EnEmploi',
      genre: 'Masculin',
      trancheAge: 'NonCommunique',
    },
    lieuAccompagnement: 'ADistance',
    autonomie: null,
    materiel: [],
    lieuAccompagnementDomicileCommune: null,
    lieuAccompagnementDomicileCodeInsee: null,
    lieuAccompagnementDomicileCodePostal: null,
    lieuActivite: null,
    orienteVersStructure: true,
    structureDeRedirection: 'OperateurOuOrganismeEnCharge',
  },
} satisfies Activite

export const activiteIndividuelleBeneficiaireAnonyme = {
  type: 'individuel',
  cra: {
    id: '1',
    date: new Date('2024-03-22'),
    duree: 120,
    thematiques: ['NavigationSurInternet', 'Email'],
    beneficiaire: {
      id: '2',
      prenom: null,
      nom: null,
      _count: {
        activites: 0,
      },
      commune: 'Lyon',
      communeCodePostal: '69002',
      vaPoursuivreParcoursAccompagnement: true,
      statutSocial: 'EnEmploi',
      genre: 'Masculin',
      trancheAge: 'QuaranteCinquanteNeuf',
    },
    lieuAccompagnement: 'Domicile',
    autonomie: null,
    materiel: [],
    lieuAccompagnementDomicileCommune: 'Lyon',
    lieuAccompagnementDomicileCodeInsee: '69381',
    lieuAccompagnementDomicileCodePostal: '69002',
    lieuActivite: null,
    orienteVersStructure: true,
    structureDeRedirection: 'OperateurOuOrganismeEnCharge',
    notes:
      '<p>Lörem ipsum ladeniliga douche <strong>plaledes</strong>. Nining son. Mipära kavun joskap juling lanar. Segyde snålsurfa då jevis. Dorade preng posad. Spefuv ter i kvasitiskap då mobilblottare dir. Häbel epihet i tegt. Ultrar. Digt hän. Polytt doskapet tempopatologi. Use betårta, tena. Biktiga pojuren.</p>' +
      '<p>Segyde snålsurfa då jevis. <strong>Dorade preng posad</strong>. Spefuv ter i kvasitiskap då mobilblottare dir. Häbel epihet i tegt. Ultrar. Digt hän. Polytt doskapet tempopatologi. Use betårta, tena. Biktiga pojuren</p>',
  },
} satisfies Activite

export const activiteCollectifInfosRepliees = {
  type: 'collectif',
  cra: {
    id: '1',
    date: new Date('2024-03-22'),
    duree: 120,
    thematiques: ['NavigationSurInternet', 'Email'],
    participantsAnonymes: { ...participantsAnonymesDefault, id: '5' },
    participants: [
      {
        beneficiaire: {
          id: '3',
          prenom: 'Marie',
          nom: 'Durand',
        },
      },
      {
        beneficiaire: {
          id: '2',
          prenom: 'Jean',
          nom: 'Dupont',
        },
      },
    ],
    niveau: 'Debutant',
    lieuAtelier: 'Autre',
    lieuCommune: 'Lyon',
    lieuCodeInsee: '69381',
    lieuCodePostal: '69002',
    titreAtelier: 'Atelier de découverte de la vacuité de toute chose',
    lieuActivite: null,
    notes:
      '<p>Lörem ipsum ladeniliga douche <strong>plaledes</strong>. Nining son. Mipära kavun joskap juling lanar. Segyde snålsurfa då jevis. Dorade preng posad. Spefuv ter i kvasitiskap då mobilblottare dir. Häbel epihet i tegt. Ultrar. Digt hän. Polytt doskapet tempopatologi. Use betårta, tena. Biktiga pojuren.</p>' +
      '<p>Segyde snålsurfa då jevis. <strong>Dorade preng posad</strong>. Spefuv ter i kvasitiskap då mobilblottare dir. Häbel epihet i tegt. Ultrar. Digt hän. Polytt doskapet tempopatologi. Use betårta, tena. Biktiga pojuren</p>',
  },
} satisfies Activite

export const activiteCollectifInfosDepliees = {
  type: 'collectif',
  cra: {
    id: '1',
    date: new Date('2024-07-22'),
    duree: 120,
    thematiques: ['NavigationSurInternet', 'Email'],
    participantsAnonymes: {
      ...participantsAnonymesDefault,

      total: 40,

      genreFeminin: 15,
      genreMasculin: 2,
      genreNonCommunique: 23,

      trancheAgeVingtCinqTrenteNeuf: 40,

      statutSocialNonCommunique: 40,

      id: '5',
    },
    participants: [
      {
        beneficiaire: {
          id: '3',
          prenom: 'Marie',
          nom: 'Durand',
        },
      },
      {
        beneficiaire: {
          id: '2',
          prenom: 'Jean',
          nom: 'Dupont',
        },
      },
    ],
    niveau: 'Debutant',
    lieuAtelier: 'LieuActivite',
    lieuCommune: null,
    lieuCodeInsee: null,
    lieuCodePostal: null,
    titreAtelier: null,
    lieuActivite: {
      id: '1',
      nom: 'Bibliotheque Musee de l’Opera, au fond du couloir à droite',
      commune: 'Paris',
      codePostal: '75006',
    },
    notes: null,
  },
} satisfies Activite

export const activitesForModalStories = [
  activiteIndividuelleInfosMinimum,
  activiteIndividuelleBeneficiaireSuivi,
  activiteIndividuelleBeneficiaireAnonyme,
  activiteCollectifInfosRepliees,
  activiteCollectifInfosDepliees,
]
