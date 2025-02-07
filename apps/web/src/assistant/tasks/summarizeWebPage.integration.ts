import { summarizeWebPage } from '@app/web/assistant/tasks/summarizeWebPage'
import { readFileSync } from 'node:fs'

describe('summarizeWebPage', () => {
  const legiFranceHtml = readFileSync(
    `${__dirname}/_test/testCase.legifrance.html`,
    'utf8',
  )

  it('should summarize a web page', async () => {
    const { summary } = await summarizeWebPage({
      url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074075/LEGISCTA000006143404/1973-11-13#:~:text=La%20demande%20de%20permis%20de,pour%20cause%20d'utilité%20publique.",
      html: legiFranceHtml,
      objectif:
        'l’utilisateur veut savoir quels sont les documents à fournir pour une demande de permis de construire',
    })

    expect(summary).toBeString()
    expect(summary?.length).toBeGreaterThan(500)
    expect(summary).toContain('demande de permis de construire')
    expect(summary).toContain('plans')
    expect(summary).toContain('documents')

    /**
     * Résultat LLAMA 3.3 70B
     * 34 secondes
     *
     *  "Pour obtenir un permis de construire, il est nécessaire de fournir plusieurs documents. Voici les principaux documents à fournir :·
     * 1. **Demande de permis de construire** : La demande doit être présentée par le propriétaire du terrain ou son mandataire, ou par une personne justifiant d'un titre l'habilitant à construire sur le terrain. La demande doit préciser l'identité du demandeur, la situation et la superficie du terrain, l'identité du propriétaire du terrain (si celui-ci n'est pas l'auteur de la demande), la nature des travaux et la destination des constructions, la densité de construction et, le cas échéant, tous éléments nécessaires au calcul de la taxe locale d'équipement.·
     * 2. **Plans et documents nécessaires** : Les plans et documents nécessaires à la formulation de l'avis de la commission consultative départementale de la protection civile doivent être joints à la demande de permis de construire.·
     * 3. **Pièces complémentaires** : D'autres pièces complémentaires peuvent être demandées, telles que des éléments nécessaires au calcul de la redevance instituée par l'article L. 520-1, ou des informations sur les matériaux utilisés pour la construction.·
     * 4. **Dossier de demande de permis de construire** : Le dossier de demande de permis de construire doit comporter les documents suivants :
     *  * Un formulaire de demande de permis de construire ;
     *  * Un plan de situation du terrain ;
     *  * Un plan de masse des constructions ;
     *  * Des plans détaillés des façades et des coupes ;
     *  * Un plan de répartition des locaux ;
     *  * Un dossier descriptif des travaux ;
     *  * Un document justifiant la propriété du terrain ou le droit de construire ;
     *  * Un document attestant de la conformité du projet aux règles d'urbanisme et de construction.·
     * Il est important de noter que la liste des documents à fournir peut varier en fonction de la nature et de la complexité du projet, ainsi que des exigences spécifiques de la commune ou de la région où se trouve le terrain. Il est donc recommandé de contacter la mairie ou le service d'urbanisme de la commune pour obtenir des informations précises sur les documents à fournir."
     */

    /**
     * Résultat LLAMA 3.1 8B
     * 5 secondes
     *
     * "Pour obtenir un permis de construire, vous devez fournir les documents suivants :·
     * - Une demande de permis de construire complète, qui doit préciser l'identité du demandeur, l'identité et la qualité de l'auteur du projet, la situation et la superficie du terrain, la nature des travaux et la destination des constructions, la densité de construction et, le cas échéant, tous éléments nécessaires au calcul de la taxe locale d'équipement instituée à l'article 1585 A du code général des impôts.
     * - Les plans et documents nécessaires à la formulation de l'avis de la commission consultative départementale de la protection civile, en cas de constructions projetées soumises à l'avis de cette commission.
     * - Les accords, avis ou décisions prévus par les lois et règlements en vigueur, recueillis par le directeur départemental de l'équipement ou le maire.
     * - Les documents fournis à l'appui de la demande de permis de construire, qui doivent indiquer avec précision les dispositions prises pour satisfaire aux mesures prévues par le règlement de sécurité.
     * - Une notice présentée selon un formulaire établi par le ministre chargé de l'urbanisme, accompagnant les demandes de permis de construire de l'espèce.
     * - Les documents nécessaires pour la vérification par l'un des laboratoires agréés par le ministère de l'intérieur, du degré d'inflammabilité des matériaux ou, s'il y a lieu, du degré de résistance au feu des éléments de construction employés et la remise du procès-verbal de ces contrôles.·
     * Il est important de noter que ces documents doivent être fournis dans les conditions et selon les modalités prévues par la réglementation en vigueur."
     */

    /**
     * Résultat Mistral Nemo
     * KO timeout 60sec
     */
  }, 10_000)
})
