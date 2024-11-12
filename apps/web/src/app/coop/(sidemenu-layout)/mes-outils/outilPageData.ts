import type { ReactNode } from 'react'

export type OutilPageDataFeature = {
  title: string
  description: string
  icon: string
  link?: string
}

export type OutilPageDataAccessInfo = {
  label: string
  link: string
  share?: boolean
}

export type OutilPageDataAccess = {
  how: ReactNode
  icon?: string
  illustration?: string
  info?: OutilPageDataAccessInfo
  title?: string
  description?: string
  callToActionComponent?: ReactNode
  callToAction?: {
    label: string
    link: string
  }
}

export type OutilPageData = {
  notice?: string
  title: string
  description: string
  website: string
  logo: string
  illustration: string
  illustrationWidth?: number
  features?: OutilPageDataFeature[]
  access?: OutilPageDataAccess
  accessComponent?: ReactNode
  how?: ReactNode
}
