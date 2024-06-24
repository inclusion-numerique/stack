'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Tag from '@codegouvfr/react-dsfr/Tag'
import { createThematicLink } from '../_helpers/createThematicLink'

const onlySelected = (option: string) => (thematic: string) =>
  thematic !== option

export const ThematicTags = ({
  href,
  thematic,
  selected = [],
  page,
  className,
}: {
  href: string
  thematic: { name: string; value: string }[]
  selected: string[]
  page?: number
  className?: string
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(false)
  }, [searchParams])

  const unselect = (option: string) => {
    router.push(
      createThematicLink(href, selected.filter(onlySelected(option)))(page),
    )
    setIsLoading(true)
  }

  const select = (option: string) => {
    router.push(createThematicLink(href, [...selected, option])(page))
    setIsLoading(true)
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
              disabled: isLoading,
            }}
          >
            {name}
          </Tag>
        </li>
      ))}
    </ul>
  )
}
