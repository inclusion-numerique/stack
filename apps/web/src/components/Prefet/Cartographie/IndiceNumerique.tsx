import React, { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import Button from '@codegouvfr/react-dsfr/Button'
import ToggleSwitch from '@codegouvfr/react-dsfr/ToggleSwitch'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { ifnFillColors } from '@app/web/components/Prefet/Cartographie/Layers/ifn'
import styles from './IndiceNumerique.module.css'

const { Component: InformationModal, open: openInformationModal } = createModal(
  {
    id: 'information',
    isOpenedByDefault: false,
  },
)

const IndiceNumerique = ({
  setViewIndiceFN,
  viewIndiceFN,
}: {
  setViewIndiceFN: Dispatch<SetStateAction<boolean>>
  viewIndiceFN: boolean
}) => (
  <>
    <InformationModal title="L'indice de Fragilité Numérique">
      L&apos;indice de fragilité numérique révèle les territoires où la
      population est le plus à risque d’exclusion. De nombreux facteurs sont à
      l’origine de l’exclusion numérique. Ils sont regroupés en quatre axes qui
      constituent les principales causes de l’exclusion numérique. Au sein de
      chaque axe, on retrouve plusieurs variables utilisées pour le calcul.
      <br />
      <br />
      L&apos;indice de fragilité numérique n’intègre pas de rapport ou de
      pondération par rapport à la taille de la population communale. La densité
      de lieux de médiation numérique en zone urbaine doit pouvoir être mise en
      regard de la population.
      <br />
      <br />
      <Link
        href="https://fragilite-numerique.fr"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://fragilite-numerique.fr
      </Link>
    </InformationModal>
    <div className={styles.container}>
      <ToggleSwitch
        inputTitle="Voir l'indice de Fragilité Numérique"
        label="Indice de Fragilité Numérique"
        labelPosition="left"
        showCheckedHint={false}
        defaultChecked
        onChange={(checked) => setViewIndiceFN(checked)}
      />
      {viewIndiceFN && (
        <>
          <div className={styles.legendImage}>
            <span className="fr-text--xs fr-hint-text fr-mb-0">
              Risque faible
            </span>
            <div className={styles.boxes}>
              {ifnFillColors.map((color, index) => (
                <div
                  key={color}
                  className={styles.box}
                  style={{ backgroundColor: color }}
                >
                  {index === 0 && '1'}
                  {index === Math.ceil(ifnFillColors.length / 2) - 1 && '5'}
                  {index === ifnFillColors.length - 1 && '10'}
                </div>
              ))}
            </div>
            <span className="fr-text--xs fr-hint-text fr-mb-0">
              Risque fort
            </span>
          </div>
          <Button
            priority="tertiary no outline"
            iconId="fr-icon-information-line"
            iconPosition="right"
            size="small"
            onClick={openInformationModal}
          >
            Informations
          </Button>
        </>
      )}
    </div>
  </>
)

export default IndiceNumerique
