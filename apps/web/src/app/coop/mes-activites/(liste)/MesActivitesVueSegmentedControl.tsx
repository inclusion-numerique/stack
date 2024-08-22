'use client'

import { SegmentedControl } from '@codegouvfr/react-dsfr/SegmentedControl'
import { type ComponentProps, FormEvent, FormEventHandler } from 'react'
import { useRouter } from 'next/navigation'

const MesActivitesVueSegmentedControl = ({
  current,
}: {
  current: 'liste' | 'tableau'
}) => {
  /**
   * On change redirect to :
   *    href: '/coop/mes-activites',
   *     or
   *    href: '/coop/mes-activites/tableau',
   */

  const router = useRouter()

  const onChange: FormEventHandler = (event: FormEvent) => {
    const { checked, dataset } = event.target as HTMLInputElement

    if (checked) {
      router.push(
        dataset.vue === 'tableau'
          ? '/coop/mes-activites/tableau'
          : '/coop/mes-activites',
      )
    }
  }

  const listeInputProps = {
    defaultChecked: current === 'liste',
    'data-vue': 'liste',
  } as ComponentProps<'input'>

  const tableauInputProps = {
    defaultChecked: current === 'tableau',
    'data-vue': 'tableau',
  } as ComponentProps<'input'>

  return (
    <form onChange={onChange} key={current}>
      <SegmentedControl
        name="vue"
        legend="Type de vue"
        hideLegend
        small
        segments={[
          {
            iconId: 'fr-icon-list-unordered',
            label: 'Vue liste',
            nativeInputProps: listeInputProps,
          },
          {
            iconId: 'fr-icon-table-line',
            label: 'Vue tableau',
            nativeInputProps: tableauInputProps,
          },
        ]}
      />
    </form>
  )
}

export default MesActivitesVueSegmentedControl
