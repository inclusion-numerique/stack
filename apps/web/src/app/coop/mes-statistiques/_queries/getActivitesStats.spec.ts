import { normalizeActivitesStatsRaw } from '@app/web/app/coop/mes-statistiques/_queries/getActivitesStats'

describe('getActivitesStats', () => {
  describe('normalizeActivitessStatsRaw', () => {
    it('should normalize counters stats', () => {
      expect(
        normalizeActivitesStatsRaw({
          total_activites: 10,
          type_individuel_count: 4,
          type_demarche_count: 4,
          type_collectif_count: 2,
          duree_30_count: 0,
          duree_60_count: 0,
          duree_90_count: 10,
          duree_120_count: 0,
          type_lieu_lieu_activite_count: 0,
          type_lieu_domicile_count: 2,
          type_lieu_a_distance_count: 6,
          type_lieu_atelier_lieu_activite_count: 0,
          type_lieu_atelier_autre_count: 2,
          thematiques_prendre_en_main_du_materiel_count: 0,
          thematiques_navigation_sur_internet_count: 0,
          thematiques_email_count: 3,
          thematiques_bureautique_count: 0,
          thematiques_reseaux_sociaux_count: 2,
          thematiques_sante_count: 3,
          thematiques_banque_et_achats_en_ligne_count: 0,
          thematiques_entrepreneuriat_count: 0,
          thematiques_insertion_professionnelle_count: 1,
          thematiques_securite_numerique_count: 0,
          thematiques_parentalite_count: 1,
          thematiques_scolarite_et_numerique_count: 0,
          thematiques_creer_avec_le_numerique_count: 0,
          thematiques_culture_numerique_count: 2,
          thematiques_demarche_papiers_elections_citoyennete_count: 0,
          thematiques_demarche_famille_scolarite_count: 1,
          thematiques_demarche_social_sante_count: 3,
          thematiques_demarche_travail_formation_count: 0,
          thematiques_demarche_logement_count: 1,
          thematiques_demarche_transports_mobilite_count: 1,
          thematiques_demarche_argent_impots_count: 0,
          thematiques_demarche_justice_count: 1,
          thematiques_demarche_etrangers_europe_count: 1,
          thematiques_demarche_loisirs_sports_culture_count: 0,
          materiel_ordinateur_count: 3,
          materiel_telephone_count: 1,
          materiel_tablette_count: 1,
          materiel_autre_count: 1,
          materiel_aucun_count: 0,
        }),
      ).toEqual({
        // TODO Test case for aggregated data ? or just integration test of global page data?
      })
    })
  })
})
