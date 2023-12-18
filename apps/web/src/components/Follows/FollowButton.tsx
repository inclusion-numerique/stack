import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import { loginUrl } from '@app/web/security/login'
import ClientFollowButton from '@app/web/components/Follows/ClientFollowButton'

export type FollowButtonProps = { user: SessionUser | null } & (
  | { base: BaseListItem; profile?: undefined }
  | {
      profile: ProfileListItem
      base?: undefined
    }
)

export const FollowButton = (props: FollowButtonProps) => {
  const { profile, base, user } = props

  if (!profile && !base) {
    return null
  }

  const buttonProps: ButtonProps.IconOnly = {
    title: `Suivre ${profile ? 'le profil' : 'la base'}`,
    iconId: 'fr-icon-user-heart-line',
  }

  console.log('IS USER', user, 'PROFILE', profile, 'BASE', base)
  if (user) {
    // Only load client logic for logged in user
    return <ClientFollowButton {...props} buttonProps={buttonProps} />
  }

  const href = loginUrl({
    intent: 'suivre-une-base-ou-un-profil',
  })

  return (
    <Button
      {...buttonProps}
      size="small"
      priority="tertiary no outline"
      linkProps={{
        href,
      }}
    />
  )
}
