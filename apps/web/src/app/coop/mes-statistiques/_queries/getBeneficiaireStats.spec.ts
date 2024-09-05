import {
  normalizeBeneficiairesCommunesRaw,
  normalizeBeneficiairesStatsRaw,
} from '@app/web/app/coop/mes-statistiques/_queries/getBeneficiaireStats'

describe('getBeneficiaireStats', () => {
  describe('normalizeBeneficiairesStatsRaw', () => {
    it('should normalize counters stats', () => {
      expect(
        normalizeBeneficiairesStatsRaw({
          total_beneficiaires: 10,
          genre_masculin_count: 1,
          genre_feminin_count: 0,
          genre_non_communique_count: 9,
          statut_social_scolarise_count: 2,
          statut_social_sans_emploi_count: 0,
          statut_social_en_emploi_count: 7,
          statut_social_retraite_count: 0,
          statut_social_non_communique_count: 1,
          tranche_age_dix_huit_vingt_quatre_count: 0,
          tranche_age_vingt_cinq_trente_neuf_count: 3,
          tranche_age_quarante_cinquante_neuf_count: 6,
          tranche_age_soixante_soixante_neuf_count: 0,
          tranche_age_soixante_dix_plus_count: 1,
          tranche_age_mineur_count: 0,
          tranche_age_non_communique_count: 0,
        }),
      ).toEqual({
        total: 10,
        genres: [
          {
            value: 'Masculin',
            label: 'Masculin',
            count: 1,
            proportion: 10,
          },
          {
            value: 'Feminin',
            label: 'Féminin',
            count: 0,
            proportion: 0,
          },
          {
            value: 'NonCommunique',
            label: 'Non communiqué',
            count: 9,
            proportion: 90,
          },
        ],
        trancheAges: [
          {
            value: 'SoixanteDixPlus',
            label: '70 ans et plus',
            count: 1,
            proportion: 10,
          },
          {
            value: 'SoixanteSoixanteNeuf',
            label: '60 - 69 ans',
            count: 0,
            proportion: 0,
          },
          {
            value: 'QuaranteCinquanteNeuf',
            label: '40 - 59 ans',
            count: 6,
            proportion: 60,
          },
          {
            value: 'VingtCinqTrenteNeuf',
            label: '25 - 39 ans',
            count: 3,
            proportion: 30,
          },
          {
            value: 'DixHuitVingtQuatre',
            label: '18 - 24 ans',
            count: 0,
            proportion: 0,
          },
          {
            value: 'Mineur',
            label: 'Mineur(e)',
            count: 0,
            proportion: 0,
          },
          {
            value: 'NonCommunique',
            label: 'Non communiqué',
            count: 0,
            proportion: 0,
          },
        ],
        statutsSocial: [
          {
            value: 'Retraite',
            label: 'Retraité',
            count: 0,
            proportion: 0,
          },
          {
            value: 'SansEmploi',
            label: 'Sans emploi',
            count: 0,
            proportion: 0,
          },
          {
            value: 'EnEmploi',
            label: 'En emploi',
            count: 7,
            proportion: 70,
          },
          {
            value: 'Scolarise',
            label: 'Scolarisé',
            count: 2,
            proportion: 20,
          },
          {
            value: 'NonCommunique',
            label: 'Non communiqué ou hétérogène',
            count: 1,
            proportion: 10,
          },
        ],
      })
    })

    describe('normalizeBeneficiairesCommunesRaw', () => {
      it('should normalize communes raw data', () => {
        expect(
          normalizeBeneficiairesCommunesRaw([
            {
              code_insee: '69381',
              commune: 'Lyon 2eme',
              code_postal: '69002',
              count_beneficiaires: 1,
            },
            {
              code_insee: '75101',
              commune: 'Paris',
              code_postal: '75001',
              count_beneficiaires: 3,
            },
          ]),
        ).toEqual([
          {
            nom: 'Paris',
            codePostal: '75001',
            codeInsee: '75101',
            count: 3,
            label: 'Paris · 75001',
            proportion: 75,
          },
          {
            nom: 'Lyon 2eme',
            codePostal: '69002',
            codeInsee: '69381',
            count: 1,
            label: 'Lyon 2eme · 69002',
            proportion: 25,
          },
        ])
      })
    })
  })
})
