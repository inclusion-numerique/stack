'use client'

import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { FollowButtonProps } from '@app/web/components/Follows/FollowButton'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

/**
 * Only load client follow button for logged in user (see FollowButton)
 */
const ClientFollowButton = ({
  base,
  profile,
  user,
  buttonProps,
}: FollowButtonProps & { buttonProps: ButtonProps.IconOnly }) => {
  const followBaseMutation = trpc.follow.base.useMutation()
  const followProfileMutation = trpc.follow.profile.useMutation()

  const onFollow = () => {
    console.log('ON FOLLOW', { base, profile, user })
  }

  const isLoading =
    followBaseMutation.isPending || followProfileMutation.isPending

  return (
    <Button
      size="small"
      priority="tertiary no outline"
      {...buttonProps}
      {...buttonLoadingClassname(isLoading)}
      type="button"
      onClick={onFollow}
    />
  )
}

export default withTrpc(ClientFollowButton)
