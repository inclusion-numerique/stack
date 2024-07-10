'use client'

import { useRouter } from 'next/navigation'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { LieuActivite } from './LieuActivite'

const LieuxActiviteList = ({
  lieuxActivite,
}: {
  lieuxActivite: {
    modification: Date
    creation: Date
    structure: {
      id: string
      nom: string
      adresse: string
      complementAdresse?: string | null
      codePostal: string
      commune: string
      typologies?: string[]
      siret?: string | null
      rna?: string | null
      visiblePourCartographieNationale?: boolean
      structureCartographieNationaleId?: string | null
    }
  }[]
}) => {
  const router = useRouter()
  const mutation = trpc.lieuActivite.delete.useMutation()

  const handleDeleteMediateurActivite = async (id: string) => {
    await mutation.mutateAsync({ structureId: id })
    router.refresh()
  }

  return (
    <>
      {lieuxActivite.map((lieuActivite) => (
        <LieuActivite
          key={lieuActivite.structure.id}
          {...lieuActivite.structure}
          creation={lieuActivite.creation}
          modification={lieuActivite.modification}
          onDelete={handleDeleteMediateurActivite}
        />
      ))}
    </>
  )
}

export default withTrpc(LieuxActiviteList)
