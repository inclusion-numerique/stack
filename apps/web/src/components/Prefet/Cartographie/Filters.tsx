import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { useForm } from 'react-hook-form'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import { StructureFilters } from '@app/web/components/Prefet/Cartographie/structureFilters'
import styles from './Filters.module.css'

const closeOnClickOutside = false

const defaultValues = {
  typologie: {
    publique: false,
    association: false,
    privee: false,
    nonDefini: false,
    // Subtypes of public
    commune: false,
    epci: false,
    departement: false,
    autre: false,
  },
  labels: {
    conseillerNumerique: false,
    franceServices: false,
    aidantConnect: false,
    aucun: false,
  },
  territoiresPrioritaires: {
    zrr: false,
    qpv: false,
    aucun: false,
  },
}

const Filters = ({
  onFilter,
}: {
  onFilter: (filters: StructureFilters) => void
}) => {
  const [open, setOpen] = useState(false)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)

  const onClickOutside = (event: MouseEvent) => {
    if (!closeOnClickOutside) {
      return
    }
    // Let the event propagate if clicked on the control button
    if (event.target === buttonRef?.current) {
      return
    }

    setOpen(false)
  }
  useOnClickOutside(filtersRef, onClickOutside)

  const filterForm = useForm<StructureFilters>({
    defaultValues,
  })
  filterForm.watch((values) => {
    onFilter(values as StructureFilters)
  })

  const onReset = () => {
    filterForm.reset(defaultValues)
  }

  const filtersCount = Object.values(filterForm.watch())
    .flatMap((subtree) => Object.values(subtree))
    .filter(Boolean).length

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

  // TODO Use on click outside ?
  // TODO Use dsfr collapse ?
  return (
    <div className={classNames(styles.container, open && styles.open)}>
      <Button
        type="button"
        priority="tertiary"
        iconId="fr-icon-equalizer-line"
        onClick={() => setOpen(!open)}
        ref={buttonRef}
        className={classNames(styles.button)}
      >
        Tous les filtres <span className={styles.count}>{filtersCount}</span>
      </Button>
      <div className={classNames(styles.filters)} ref={filtersRef}>
        <form onSubmit={() => {}}>
          <section className={styles.filtersTop}>
            <p className="fr-text--sm fr-text--bold fr-mb-0">
              Typologie des lieux d’inclusion numérique
            </p>
            <CheckboxFormField
              key={programmaticallyCheckedKeys.publique}
              control={filterForm.control}
              small
              path="typologie.publique"
              onChange={onPubliqueChange}
              label={
                <>
                  <span className="fr-icon-government-fill fr-icon--sm fr-text-title--blue-france fr-mr-1w" />
                  Public
                </>
              }
            />
            <div className="fr-pl-3w">
              <CheckboxFormField
                key={programmaticallyCheckedKeys.commune}
                control={filterForm.control}
                small
                path="typologie.commune"
                onChange={onSubtypeChange}
                label="Commune"
              />
              <CheckboxFormField
                key={programmaticallyCheckedKeys.epci}
                control={filterForm.control}
                small
                path="typologie.epci"
                onChange={onSubtypeChange}
                label="EPCI"
              />
              <CheckboxFormField
                key={programmaticallyCheckedKeys.departement}
                control={filterForm.control}
                small
                path="typologie.departement"
                onChange={onSubtypeChange}
                label="Département"
              />
              <CheckboxFormField
                key={programmaticallyCheckedKeys.autre}
                control={filterForm.control}
                small
                path="typologie.autre"
                onChange={onSubtypeChange}
                label="Autre"
              />
            </div>
            <CheckboxFormField
              control={filterForm.control}
              small
              path="typologie.association"
              label={
                <>
                  <span className="fr-icon-team-fill fr-icon--sm fr-text-title--blue-france fr-mr-1w" />
                  Associations
                </>
              }
            />
            <CheckboxFormField
              control={filterForm.control}
              small
              path="typologie.privee"
              label={
                <>
                  <span className="fr-icon-building-fill fr-icon--sm fr-text-title--blue-france fr-mr-1w" />
                  Autres acteurs privés
                </>
              }
            />
            <CheckboxFormField
              control={filterForm.control}
              small
              path="typologie.nonDefini"
              label={
                <>
                  <span className="fr-icon-map-pin-2-fill fr-icon--sm fr-text-title--blue-france fr-mr-1w" />
                  Non défini
                </>
              }
            />
            <p className="fr-text--sm  fr-text--bold fr-mt-4v fr-mb-0">
              Labels
            </p>
            <CheckboxFormField
              control={filterForm.control}
              small
              path="labels.conseillerNumerique"
              label="Lieux accueillant des conseillers numérique"
            />
            <CheckboxFormField
              control={filterForm.control}
              small
              path="labels.franceServices"
              label="Points d’accueil numérique labellisés France Services"
            />
            <CheckboxFormField
              control={filterForm.control}
              small
              path="labels.aidantConnect"
              label="Points d’accueil habilités Aidants Connect"
            />
            <CheckboxFormField
              control={filterForm.control}
              small
              path="labels.aucun"
              label="Aucun"
            />
            <p className="fr-text--sm  fr-text--bold fr-mt-4v fr-mb-0">
              Territoires prioritaires
            </p>
            <CheckboxFormField
              control={filterForm.control}
              small
              path="territoiresPrioritaires.qpv"
              label="Structures en quartier prioritaire de la ville (QPV)"
            />
            <CheckboxFormField
              control={filterForm.control}
              small
              path="territoiresPrioritaires.zrr"
              label="Structures en zone de revitalisation rurale (ZRR)"
            />
            <CheckboxFormField
              control={filterForm.control}
              small
              path="territoiresPrioritaires.aucun"
              label="Aucun"
            />
          </section>
        </form>
        <Button
          className={styles.reset}
          priority="tertiary no outline"
          onClick={onReset}
          iconId="fr-icon-add-circle-line"
          size="small"
        >
          Réinitialiser les filtres
        </Button>
      </div>
    </div>
  )
}

export default Filters
