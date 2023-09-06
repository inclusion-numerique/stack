'use client'

import React, { ReactNode, useMemo, useState } from 'react'
import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import SearchableSelect from '@app/ui/components/SearchableSelect/SearchableSelect'
import Link from 'next/link'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import {
  DepartementCartographieDataCommune,
  DepartementCartographieDataCount,
  DepartementCartographieDataStructure,
} from '@app/web/app/(cartographie)/tableau-de-bord/departement/[codeDepartement]/cartographie/getDepartementCartographieData'
import LegendStructure from '@app/web/components/Prefet/Cartographie/LegendStructure'
import InfoButton from '@app/web/components/InfoButton'
import {
  TerritoiresPrioritairesInformationModal,
  TerritoiresPrioritairesInformationModalContent,
} from '@app/web/components/Prefet/TerritoiresPrioritairesInformationModal'
import styles from './Legend.module.css'
import LegendCity from './LegendCity'

const StructuresInformationModal = createModal({
  id: 'structures-information',
  isOpenedByDefault: false,
})

const StructureLegendWithCount = ({
  label,
  count,
  subtype,
}: {
  label: string | ReactNode
  count: number
  subtype?: boolean
}) => (
  <span className={styles.structureLegendWithCount}>
    <span>{label}</span>
    <span className={subtype ? styles.labelSubtypeCount : ''}>{count}</span>
  </span>
)

const Legend = ({
  communes,
  departement,
  structures,
  onStructureSelected,
  selectedCommune: _selectedCommune,
  onCommuneSelected,
  selectedStructure: _selectedStructure,
  count,
}: {
  count: DepartementCartographieDataCount
  departement: { nom: string; code: string }
  communes: DepartementCartographieDataCommune[]
  structures: DepartementCartographieDataStructure[]
  selectedCommune?: DepartementCartographieDataCommune | null
  onCommuneSelected: (commune: string | null | undefined) => void
  selectedStructure?: DepartementCartographieDataStructure | null
  onStructureSelected: (structure: string | null | undefined) => void
}) => {
  const [legendCollapsed, setLegendCollapsed] = useState(false)

  const categories = useMemo(
    () => [
      {
        name: 'Communes',
        options: communes.map((commune) => ({
          name: `${commune.nom} ${commune.codesPostaux.join(' ')}`,
          value: `commune#${commune.code}`,
          component: <LegendCity commune={commune} />,
        })),
        limit: 4,
      },
      {
        name: 'Structures',
        options: structures
          // Filter out structures that are not geolocated as it would mess up flyTo()
          .filter(
            ({
              geometry: {
                coordinates: [latitude, longitude],
              },
            }) => latitude && longitude,
          )
          .map((structure) => ({
            name: structure.properties.nom,
            value: `structure#${structure.properties.id}`,
            component: <LegendStructure structure={structure} />,
          })),
        limit: 4,
      },
    ],
    [communes, structures],
  )

  const onSelect = (value: string) => {
    if (value === '') {
      onCommuneSelected(null)
      onStructureSelected(null)
      return
    }
    if (value.startsWith('commune#')) {
      const cleanValue = value.replace(/^commune#/, '')
      onCommuneSelected(cleanValue)
      return
    }

    if (value.startsWith('structure#')) {
      const cleanValue = value.replace(/^structure#/, '')
      onStructureSelected(cleanValue)
    }
  }

  return (
    <>
      <StructuresInformationModal.Component title="Lieux d’inclusion numérique">
        <p>
          Les données relatives aux lieux de médiation numérique sont issues de
          la{' '}
          <Link
            href="https://cartographie.societenumerique.gouv.fr/"
            target="_blank"
          >
            Cartographie Nationale
          </Link>
          . Si des structures n’apparaissent pas, elles peuvent se référencer
          via{' '}
          <Link href="https://dora.inclusion.beta.gouv.fr" target="_blank">
            Dora
          </Link>
          .
        </p>
      </StructuresInformationModal.Component>
      <TerritoiresPrioritairesInformationModalContent />
      <div
        className={classNames(styles.container, {
          [styles.collapsed]: legendCollapsed,
        })}
      >
        <Button
          className={styles.collapseButton}
          iconId={
            legendCollapsed
              ? 'fr-icon-arrow-right-s-line-double'
              : 'fr-icon-arrow-left-s-line-double'
          }
          title="Réduire la légende"
          onClick={() => setLegendCollapsed(!legendCollapsed)}
          priority="tertiary no outline"
          size="small"
          type="button"
        />
        {!legendCollapsed && (
          <div className={styles.legend}>
            <Breadcrumb
              currentPageLabel="Cartographie"
              segments={[
                {
                  label: "Page d'accueil",
                  linkProps: {
                    href: '/',
                  },
                },
                {
                  label: 'Tableau de bord',
                  linkProps: {
                    href: `/tableau-de-bord/departement/${departement.code}`,
                  },
                },
              ]}
            />
            <SearchableSelect
              placeholder="Rechercher une commune ou une structure"
              onSelect={onSelect}
              categories={categories}
              options={undefined}
              limit={undefined}
            />
            <h6 className={styles.legendTitle}>
              Lieux d’inclusion numérique{' '}
              <InfoButton
                iconId="fr-icon-information-line"
                title="Informations sur les lieux d'inclusion numérique"
                onClick={StructuresInformationModal.open}
              />
            </h6>
            <p className="fr-text--xs fr-hint-text fr-mb-3w">
              Source :{' '}
              <Link
                href="https://donnees.incubateur.anct.gouv.fr"
                target="_blank"
              >
                Données et territoires
              </Link>
            </p>
            <form className={styles.filters} onSubmit={() => {}}>
              <p className="fr-text--lg fr-text--bold fr-mb-3v">
                Typologie des lieux d’inclusion numérique
              </p>
              <StructureLegendWithCount
                label={
                  <>
                    <span className="fr-icon-government-fill fr-icon--sm fr-text-title--blue-france fr-mr-1w" />
                    Public
                  </>
                }
                count={count.type.publique}
              />
              <div className="fr-pl-3w">
                <StructureLegendWithCount
                  label="Commune"
                  count={count.sousTypePublic.commune}
                  subtype
                />
                <StructureLegendWithCount
                  label="EPCI"
                  count={count.sousTypePublic.epci}
                  subtype
                />
                <StructureLegendWithCount
                  label="Département"
                  count={count.sousTypePublic.departement}
                  subtype
                />
                <StructureLegendWithCount
                  label="Autre"
                  count={count.sousTypePublic.autre}
                  subtype
                />
              </div>
              <StructureLegendWithCount
                label={
                  <>
                    <span className="fr-icon-team-fill fr-icon--sm fr-text-title--blue-france fr-mr-1w" />
                    Associations
                  </>
                }
                count={count.type.association}
              />
              <StructureLegendWithCount
                label={
                  <>
                    <span className="fr-icon-building-fill fr-icon--sm fr-text-title--blue-france fr-mr-1w" />
                    Autres acteurs privés
                  </>
                }
                count={count.type.privee}
              />
              <StructureLegendWithCount
                label={
                  <>
                    <span className="fr-icon-map-pin-2-fill fr-icon--sm fr-text-title--blue-france fr-mr-1w" />
                    Non défini
                  </>
                }
                count={count.type.nonDefini}
              />
              <p className="fr-text--lg fr-text--bold fr-mt-6v fr-mb-3v">
                Labels
              </p>
              <StructureLegendWithCount
                label="Lieux accueillant des conseillers numérique"
                count={count.label.conseillerNumerique}
              />
              <StructureLegendWithCount
                label="Points d’accueil numérique labellisés France Services"
                count={count.label.franceServices}
              />
              <StructureLegendWithCount
                label="Points d’accueil habilités Aidants Connect"
                count={count.label.aidantsConnect}
              />
              <StructureLegendWithCount
                label="Aucun"
                count={count.label.aucun}
              />
              <p className="fr-text--lg fr-text--bold fr-mt-6v fr-mb-3v">
                Territoires prioritaires{' '}
                <InfoButton
                  iconId="fr-icon-information-line"
                  title="Informations sur les territoires prioritaires"
                  onClick={TerritoiresPrioritairesInformationModal.open}
                />
              </p>
              <StructureLegendWithCount
                label="Structures en quartier prioritaire de la ville (QPV)"
                count={count.territoire.qpv}
              />
              <StructureLegendWithCount
                label="Structures en zone de revitalisation rurale (ZRR)"
                count={count.territoire.zrr}
              />
              <StructureLegendWithCount
                label="Aucun"
                count={count.territoire.aucun}
              />
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default Legend
