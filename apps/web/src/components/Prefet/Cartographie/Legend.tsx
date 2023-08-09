'use client'

import React, { ReactNode, useMemo, useState } from 'react'
import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import SearchableSelect from '@app/ui/components/SearchableSelect/SearchableSelect'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import {
  DepartementCartographieDataCommune,
  DepartementCartographieDataCount,
  DepartementCartographieDataStructure,
} from '@app/web/app/(cartographie)/tableau-de-bord/departement/[codeDepartement]/cartographie/getDepartementCartographieData'
import LegendStructure from '@app/web/components/Prefet/Cartographie/LegendStructure'
import { StructureFilters } from '@app/web/components/Prefet/Cartographie/structureFilters'
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

const LegendCheckboxLabel = ({
  label,
  count,
  subtype,
}: {
  label: string | ReactNode
  count: number
  subtype?: boolean
}) => (
  <span className={styles.legendCheckboxLabel}>
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
  onFilter,
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
  onFilter: (filters: StructureFilters) => void
}) => {
  const [legendCollapsed, setLegendCollapsed] = useState(false)

  const filterForm = useForm<StructureFilters>({
    defaultValues: {
      typologie: {
        publique: true,
        association: true,
        privee: true,
        nonDefini: true,
        // Subtypes of public
        commune: true,
        epci: true,
        departement: true,
        autre: true,
      },
      labels: {
        conseillerNumerique: true,
        franceServices: true,
        aidantConnect: true,
        aucun: true,
      },
      territoiresPrioritaires: {
        zrr: true,
        qpv: true,
        aucun: true,
      },
    },
  })

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

  filterForm.watch((values) => {
    onFilter(values as StructureFilters)
  })

  /**
   * There is a wierd integration bug with DSFR for managing the state of the checkbox
   * For each checkbox that are controlled programmatically, we need to explicitly
   * re-render using the key prop because the state is not updated otherwise IF the user
   * has already interacted with the checkbox.
   */
  const programmaticallyCheckedKeys = {
    publique: filterForm.watch('typologie.publique')
      ? 'publiqueon'
      : 'publiqueoff',
    commune: filterForm.watch('typologie.commune') ? 'communeon' : 'communeoff',
    epci: filterForm.watch('typologie.epci') ? 'epcion' : 'epcioff',
    departement: filterForm.watch('typologie.departement')
      ? 'departementon'
      : 'departementoff',
    autre: filterForm.watch('typologie.autre') ? 'autreon' : 'autreoff',
  }

  // Check publique checkbox if all subtypes are checked
  // Uncheck publique checkbox if all subtypes are unchecked
  const onSubtypeChange = () => {
    const {
      typologie: {
        publique,
        commune,
        epci,
        departement: departementValue,
        autre,
      },
    } = filterForm.getValues()
    if (publique && !commune && !epci && !departementValue && !autre) {
      filterForm.setValue('typologie.publique', false)
      return
    }
    if (!publique && commune && epci && departementValue && autre) {
      filterForm.setValue('typologie.publique', true)
    }
  }

  // Check all subtypes if publique is checked
  // Uncheck all subtypes if publique is unchecked
  const onPubliqueChange = (value: boolean) => {
    if (value) {
      filterForm.setValue('typologie.commune', true)
      filterForm.setValue('typologie.epci', true)
      filterForm.setValue('typologie.departement', true)
      filterForm.setValue('typologie.autre', true)
      return
    }
    filterForm.setValue('typologie.commune', false)
    filterForm.setValue('typologie.epci', false)
    filterForm.setValue('typologie.departement', false)
    filterForm.setValue('typologie.autre', false)
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
              <CheckboxFormField
                key={programmaticallyCheckedKeys.publique}
                control={filterForm.control}
                small
                path="typologie.publique"
                onChange={onPubliqueChange}
                label={
                  <LegendCheckboxLabel
                    label={
                      <>
                        <span className="fr-icon-government-fill fr-icon--sm fr-text-title--blue-france fr-mr-1w" />
                        Public
                      </>
                    }
                    count={count.type.publique}
                  />
                }
              />
              <div className="fr-pl-3w">
                <CheckboxFormField
                  key={programmaticallyCheckedKeys.commune}
                  control={filterForm.control}
                  small
                  path="typologie.commune"
                  onChange={onSubtypeChange}
                  label={
                    <LegendCheckboxLabel
                      label="Commune"
                      count={count.sousTypePublic.commune}
                      subtype
                    />
                  }
                />
                <CheckboxFormField
                  key={programmaticallyCheckedKeys.epci}
                  control={filterForm.control}
                  small
                  path="typologie.epci"
                  onChange={onSubtypeChange}
                  label={
                    <LegendCheckboxLabel
                      label="EPCI"
                      count={count.sousTypePublic.epci}
                      subtype
                    />
                  }
                />
                <CheckboxFormField
                  key={programmaticallyCheckedKeys.departement}
                  control={filterForm.control}
                  small
                  path="typologie.departement"
                  onChange={onSubtypeChange}
                  label={
                    <LegendCheckboxLabel
                      label="Département"
                      count={count.sousTypePublic.departement}
                      subtype
                    />
                  }
                />
                <CheckboxFormField
                  key={programmaticallyCheckedKeys.autre}
                  control={filterForm.control}
                  small
                  path="typologie.autre"
                  onChange={onSubtypeChange}
                  label={
                    <LegendCheckboxLabel
                      label="Autre"
                      count={count.sousTypePublic.autre}
                      subtype
                    />
                  }
                />
              </div>
              <CheckboxFormField
                control={filterForm.control}
                small
                path="typologie.association"
                label={
                  <LegendCheckboxLabel
                    label={
                      <>
                        <span className="fr-icon-team-fill fr-icon--sm fr-text-title--blue-france fr-mr-1w" />
                        Associations
                      </>
                    }
                    count={count.type.association}
                  />
                }
              />
              <CheckboxFormField
                control={filterForm.control}
                small
                path="typologie.privee"
                label={
                  <LegendCheckboxLabel
                    label={
                      <>
                        <span className="fr-icon-building-fill fr-icon--sm fr-text-title--blue-france fr-mr-1w" />
                        Autres acteurs privés
                      </>
                    }
                    count={count.type.privee}
                  />
                }
              />
              <CheckboxFormField
                control={filterForm.control}
                small
                path="typologie.nonDefini"
                label={
                  <LegendCheckboxLabel
                    label={
                      <>
                        <span className="fr-icon-map-pin-2-fill fr-icon--sm fr-text-title--blue-france fr-mr-1w" />
                        Non défini
                      </>
                    }
                    count={count.type.nonDefini}
                  />
                }
              />
              <p className="fr-text--lg fr-text--bold fr-mt-6v fr-mb-3v">
                Labels
              </p>
              <CheckboxFormField
                control={filterForm.control}
                small
                path="labels.conseillerNumerique"
                label={
                  <LegendCheckboxLabel
                    label="Lieux accueillant des conseillers numérique"
                    count={count.label.conseillerNumerique}
                  />
                }
              />
              <CheckboxFormField
                control={filterForm.control}
                small
                path="labels.franceServices"
                label={
                  <LegendCheckboxLabel
                    label="Points d’accueil numérique labellisés France Services"
                    count={count.label.franceServices}
                  />
                }
              />
              <CheckboxFormField
                control={filterForm.control}
                small
                path="labels.aidantConnect"
                label={
                  <LegendCheckboxLabel
                    label="Points d’accueil habilités Aidants Connect"
                    count={count.label.aidantsConnect}
                  />
                }
              />
              <CheckboxFormField
                control={filterForm.control}
                small
                path="labels.aucun"
                label={
                  <LegendCheckboxLabel
                    label="Aucun"
                    count={count.label.aucun}
                  />
                }
              />
              <p className="fr-text--lg fr-text--bold fr-mt-6v fr-mb-3v">
                Territoires prioritaires{' '}
                <InfoButton
                  iconId="fr-icon-information-line"
                  title="Informations sur les territoires prioritaires"
                  onClick={TerritoiresPrioritairesInformationModal.open}
                />
              </p>
              <CheckboxFormField
                control={filterForm.control}
                small
                path="territoiresPrioritaires.qpv"
                label={
                  <LegendCheckboxLabel
                    label="Lieux situés en quartier prioritaire de la ville (QPV)"
                    count={count.territoire.qpv}
                  />
                }
              />
              <CheckboxFormField
                control={filterForm.control}
                small
                path="territoiresPrioritaires.zrr"
                label={
                  <LegendCheckboxLabel
                    label="Lieux situés en zone de revitalisation rurale (ZRR)"
                    count={count.territoire.zrr}
                  />
                }
              />
              <CheckboxFormField
                control={filterForm.control}
                small
                path="territoiresPrioritaires.aucun"
                label={
                  <LegendCheckboxLabel
                    label="Aucun"
                    count={count.territoire.aucun}
                  />
                }
              />
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default Legend
