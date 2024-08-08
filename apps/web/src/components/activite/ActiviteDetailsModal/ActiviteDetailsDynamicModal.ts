'use client'

import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import type { Activite } from '@app/web/cra/activitesQueries'

export type ActiviteDetailsDynamicModalState = {
  activite: Activite
}

export const ActiviteDetailsDynamicModal = createDynamicModal({
  id: 'activite-details',
  isOpenedByDefault: false,
  initialState: null as null | ActiviteDetailsDynamicModalState,
})
