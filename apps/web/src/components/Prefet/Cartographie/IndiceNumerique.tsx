import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Button from '@codegouvfr/react-dsfr/Button'
import ToggleSwitch from '@codegouvfr/react-dsfr/ToggleSwitch'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
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
    <InformationModal title="L’indice de Fragilité Numérique">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl, duis ac
      egestas donec tincidunt lorem. Sodales risus amet nisl sed. Vitae bibendum
      et penatibus a eget ipsum mattis pharetra. Diam molestie vitae, diam, sed
      tincidunt facilisi. Arcu faucibus mattis varius pretium. Duis ullamcorper
      malesuada massa ipsum sit. Ornare donec sit lobortis nullam dictum
      ullamcorper ac. Congue erat lorem quam amet sagittis egestas lorem. Arcu,
      nisl, massa eu, a nulla fusce egestas vitae. Mi tortor, penatibus auctor
      in nisl enim velit pellentesque. Consectetur urna, eleifend non congue
      dolor adipiscing nec. Ipsum laoreet dui facilisis pellentesque lacus. In
      bibendum molestie phasellus vel, consequat commodo dolor. Quis ipsum elit
      nec at amet, tincidunt.
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
              0 : Pas de risque
            </span>
            <Image
              width={162}
              height={17}
              src="/images/indice-fragilite-numerique.png"
              alt="Dégradé de couleur allant du bleu au marron"
            />
            <span className="fr-text--xs fr-hint-text fr-mb-0">
              10 : Fragile
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
