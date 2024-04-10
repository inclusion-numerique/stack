import { writeFileSync } from 'node:fs'
import { createVarDirectory } from '@app/config/createVarDirectory'
import { varDirectory } from '@app/config/varDirectory'
import { generateConventionSubvention } from '@app/web/gouvernance/conventionSubvention'
import {
  MembreBeneficiaireDataForConvention,
  postProcessMembreBeneficiaireDataForConvention,
} from '@app/web/gouvernance/getMembreBeneficiaireDataForConvention'
import { getMembreGouvernanceStringName } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/getMembreGouvernanceStringName'
import { Decimal } from 'decimal.js'

const outputName = (filename: string) =>
  `${varDirectory}/conventions/${filename}.odt`

const conventionDataMock = {
  beneficiaireFormation: true,
  nom: getMembreGouvernanceStringName({
    id: 'fallback',
    departement: {
      nom: 'Loire',
    },
    formel: true,
  }),
  membre: {
    id: '1',
    region: null,
    epci: null,
    departement: null,
    commune: null,
    siret: null,
    coporteur: false,
    modification: new Date(),
    creation: new Date(),
    nomStructure: null,
    formulaireGouvernanceId: '3',
    siretInformations: null,
    gouvernance: {
      id: '2',
      departement: {
        code: '42',
        nom: 'Loire',
      },
    },
    beneficiaireSubventions: [
      {
        id: '4',
        subvention: new Decimal(30_000),
        demandeDeSubvention: {
          id: '5',
          nomAction: 'Action 1',
          contexte:
            "<p><em>Madame, Monsieur,</em></p><p><em>Dans le cadre de la mise en œuvre de la feuille de route France numérique ensemble (FNE), des discussions ont été engagées avec le Conseil départemental de Mayotte et l’association Mayotte In Tech, membre du Hub ultramarin Océan Indien.</em></p><p><em>Par courrier du 31 octobre 2023, le président du Conseil départemental de Mayotte confirme son accord de devenir le chef de file.</em></p><p><em>Avec Mayotte In Tech, un pré-projet de feuille de route, \"document martyr\", a été élaboré, constitué de 5 axes  stratégiques :<br />1. Améliorer l’infrastructure numérique : Assurer un accès Internet haut débit et abordable pour tous les habitants de Mayotte.<br />2. Promotion de l’inclusion numérique : Renforcer les compétences numériques de la population et l'intégration des technologies numériques dans l'éducation.<br />3. Innovation et entrepreneuriat numérique : Stimuler l'innovation et la création d'emplois grâce aux technologies numériques.<br />4. Inclusion sociale : Utiliser la technologie numérique pour réduire les inégalités sociales.<br />5. Renforcement de la cybersécurité : Assurer la sécurité des utilisateurs et de leurs données dans l'environnement numérique.<br />Ce document servira de base de discussions avec l’ensemble des partenaires dont certains ont déjà manifesté leur intérêt par le biais de la plateforme, notamment la commune de Mamoudzou, chef-lieu de Mayotte.</em></p><p><em>L’animateur départemental du réseau France services, qui passera à temps plein au 1er janvier 2024, restera porté par le CROS.</em></p><p><em>Le président de l’UDAF a donné son accord pour que l’association porte le poste de conseiller numérique coordinateur.</em></p><p><strong><em>Une équipe projet sera constituée pour mettre en cohérence les actions du réseau France services et celui des conseillers numériques.</em></strong></p>",
          besoins: [
            'RedigerLaFeuilleDeRoute',
            'StructurerUneFiliereDeReconditionnement',
          ],
        },
      },
      {
        id: '6',
        subvention: new Decimal(40_000),
        demandeDeSubvention: {
          id: '7',
          nomAction: 'Action 2',
          contexte:
            "<ul><li><p>en résumé :</p></li><li><p>Feuille de route stratégique articulée autour de 4 grands chantiers identifiés comme prioritaires.</p></li><li><p>Difficultés :</p></li><li><p>nécessité de renforcer moyens de pilotage et d'animation</p></li><li><p>nécessité de trouver des pilotes identifiés pour chaque action à conduire</p></li><li><p>articulation à construire entre la feuille de route portée par la Métropole et le FNE territorial</p></li></ul>",
          besoins: [
            'StructurerUneFiliereDeReconditionnement',
            'SensibiliserLesActeursAuxOutilsExistants',
          ],
        },
      },
    ],
    beneficiaireDotationFormation: null,
  },

  subventionIngenierie: new Decimal(10_000.45),
  subventionFormation: new Decimal(20_000.26),
  subventionTotal: new Decimal(30_000.71),
  budgetGlobal: new Decimal(100_000.6),
} satisfies MembreBeneficiaireDataForConvention

const processedDataMock =
  postProcessMembreBeneficiaireDataForConvention(conventionDataMock)

describe('generateConventionSubvention', () => {
  beforeAll(() => {
    createVarDirectory('/conventions')
  })

  it('Creates convention without formation', async () => {
    const data = await generateConventionSubvention({
      ...processedDataMock,
      beneficiaireFormation: false,
    })
    expect(data).toBeInstanceOf(Buffer)
    writeFileSync(outputName('fne-convention_only-actions'), data)
  })

  it('Creates convention with actions and formation', async () => {
    const data = await generateConventionSubvention(processedDataMock)
    expect(data).toBeInstanceOf(Buffer)
    writeFileSync(outputName('fne-convention_actions-and-formation'), data)
  })

  it('Creates convention with only formation', async () => {
    const data = await generateConventionSubvention({
      ...processedDataMock,
      membre: {
        ...processedDataMock.membre,
        beneficiaireSubventions: [],
      },
    })
    expect(data).toBeInstanceOf(Buffer)
    writeFileSync(outputName('fne-convention_only-formation'), data)
  })
})
