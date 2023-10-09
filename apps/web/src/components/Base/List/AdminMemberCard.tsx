'use client'

import React, { ChangeEvent, useCallback, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BaseMember } from '@app/web/server/bases/getBase'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import styles from '@app/web/components/Profile/Card/Card.module.css'
import { trpc } from '@app/web/trpc'
import RemoveMemberButton from './RemoveMemberButton'

const AdminMemberCard = ({
  member,
  onlyAdmin,
}: {
  member: BaseMember
  onlyAdmin: boolean
}) => {
  const [isAdmin, setIsAdmin] = useState(member.isAdmin)
  const mutate = trpc.baseMember.mutate.useMutation()
  const router = useRouter()

  const onChange = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      const result = event.target.value === 'admin'
      setIsAdmin(result)
      await mutate.mutateAsync({
        baseId: member.baseId,
        memberId: member.member.id,
        isAdmin: result,
      })
      router.refresh()
    },
    [mutate, member, router],
  )

  return (
    <div className={styles.container} data-testid="member-card-admin">
      <Link className={styles.content} href={`/profils/${member.member.id}`}>
        <div className={styles.logo} />
        {member.member.name}
      </Link>
      <div className={styles.actions}>
        {onlyAdmin && isAdmin ? (
          <div className={styles.select}>Administrateur</div>
        ) : (
          <>
            <select
              data-testid="member-card-role-select"
              onChange={onChange}
              className={styles.select}
              value={isAdmin ? 'admin' : 'member'}
            >
              <option value="admin">Administrateur</option>
              <option value="member">Membre</option>
            </select>
            <RemoveMemberButton member={member} />
          </>
        )}
      </div>
    </div>
  )
}

export default withTrpc(AdminMemberCard)