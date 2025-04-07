'use client'

import AdministrationInfoCard from '@app/web/app/administration/AdministrationInfoCard'
import UsurpUserButton from '@app/web/app/administration/usurpation/UsurpUserButton'
import { ChangeEvent, useState } from 'react'

const SudoUsurpation = () => {
  const [userId, setUserId] = useState('')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value)
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <AdministrationInfoCard title="Sudo usurpation">
      <div className="fr-flex fr-flex-row fr-flex-gap-4v fr-align-items-center">
        <input
          placeholder="User id"
          className="fr-input fr-mb-0"
          onChange={onChange}
        />
        <UsurpUserButton disabled={!userId} userId={userId} />
      </div>
    </AdministrationInfoCard>
  )
}

export default SudoUsurpation
