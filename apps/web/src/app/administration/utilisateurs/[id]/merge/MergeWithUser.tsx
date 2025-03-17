'use client'

import AdministrationSearchSingleUtilisateur from '@app/web/app/administration/utilisateurs/AdministrationSearchSingleUtilisateur'
import { useRouter } from 'next/navigation'

export const MergeWithUser = ({
  userId,
  defaultMergeUser,
}: {
  userId: string
  defaultMergeUser?: { id: string; name: string | null; email: string }
}) => {
  const router = useRouter()

  const handleSearchUserSelect = ({ value: id }: { value: string }) => {
    router.push(`/administration/utilisateurs/${userId}/merge/${id}`)
  }

  return (
    <div className="fr-border-radius--8 fr-border fr-p-8v fr-mb-6v">
      <h2 className="fr-h6">Rechercher l’utilisateur avec lequel fusionner</h2>
      <AdministrationSearchSingleUtilisateur
        onSelect={handleSearchUserSelect}
        defaultUser={defaultMergeUser}
        excludeUserIds={[userId]}
      />
    </div>
  )
}
