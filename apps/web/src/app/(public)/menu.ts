import { Route } from 'next'

type MenuItem = {
  text: string
  href: Route
}

export const menu: MenuItem[] = [
  { text: 'Accueil', href: '/' },
  { name: 'Ressources', href: '/ressources' },
]
