'use client'

import React, { useMemo, useState } from 'react'
import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import SearchableSelect from '@app/ui/components/SearchableSelect/SearchableSelect'
import Link from 'next/link'
import { City } from '@app/web/types/City'
import {
  Structure,
  StructuresData,
} from '@app/web/components/Prefet/structuresData'
import LegendStructure from '@app/web/components/Prefet/Cartographie/LegendStructure'
import styles from './Legend.module.css'
import LegendCity from './LegendCity'

const Legend = ({
  cities,
  departement,
  structuresData,
  onStructureSelected,
  selectedCity: _selectedCity,
  onCitySelected,
  selectedStructure: _selectedStructure,
}: {
  departement: { name: string; code: string }
  cities: City[]
  structuresData: StructuresData
  selectedCity?: City | null
  onCitySelected: (city: string | null | undefined) => void
  selectedStructure?: Structure | null
  onStructureSelected: (structure: string | null | undefined) => void
}) => {
  const [legendCollapsed, setLegendCollapsed] = useState(false)

  const categories = useMemo(
    () => [
      {
        name: 'Communes',
        options: cities.map((city) => ({
          name: `${city.nom} ${city.codesPostaux.join(' ')}`,
          value: `city#${city.nom}`,
          component: <LegendCity city={city} />,
        })),
      },
      {
        name: 'Structures',
        options: structuresData.structures.map((structure) => ({
          name: structure.properties.name,
          value: `structure#${structure.properties.id}`,
          component: <LegendStructure structure={structure} />,
        })),
      },
    ],
    [cities, structuresData],
  )

  const onSelect = (value: string) => {
    if (value === '') {
      onCitySelected(null)
      onStructureSelected(null)
      return
    }
    if (value.startsWith('city#')) {
      const cleanValue = value.replace(/^city#/, '')
      onCitySelected(cleanValue)
      return
    }

    if (value.startsWith('structure#')) {
      const cleanValue = value.replace(/^structure#/, '')
      onStructureSelected(cleanValue)
    }
  }

  return (
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
                label: departement.name,
                linkProps: {
                  href: `/prefet/${departement.code}`,
                },
              },
            ]}
          />
          <SearchableSelect
            placeholder="Recherche une commune ou une structure"
            onSelect={onSelect}
            categories={categories}
            options={undefined}
            limit={undefined}
          />
          <h6 className={styles.legendTitle}>
            Les acteurs de l&lsquo;Inclusion Numérique
          </h6>
          <p className="fr-text--xs fr-hint-text fr-mb-3w">
            Source :{' '}
            <Link
              href="https://donnees.incubateur.anct.gouv.fr"
              target="_blank"
            >
              Données et territoires
            </Link>{' '}
          </p>
        </div>
      )}
    </div>
  )
}

export default Legend
