import { createEnumLabelCaseSelect } from '@app/web/app/coop/mes-statistiques/_queries/createEnumLabelCaseSelect'
import { Thematique } from '@prisma/client'
import { thematiqueShortLabels } from '@app/web/cra/cra'

describe('createEnumLabelCaseSelect', () => {
  it('should return a case select with the enum values and labels', () => {
    expect(
      createEnumLabelCaseSelect({
        enumObj: Thematique,
        labels: thematiqueShortLabels,
        column: 'thematique',
      }).sql,
    ).toEqual(`CASE
    WHEN thematique = 'prendre_en_main_du_materiel' THEN 'Prendre en main du matériel'
    WHEN thematique = 'navigation_sur_internet' THEN 'Navigation sur internet'
    WHEN thematique = 'email' THEN 'E-mail'
    WHEN thematique = 'bureautique' THEN 'Bureautique'
    WHEN thematique = 'reseaux_sociaux' THEN 'Réseaux sociaux'
    WHEN thematique = 'sante' THEN 'Santé'
    WHEN thematique = 'banque_et_achats_en_ligne' THEN 'Banque et achats en ligne'
    WHEN thematique = 'entrepreneuriat' THEN 'Entrepreneuriat'
    WHEN thematique = 'insertion_professionnelle' THEN 'Insertion professionnelle'
    WHEN thematique = 'securite_numerique' THEN 'Sécurité numérique'
    WHEN thematique = 'parentalite' THEN 'Parentalité'
    WHEN thematique = 'scolarite_et_numerique' THEN 'Scolarité et numérique'
    WHEN thematique = 'creer_avec_le_numerique' THEN 'Créer avec le numérique'
    WHEN thematique = 'culture_numerique' THEN 'Culture numérique'
  ELSE 'Non communiqué'
END `)
  })
})
