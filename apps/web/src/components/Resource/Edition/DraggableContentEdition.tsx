import React, {
  Dispatch,
  PointerEventHandler,
  RefObject,
  SetStateAction,
  useRef,
} from 'react'
import { Reorder, useDragControls } from 'framer-motion'
import Button from '@codegouvfr/react-dsfr/Button'
import type { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import type { SendCommand } from '@app/web/components/Resource/Edition/Edition'
import type { ContentProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { ResourceEditionState } from '@app/web/components/Resource/enums/ResourceEditionState'
import styles from '@app/web/components/Resource/Edition/Edition.module.css'
import ContentEdition from '@app/web/components/Resource/Edition/ContentEdition'

/**
 * This is draggable using Framer Motion
 * Layout animations and exit animations are controlled in ContentListEdition component
 */
const DraggableContentEdition = ({
  content,
  editing,
  setEditing,
  sendCommand,
  resource,
  index,
  dragConstraints,
  editionState,
}: {
  resource: ResourceProjectionWithContext
  editing: string | null
  setEditing: Dispatch<SetStateAction<string | null>>
  sendCommand: SendCommand
  content: ContentProjection
  index: number
  dragConstraints: RefObject<HTMLElement>
  editionState: ResourceEditionState
}) => {
  const testId = `content-edition_${content.type}-${index}`

  const controls = useDragControls()

  const dragButtonRef = useRef<HTMLButtonElement>(null)

  // Disable drag when resource is being mutated
  const dragDisabled = editionState !== ResourceEditionState.SAVED

  // Trigger drag on button pointer down, if allowed
  const onDragButtonPointerDown: PointerEventHandler = (event) => {
    if (dragDisabled) {
      return
    }
    controls.start(event)
  }

  // Changing cursor on button when dragging as css selector causes flickering
  const onDragStart = (_event: MouseEvent | TouchEvent | PointerEvent) => {
    const button = dragButtonRef.current
    if (button) {
      button.style.cursor = 'grabbing'
    }
  }

  // Trigger mutation on drag end
  const onDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent) => {
    const button = dragButtonRef.current
    if (button) {
      button.style.cursor = ''
    }

    const { target } = event
    if (!(target instanceof HTMLButtonElement) || !target.dataset.index) {
      // Only here for type safety
      // It should never happen as the drag button is our only source of event
      return
    }

    const newOrder = Number.parseInt(target.dataset.index, 10)

    if (content.order === newOrder) {
      // No-op if new order is the same
    }

    await sendCommand({
      name: 'ReorderContent',
      payload: {
        resourceId: resource.id,
        id: content.id,
        order: newOrder,
      },
    })
  }

  // Deletion callback passed down to view and form components
  const onDelete = async () => {
    await sendCommand({
      name: 'RemoveContent',
      payload: {
        resourceId: resource.id,
        id: content.id,
      },
    })
    setEditing(null)
  }

  return (
    <Reorder.Item
      key={content.id}
      value={content}
      data-testid={testId}
      className={styles.content}
      drag
      dragListener={false}
      dragControls={controls}
      dragSnapToOrigin
      dragConstraints={dragConstraints}
      dragTransition={{
        // Applied when releasing drag
        bounceStiffness: 450,
        bounceDamping: 30,
      }}
      onDragStart={onDragStart}
      whileDrag={{
        // Apply cursor style to whole element to avoid cursor flickering on imprecise drag
        cursor: 'grabbing',
      }}
      onDragEnd={onDragEnd}
      layout="position"
      animate={{ opacity: 1, height: 'auto' }}
      initial={false}
      exit={{
        // Applied when exit (deletion of content)
        opacity: 0,
        height: 0,
      }}
      transition={{
        // I could not find an easy/performant way to apply different transitions to exit, reordering and shift :(
        // This transition configuration WILL apply to ALL
        // - exit
        // - reordering
        // - layout shift if content switch to edition / view mode and height changes
        duration: 0.2,
      }}
    >
      <ContentEdition
        data-testid={testId}
        content={content}
        resource={resource}
        sendCommand={sendCommand}
        editing={editing}
        setEditing={setEditing}
        editionState={editionState}
        onDelete={onDelete}
      />
      {editionState !== ResourceEditionState.EDITING && (
        <Button
          ref={dragButtonRef}
          data-testid={`${testId}_drag-button`}
          data-index={index}
          disabled={editionState !== ResourceEditionState.SAVED}
          iconId="ri-draggable"
          title="Réordonner"
          size="small"
          priority="tertiary no outline"
          className={styles.dragButton}
          type="button"
          nativeButtonProps={{ onPointerDown: onDragButtonPointerDown }}
        />
      )}
    </Reorder.Item>
  )
}

export default DraggableContentEdition
