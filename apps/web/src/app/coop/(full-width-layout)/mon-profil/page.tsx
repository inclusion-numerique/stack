import { redirect } from 'next/navigation'
import { differenceInMonths, format, isValid } from 'date-fns'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import { getUserRoleLabel } from '@app/web/utils/getUserRoleLabel'
import { findConseillerNumeriqueByEmail } from '@app/web/external-apis/conseiller-numerique/findConseillerNumeriqueByEmail'
import { CoordinatorContract } from './_components/CoordinatorContract'
import ProfileEditCard from './_components/ProfileEditCard'
import FonctionnalitesDeMediationNumeriqueCoordinateur from '@app/web/app/coop/(full-width-layout)/mon-profil/_components/FonctionnalitesDeMediationNumeriqueCoordinateur'

const formatDate = (date?: string | number | Date | null) =>
  date && isValid(date) ? format(date, 'dd/MM/yyyy') : null

const typeWithDuration = ({
  typeDeContrat,
  dateDebutDeContrat,
  dateFinDeContrat,
}: {
  typeDeContrat: string
  dateDebutDeContrat: Date | null
  dateFinDeContrat?: Date | null
}): string =>
  !!dateDebutDeContrat &&
  isValid(dateDebutDeContrat) &&
  !!dateFinDeContrat &&
  isValid(dateFinDeContrat)
    ? `${typeDeContrat} - Durée ${differenceInMonths(dateFinDeContrat, dateDebutDeContrat)} mois`
    : typeDeContrat

const MonProfilPage = async () => {
  const user = await getAuthenticatedSessionUser()

  if (!user) {
    return redirect('/')
  }

  const conseiller = await findConseillerNumeriqueByEmail(user.email)

  const contract =
    conseiller?.miseEnRelationActive == null
      ? undefined
      : {
          type: typeWithDuration(conseiller.miseEnRelationActive).replaceAll(
            '_',
            ' ',
          ),
          start: formatDate(
            conseiller.miseEnRelationActive?.dateDebutDeContrat,
          ),
          end: formatDate(conseiller.miseEnRelationActive?.dateFinDeContrat),
        }

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <div className="fr-container fr-container--800">
        <CoopBreadcrumbs currentPage="Mon profil" />
        <main id={contentId} className="fr-mb-16w">
          <div className="fr-flex fr-flex-wrap fr-direction-row fr-align-items-center fr-flex-gap-4v fr-my-12v">
            <span
              className="ri-account-circle-fill ri-lg fr-line-height-1 fr-text-label--blue-france fr-background-alt--blue-france fr-p-2w fr-m-0 fr-border-radius--8"
              aria-hidden
            />
            <h1 className="fr-h2 fr-page-title fr-m-0">Mon profil</h1>
          </div>
          <section className="fr-mb-2w">
            <ProfileEditCard
              name={user.name}
              email={user.email}
              phone={user.phone}
              userRole={getUserRoleLabel(user)}
            />
          </section>
          {contract?.type != null && (
            <section className="fr-mb-2w">
              <CoordinatorContract {...contract} />
            </section>
          )}
          {user.coordinateur ? (
            <section>
              <FonctionnalitesDeMediationNumeriqueCoordinateur
                isActive={user.mediateur?.id != null}
              />
            </section>
          ) : null}
        </main>
      </div>
    </>
  )
}

export default MonProfilPage
