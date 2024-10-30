'use client'

import { ChangeEvent, useState } from 'react'
import AdministrationInfoCard from '@app/web/app/administration/AdministrationInfoCard'
import UsurpUserButton from '@app/web/app/administration/usurpation/UsurpUserButton'

export const SudoUsurpation = () => {
  const [userId, setUserId] = useState('')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
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
