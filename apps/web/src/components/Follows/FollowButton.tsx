import Button from '@codegouvfr/react-dsfr/Button'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import { loginUrl } from '@app/web/security/login'
import ClientFollowButton from '@app/web/components/Follows/ClientFollowButton'
import {
  followBaseButtonProps,
  followBaseIconOnlyButtonProps,
  followProfileButtonProps,
  followProfileIconOnlyButtonProps,
} from '@app/web/components/Follows/followButtonProps'
import { BasePageData } from '@app/web/server/bases/getBase'
import { FilteredBase } from '@app/web/server/bases/authorization'

export type FollowButtonProps = {
  user: SessionUser | null
  iconOnly?: boolean
} & (
  | { base: BaseListItem | BasePageData | FilteredBase; profile?: undefined }
  | {
      profile: ProfileListItem
      base?: undefined
    }
)

export const FollowButton = (props: FollowButtonProps) => {
  const { profile, base, user, iconOnly } = props

  if (!profile && !base) {
    return null
  }

  if (user) {
    // Only load client logic for button with feature for logged in user
    return <ClientFollowButton {...props} />
  }

  const href = loginUrl({
    intent: 'suivre-une-base-ou-un-profil',
  })

  // Server component version

  if (base) {
    return (
      <Button
        {...(iconOnly ? followBaseIconOnlyButtonProps : followBaseButtonProps)}
        linkProps={{
          href,
        }}
      />
    )
  }

  return (
    <Button
      {...(iconOnly
        ? followProfileIconOnlyButtonProps
        : followProfileButtonProps)}
      linkProps={{
        href,
      }}
    />
  )
}
