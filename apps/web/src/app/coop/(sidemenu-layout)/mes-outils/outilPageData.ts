type Feature = {
  title: string
  description: string
  icon: string
  link?: string
}

type Access = {
  how: string
  icon?: string
  illustration?: string
  info: {
    label: string
    link: string
    share?: boolean
  }
  title?: string
  description?: string
  callToAction: {
    label: string
    link: string
  }
}

export type OutilPageData = {
  title: string
  description: string
  website: string
  logo: string
  illustration: string
  illustrationWidth?: number
  features?: Feature[]
  access?: Access
}
