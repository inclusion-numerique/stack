import { mergeQuantifiedShare } from './quantifiedShare'

describe('merge quantified share', () => {
  it('should merge accompagnementCollectifsStats and accompagnementDemarchesStats', () => {
    const accompagnementCollectifsStats = [
      {
        category_type: 'canauxAccompagnements',
        label: 'Lieu d’activité',
        count: 1,
      },
      { category_type: 'dureesAccompagnements', label: '2h00', count: 1 },
      {
        category_type: 'lieuxAccompagnements',
        label: 'Non communiqué',
        count: 1,
      },
      {
        category_type: 'materielsAccompagnements',
        label: 'Ordinateur',
        count: 1,
      },
      {
        category_type: 'materielsAccompagnements',
        label: 'Téléphone',
        count: 1,
      },
      {
        category_type: 'materielsAccompagnements',
        label: 'Tablette',
        count: 1,
      },
    ]

    const accompagnementDemarchesStats = [
      {
        category_type: 'canauxAccompagnements',
        label: 'À distance',
        count: 2,
      },
      { category_type: 'dureesAccompagnements', label: '1h30', count: 2 },
      {
        category_type: 'lieuxAccompagnements',
        label: 'Non communiqué',
        count: 2,
      },
      {
        category_type: 'materielsAccompagnements',
        label: 'Tablette',
        count: 1,
      },
    ]

    const merged = mergeQuantifiedShare(
      accompagnementCollectifsStats,
      accompagnementDemarchesStats,
    )

    expect(merged).toStrictEqual({
      canauxAccompagnements: [
        { label: 'Lieu d’activité', count: 1, proportion: 33 },
        { label: 'À distance', count: 2, proportion: 67 },
      ],
      dureesAccompagnements: [
        { label: '2h00', count: 1, proportion: 33 },
        { label: '1h30', count: 2, proportion: 67 },
      ],
      lieuxAccompagnements: [
        { label: 'Non communiqué', count: 3, proportion: 100 },
      ],
      materielsAccompagnements: [
        { label: 'Ordinateur', count: 1, proportion: 25 },
        { label: 'Téléphone', count: 1, proportion: 25 },
        { label: 'Tablette', count: 2, proportion: 50 },
      ],
    })
  })
})
