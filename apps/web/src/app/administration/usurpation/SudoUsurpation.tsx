'use client'

import AdministrationInfoCard from '@app/web/app/administration/AdministrationInfoCard'
import { ChangeEvent, useState } from 'react'
import UsurpUserButton from '@app/web/app/administration/usurpation/UsurpUserButton'

export const SudoUsurpation = () => {
  const [userId, setUserId] = useState('')

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value)
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <AdministrationInfoCard title="Sudo usurpation">
      <input
        placeholder="User id"
        className="fr-input fr-mb-4v"
        onChange={onChange}
      />
      {!!userId && <UsurpUserButton userId={userId} />}
    </AdministrationInfoCard>
  )
}

export default SudoUsurpation
