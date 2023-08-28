'use client'

import React, { FormEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import Notice from '@codegouvfr/react-dsfr/Notice'
import ActionBar from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/ActionBar'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { sPluriel } from '@app/web/utils/sPluriel'
import { useContactsCollectivites } from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/contacts-collectivites/useContactsCollectivites'
import ContactCollectiviteCard from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/contacts-collectivites/ContactCollectiviteCard'
import WhiteCard from '@app/web/ui/WhiteCard'

const ContactsCollectivites = ({
  formulaireGouvernance,
  nextEtapePath,
}: {
  formulaireGouvernance: GouvernanceFormulaireForForm
  nextEtapePath: string
}) => {
  const contactCollectiviteMutation =
    trpc.formulaireGouvernance.contactCollectivite.useMutation()

  const etapeMutation =
    trpc.formulaireGouvernance.etapeConcactsCollectivites.useMutation()

  const {
    contactsCollectivites,
    pendingContacts,
    completedContacts,
    totalContacts,
    saveContact,
    editContact,
  } = useContactsCollectivites({
    formulaireGouvernance,
    contactCollectiviteMutation,
  })

  const router = useRouter()

  const etapeForm = useForm<{ skip: boolean }>({
    defaultValues: {
      skip: false,
    },
  })

  const skip = etapeForm.watch('skip')

  const etapeError =
    !skip && pendingContacts
      ? "Vous devez renseigner un contact pour chaque collectivité partenaire avant de passer à l'étape suivante"
      : null

  const [showEtapeErrors, setShowEtapeErrors] = useState(false)

  const onPageSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setShowEtapeErrors(true)
    if (etapeError) {
      setTimeout(() => {
        // Scroll on next render
        document.querySelector('#etape-error')?.scrollIntoView()
      }, 0)
      return
    }

    try {
      await etapeMutation.mutateAsync({
        formulaireGouvernanceId: formulaireGouvernance.id,
      })
      router.push(nextEtapePath)
    } catch (mutationError) {
      console.error(mutationError)
    }
  }
  const isEtapeLoading = etapeMutation.isLoading || etapeMutation.isSuccess
  const disabled = isEtapeLoading
  const isAutoSaving = contactCollectiviteMutation.isLoading

  return (
    <>
      <p className="fr-mb-12v fr-text--xl">
        Nombre de collectivités&nbsp;:{' '}
        <span className="fr-text--bold">{totalContacts}</span>
      </p>
      {[...contactsCollectivites.values()].map((contactCollectivite) => (
        <ContactCollectiviteCard
          key={contactCollectivite.label}
          contactCollectivite={contactCollectivite}
          editContact={editContact}
          saveContact={saveContact}
          disabled={disabled}
          formulaireGouvernanceId={formulaireGouvernance.id}
        />
      ))}

      <form onSubmit={onPageSubmit}>
        <WhiteCard className="fr-mt-6v">
          {showEtapeErrors && !!etapeError && (
            <p id="etape-error" className="fr-error-text fr-mb-6v">
              {etapeError}
            </p>
          )}
          <CheckboxFormField
            control={etapeForm.control}
            path="skip"
            label="Je souhaite porter une feuille de route, mais je n'ai pas encore les contacts de mes partenaires territoriaux"
          />

          <Notice title="Vous pouvez également venir compléter ces informations plus tard, votre formulaire est enregistré." />
        </WhiteCard>
        <ActionBar
          loading={isEtapeLoading}
          autoSaving={isAutoSaving}
          formulaireGouvernanceId={formulaireGouvernance.id}
        >
          <span className="fr-text--bold fr-mr-1v">
            {completedContacts}/{totalContacts}
          </span>
          contact{sPluriel(totalContacts)} complété{sPluriel(totalContacts)}
        </ActionBar>
      </form>
    </>
  )
}

export default withTrpc(ContactsCollectivites)
