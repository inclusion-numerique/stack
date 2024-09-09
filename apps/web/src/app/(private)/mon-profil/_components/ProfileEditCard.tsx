'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createToast } from '@app/ui/toast/createToast'
import EditCard from '@app/web/components/EditCard'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import {
  UpdateProfileData,
  UpdateProfileValidation,
} from '@app/web/app/user/UpdateProfileValidation'
import { ProfileView } from './ProfileView'
import type { UserRoleLabel } from '@app/web/utils/getUserRoleLabel'

const ProfileEditCard = (profileData: {
  email: string
  name?: string | null
  phone?: string | null
  userRole: UserRoleLabel
}) => {
  const mutation = trpc.user.updateProfile.useMutation()
  const router = useRouter()
  const form = useForm<UpdateProfileData>({
    resolver: zodResolver(UpdateProfileValidation),
    defaultValues: {},
  })

  const handleMutation = async (data: UpdateProfileData) => {
    try {
      await mutation.mutateAsync(data)

      createToast({
        priority: 'success',
        message: 'Votre profil a bien été modifié.',
      })

      router.refresh()
    } catch (mutationError) {
      if (
        applyZodValidationMutationErrorsToForm(mutationError, form.setError)
      ) {
        return
      }
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’enregistrement, veuillez réessayer ultérieurement.',
      })
    }
  }

  return (
    <EditCard
      canEdit={false}
      contentSeparator
      id="description"
      title="Vos informations personnelles"
      titleAs="h2"
      form={form}
      mutation={handleMutation}
      edition="TODO: edition"
      view={<ProfileView {...profileData} />}
    />
  )
}

export default withTrpc(ProfileEditCard)
