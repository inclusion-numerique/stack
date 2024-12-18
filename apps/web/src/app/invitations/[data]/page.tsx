import React from 'react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import {
  decodeSerializableState,
  EncodedState,
} from '@app/web/utils/encodeSerializableState'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { Invitation } from '@app/web/equipe/InvitationValidation'
import { AlreadyProcessed } from './_components/alreadyProcessed'
import { getInvitationData } from './_components/getInvitationData'
import { JoinTeam } from './_components/JoinTeam'

export const metadata: Metadata = {
  title: metadataTitle('Invitation à rejoindre une équipe'),
}

const isValid = (invitation: Invitation | null): invitation is Invitation =>
  invitation?.email != null && invitation?.coordinateurId != null

const isWrongUserFor =
  ({ email }: Invitation) =>
  (user: { email: string } | null): user is { email: string } =>
    user?.email != null && user.email !== email

const InvitationPage = async ({
  params: { data },
}: {
  params: { data: EncodedState<Invitation> }
}) => {
  const invitation = decodeSerializableState(data, null)

  if (!isValid(invitation)) redirect('/')

  const user = await getSessionUser()

  if (isWrongUserFor(invitation)(user)) return redirect('/coop/invitation')

  const invitationData = await getInvitationData(invitation)

  return invitationData == null ? (
    <AlreadyProcessed />
  ) : (
    <div className="fr-layout__main fr-container-fluid fr-height-full">
      <JoinTeam
        data={data}
        user={invitationData.coordinateur.user}
        teamMemberCount={
          invitationData.coordinateur._count.mediateursCoordonnes
        }
      />
    </div>
  )
}

export default InvitationPage
