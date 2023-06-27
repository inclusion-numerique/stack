'use client'

import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import SearchableSelect from '@app/ui/components/SearchableSelect/SearchableSelect'
import { City } from '@app/web/types/City'
import styles from './Legend.module.css'
import LegendCity from './LegendCity'

const Legend = ({
  cities,
  setSelectedCity,
  departement,
}: {
  cities: City[]
  setSelectedCity: Dispatch<SetStateAction<City | undefined | null>>
  departement: { name: string; code: string }
}) => {
  const [legendCollapsed, setLegendCollapsed] = useState(false)

  const categories = useMemo(
    () => [
      {
        name: 'Communes',
        options: cities.map((city) => ({
          name: `${city.nom} ${city.codesPostaux.join(' ')}`,
          value: city.nom,
          component: <LegendCity city={city} />,
        })),
      },
      { name: 'Structures', options: [] },
    ],
    [cities],
  )

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
            setSelected={(selectedCity) =>
              setSelectedCity(cities.find((city) => city.nom === selectedCity))
            }
            categories={categories}
            options={undefined}
            limit={undefined}
          />
          <h6 className={styles.legendTitle}>
            Les acteurs de l&lsquo;Inclusion Numérique
          </h6>
          <p className="fr-text--xs fr-hint-text fr-mb-3w">Source : ???</p>
        </div>
      )}
    </div>
  )
}

export default Legend
