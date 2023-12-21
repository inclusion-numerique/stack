import type { ButtonProps } from '@codegouvfr/react-dsfr/Button'

export const followBaseButtonProps = {
  iconId: 'fr-icon-user-heart-line',
  children: 'Suivre',
  priority: 'primary' as ButtonProps['priority'],
  size: 'small',
} as const

export const unfollowBaseButtonProps = {
  iconId: undefined,
  children: 'Ne plus suivre',
  priority: 'tertiary' as ButtonProps['priority'],
  size: 'small',
} as const

export const followBaseIconOnlyButtonProps = {
  iconId: 'fr-icon-user-heart-line',
  title: 'Suivre la base',
  priority: 'tertiary no outline' as ButtonProps['priority'],
  size: 'small',
} as const

export const unfollowBaseIconOnlyButtonProps = {
  iconId: 'fr-icon-user-heart-fill',
  title: 'Ne plus suivre la base',
  priority: 'tertiary no outline' as ButtonProps['priority'],
  size: 'small',
} as const

// Same for profile

export const followProfileButtonProps = {
  iconId: 'fr-icon-user-heart-line',
  children: 'Suivre',
  priority: 'primary' as ButtonProps['priority'],
  size: 'small',
} as const

export const unfollowProfileButtonProps = {
  iconId: 'fr-icon-user-heart-fill',
  children: 'Ne plus suivre',
  priority: 'secondary' as ButtonProps['priority'],
  size: 'small',
}

export const followProfileIconOnlyButtonProps = {
  iconId: 'fr-icon-user-heart-line',
  title: 'Suivre le profil',
  priority: 'tertiary no outline' as ButtonProps['priority'],
  size: 'small',
} as const

export const unfollowProfileIconOnlyButtonProps = {
  iconId: 'fr-icon-user-heart-fill',
  title: 'Ne plus suivre le profil',
  priority: 'tertiary no outline' as ButtonProps['priority'],
  size: 'small',
} as const
