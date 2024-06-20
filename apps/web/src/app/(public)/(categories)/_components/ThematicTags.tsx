'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import Tag from '@codegouvfr/react-dsfr/Tag'

const toQueryString = (selected: string[]) =>
  selected.map((thematic: string) => `thematiques=${thematic}`).join('&')

const onlySelected = (option: string) => (thematic: string) =>
  thematic !== option

export const ThematicTags = ({
  href,
  thematic,
  selected = [],
  className,
}: {
  href: string
  thematic: { name: string; value: string }[]
  selected: string[]
  className?: string
}) => {
  const router = useRouter()

  const unselect = (option: string) => {
    router.push(
      `${href}?${toQueryString(selected.filter(onlySelected(option)))}`,
    )
  }

  const select = (option: string) => {
    router.push(`${href}?${toQueryString([...selected, option])}`)
  }

  return (
    <ul className="fr-tags-group fr-justify-content-center">
      {thematic.map(({ name, value }) => (
        <li key={name}>
          <Tag
            className={className}
            pressed={selected.includes(value)}
            nativeButtonProps={{
              onClick: () =>
                selected.includes(value) ? unselect(value) : select(value),
            }}
          >
            {name}
          </Tag>
        </li>
      ))}
    </ul>
  )
}
