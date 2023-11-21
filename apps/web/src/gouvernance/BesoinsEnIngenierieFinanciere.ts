import z from 'zod'

const precisionErrorMessage = 'Veuillez préciser le besoin'

const BesoinStandard = z
  .object({
    besoin: z.boolean().default(false),
    rh: z.boolean().default(false),
    etp: z.number().positive('Veuillez préciser le nombre d’ETP').nullish(),
    prestation: z.boolean(),
  })
  // etp is required if rh is true
  .refine(
    (data) => (data.rh ? data.etp !== null && data.etp !== undefined : true),
    {
      message: 'Veuillez préciser le nombre d’ETP',
      path: ['etp'],
    },
  )
  .refine((data) => !data.besoin || !!data.rh || !!data.prestation, {
    message: 'Veuillez préciser le type de besoin',
    path: ['besoin'],
  })
export type BesoinStandardData = z.infer<typeof BesoinStandard>

const BesoinAPreciser = z
  .object({
    besoin: z.boolean().default(false),
    rh: z.boolean().default(false),
    etp: z.number().positive('Veuillez préciser le nombre d’ETP').nullish(),
    prestation: z.boolean(),
    precisions: z.string().nullish(),
  })
  // etp is required if rh is true
  .refine(
    (data) =>
      data.rh
        ? data.etp !== null && data.etp !== undefined && data.etp > 0
        : true,
    {
      message: 'Veuillez préciser le nombre d’ETP',
      path: ['etp'],
    },
  )
  .refine((data) => (data.besoin ? data.precisions : true), {
    message: 'Veuillez préciser le besoin',
    path: ['precisions'],
  })
  .refine((data) => !data.besoin || !!data.rh || !!data.prestation, {
    message: 'Veuillez préciser le type de besoin',
    path: ['besoin'],
  })
export type BesoinAPreciserData = z.infer<typeof BesoinAPreciser>

export const BesoinsEnIngenierieFinanciereValidation = z
  .object({
    gouvernanceId: z.string().uuid(),

    faireUnDiagnosticTerritorial: BesoinStandard,

    coConstruireLaFeuilleDeRoute: BesoinStandard,

    redigerLaFeuilleDeRoute: BesoinStandard,

    creerUnVehiculeJuridique: BesoinStandard,

    formaliserLaFeuilleDeRouteAutre: BesoinAPreciser,

    structurerUnFondsLocal: BesoinStandard,

    monterDesDossiersDeSubvention: BesoinStandard,

    animerEtMettreEnOeuvre: BesoinStandard,

    financerLeDeploiementAutre: BesoinAPreciser,

    structurerUneFiliereDeReconditionnement: BesoinStandard,

    collecterDesDonneesTerritoriales: BesoinStandard,

    sensibiliserLesActeurs: BesoinStandard,

    outillerLesActeursAutre: BesoinAPreciser,

    formerLesAgentsPublics: z.boolean(),
    formerLesAgentsPublicsNombre: z
      .number()
      .positive('Veuillez préciser le nombre de personnes à former')
      .nullish(),

    formerLesSalariesAssociatifs: z.boolean(),
    formerLesSalariesAssociatifsNombre: z
      .number()
      .positive('Veuillez préciser le nombre de personnes à former')
      .nullish(),

    appuyerLaCertificationQualiopi: z.boolean(),

    formerLesProfessionnelsAutre: z.boolean(),
    formerLesProfessionnelsAutrePrecisions: z.string().nullish(),
  })
  // formerNombre fields are required if former is true
  .refine(
    (data) =>
      !(data.formerLesAgentsPublics && !data.formerLesAgentsPublicsNombre),
    {
      message: 'Veuillez préciser le nombre de personnes à former',
      path: ['formerLesAgentsPublicsNombre'],
    },
  )
  .refine(
    (data) =>
      !(
        data.formerLesSalariesAssociatifs &&
        !data.formerLesSalariesAssociatifsNombre
      ),
    {
      message: 'Veuillez préciser le nombre de personnes à former',
      path: ['formerLesSalariesAssociatifsNombre'],
    },
  )
  // Former les professionnels autre precisions is required if formerLesProfessionnelsAutre is true
  .refine(
    (data) =>
      !(
        data.formerLesProfessionnelsAutre &&
        !data.formerLesProfessionnelsAutrePrecisions
      ),
    {
      message: precisionErrorMessage,
      path: ['formerLesProfessionnelsAutrePrecisions'],
    },
  )

export type BesoinsEnIngenierieFinanciereData = z.infer<
  typeof BesoinsEnIngenierieFinanciereValidation
>

export const BesoinsEnIngenierieFinancierePrioriteValidation = z.object({
  gouvernanceId: z.string().uuid(),
  faireUnDiagnosticTerritorialPrestationPriorite: z.number().int().nullish(),
  coConstruireLaFeuilleDeRoutePrestationPriorite: z.number().int().nullish(),
  redigerLaFeuilleDeRoutePrestationPriorite: z.number().int().nullish(),
  creerUnVehiculeJuridiquePrestationPriorite: z.number().int().nullish(),
  formaliserLaFeuilleDeRouteAutrePrestationPriorite: z.number().int().nullish(),
  structurerUnFondsLocalPrestationPriorite: z.number().int().nullish(),
  monterDesDossiersDeSubventionPrestationPriorite: z.number().int().nullish(),
  animerEtMettreEnOeuvrePrestationPriorite: z.number().int().nullish(),
  financerLeDeploiementAutrePrestationPriorite: z.number().int().nullish(),
  structurerUneFiliereDeReconditionnementPrestationPriorite: z
    .number()
    .int()
    .nullish(),
  collecterDesDonneesTerritorialesPrestationPriorite: z
    .number()
    .int()
    .nullish(),
  sensibiliserLesActeursPrestationPriorite: z.number().int().nullish(),
  outillerLesActeursAutrePrestationPriorite: z.number().int().nullish(),
  formerLesAgentsPublicsPriorite: z.number().int().nullish(),
  formerLesSalariesAssociatifsPriorite: z.number().int().nullish(),
  appuyerLaCertificationQualiopiPriorite: z.number().int().nullish(),
  formerLesProfessionnelsAutrePriorite: z.number().int().nullish(),
  totalEtpPriorite: z.number().int().nullish(),
})

export type BesoinsEnIngenierieFinancierePrioriteData = z.infer<
  typeof BesoinsEnIngenierieFinancierePrioriteValidation
>
