import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { create } from 'zustand'

type DynamicModalState<T> = {
  state: T
  setState: (state: T) => void
}

export const createDynamicModal = <T>({
  id,
  isOpenedByDefault,
  initialState,
}: {
  id: string
  isOpenedByDefault: boolean
  initialState: T
}) => {
  const createModalReturn = createModal({
    id,
    isOpenedByDefault,
  })

  const useModalStore = create<DynamicModalState<T>>((set) => ({
    state: initialState,
    setState: (state: T) => set({ state }),
  }))

  const useState = () => useModalStore((state) => state.state)

  const useOpen = () => {
    const setState = useModalStore((state) => state.setState)
    return (openState: T) => {
      setState(openState)
      createModalReturn.open()
    }
  }

  return { ...createModalReturn, useOpen, useState }
}

export type DynamicModalReturn<T> = ReturnType<typeof createDynamicModal<T>>
