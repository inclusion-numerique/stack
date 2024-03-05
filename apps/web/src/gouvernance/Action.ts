import z from 'zod'

const ActionMembreValidation = z.object({
  id: z.string().uuid().nullish(),
  membreGouvernanceId: z.string().uuid(),
  subventionDemandee: z
    .number({
      required_error:
        'Veuillez renseigner le montant de la subvention demandée',
    })
    .min(0)
    .nullish(),
})

export type ActionMembreData = z.infer<typeof ActionMembreValidation>

const ActionValidation = z
  .object({
    feuilleDeRouteId: z
      .string({
        required_error: 'Veuillez renseigner la feuille de route concernée',
      })
      .uuid(),
    nom: z.string({ required_error: 'Veuillez renseigner le nom de l’action' }),
    contexte: z.string({ required_error: 'Veuillez renseigner le contexte' }),
    description: z.string({
      required_error: 'Veuillez renseigner la description de l’action',
    }),
    categorieBesoin: z.string({
      required_error: 'Veuillez renseigner la catégorie de besoin',
    }),
    sousCategorieBesoin: z.string({
      required_error: 'Veuillez renseigner la sous-catégorie de besoin',
    }),
    budgetGlobal: z
      .number({
        required_error: 'Veuillez renseigner le budget global',
      })
      .min(0, 'Le budget global doit être supérieur à 0'),
    subventionDemandee: z
      .number({
        required_error:
          'Veuillez renseigner le montant de la subvention demandée',
      })
      .min(0, 'La subvention demandée doit être supérieure ou égale à 0'),
    montantSubventionEtp: z
      .number({
        required_error:
          'Veuillez renseigner le montant de la subvention demandée pour les ETP',
      })
      .min(0, 'Le montant doit être supérieur ou égal à 0')
      .nullish(),
    montantSubventionPrestation: z
      .number({
        required_error:
          'Veuillez renseigner le montant de la subvention demandée pour les prestations',
      })
      .min(0, 'Le montant doit être supérieur ou égal à 0')
      .nullish(),
    pieceJointeKey: z.string().nullish(),
    actionMembres: z
      .array(ActionMembreValidation)
      .min(1, 'Veuillez sélectionner au moins un membre de la gouvernance'),
  })
  // subventionDemandee should be lower than budgetGlobal
  .refine((data) => data.subventionDemandee <= data.budgetGlobal, {
    message:
      'La subvention demandée doit être inférieure ou égale au budget global',
    path: ['subventionDemandee'],
  })
  // La somme de montantSubventionEtp et montantSubventionPrestation doit être égale à subventionDemandee
  .refine(
    (data) =>
      data.subventionDemandee ===
      (data.montantSubventionEtp ?? 0) +
        (data.montantSubventionPrestation ?? 0),
    {
      message:
        'La somme de la subvention demandée pour les ETP et la prestation doit être égale à la subvention demandée',
      path: ['subventionDemandee'],
    },
  )
  // La some des subventions demandées par les membres doit être égale à la subvention demandée
  .refine(
    (data) => {
      const sum = data.actionMembres.reduce(
        (acc, actionMembre) => acc + (actionMembre.subventionDemandee ?? 0),
        0,
      )
      return sum === data.subventionDemandee
    },
    {
      message:
        'La somme des subventions demandées par les membres doit être égale à la subvention demandée',
      path: ['actionMembres'],
    },
  )

export type ActionData = z.infer<typeof ActionValidation>
