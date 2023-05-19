import classNames from 'classnames'
import React, { useCallback, useMemo } from 'react'
import { ChainedCommands, Editor } from '@tiptap/react'
import styles from './RichInputFormMenuBar.module.css'

const RichInputFormMenuBar = ({ editor }: { editor: Editor }) => {
  const setLink = useCallback(
    (command: ChainedCommands) => {
      if (editor.isActive('link')) {
        command.unsetLink().run()
        return
      }

      const url = window.prompt('URL')

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        command.extendMarkRange('link').unsetLink().run()

        return
      }

      // update link
      command.extendMarkRange('link').setLink({ href: url }).run()
    },
    [editor],
  )

  const buttons = useMemo(
    () => [
      {
        src: '/images/editor-h2.svg',
        alt: 'Titre 2',
        event: (command: ChainedCommands) =>
          command.toggleHeading({ level: 2 }).run(),
        active: () => editor.isActive('heading', { level: 2 }),
      },
      {
        src: '/images/editor-h3.svg',
        alt: 'Titre 3',
        event: (command: ChainedCommands) =>
          command.toggleHeading({ level: 3 }).run(),
        active: () => editor.isActive('heading', { level: 3 }),
      },
      {
        src: '/images/editor-h4.svg',
        alt: 'Titre 4',
        event: (command: ChainedCommands) =>
          command.toggleHeading({ level: 4 }).run(),
        active: () => editor.isActive('heading', { level: 4 }),
      },
      {
        src: '/images/editor-bold.svg',
        alt: 'Gras',
        event: (command: ChainedCommands) => command.toggleBold().run(),
        active: () => editor.isActive('bold'),
      },
      {
        src: '/images/editor-italic.svg',
        alt: 'Italique',
        event: (command: ChainedCommands) => command.toggleItalic().run(),
        active: () => editor.isActive('italic'),
      },
      {
        src: '/images/editor-list-ordered.svg',
        alt: 'List ordonée',
        event: (command: ChainedCommands) => command.toggleOrderedList().run(),
        active: () => editor.isActive('orderedList'),
      },
      {
        src: '/images/editor-list-unordered.svg',
        alt: 'List non ordonée',
        event: (command: ChainedCommands) => command.toggleBulletList().run(),
        active: () => editor.isActive('bulletList'),
      },
      'separator-1',
      {
        src: '/images/editor-link.svg',
        alt: 'Lien',
        event: (command: ChainedCommands) => setLink(command),
        active: () => editor.isActive('link'),
      },
    ],
    [editor, setLink],
  )

  return (
    <div className={styles.buttons}>
      {buttons.map((button) =>
        typeof button === 'string' ? (
          <div key={button} className={styles.separator} />
        ) : (
          <button
            data-testid={`${button.alt}-button`}
            key={button.alt}
            onClick={(event) => {
              event.preventDefault()
              button.event(editor.chain().focus())
            }}
            className={classNames(styles.button, {
              [styles.active]: button.active(),
            })}
            type="button"
          >
            <img src={button.src} alt={button.alt} />
          </button>
        ),
      )}
    </div>
  )
}

export default RichInputFormMenuBar
