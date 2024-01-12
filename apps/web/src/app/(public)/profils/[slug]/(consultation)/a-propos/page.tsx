import React from 'react'
import sanitizeHtml from 'sanitize-html'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { getDepartmentName } from '@app/web/utils/departments'
import type { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'
import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import EmptyProfileInformations from '@app/web/components/Profile/EmptyProfileInformations'

const hasInformations = (profile: ProfilePageData): boolean =>
  profile.description != null || profile.department != null

const hasSocialNetwork = (profile: ProfilePageData): boolean =>
  profile.facebook != null ||
  profile.twitter != null ||
  profile.linkedin != null

const hasContact = (profile: ProfilePageData): boolean =>
  (profile.emailIsPublic && profile.email != null) || profile.website != null

const AProposPage = async ({ params }: ProfilRouteParams) => {
  // Auth and profile has been checked in layout
  const { profile, authorizations } = await getProfilePageContext(params.slug)

  return hasInformations(profile) ||
    hasInformations(profile) ||
    hasContact(profile) ? (
    <>
      <h2 className="fr-mb-6w fr-h3">À propos</h2>
      <hr />
      <div className="fr-grid-row">
        {hasInformations(profile) && (
          <div className="fr-col-8">
            <h3 className="fr-h6 fr-mb-1w">Informations</h3>
            {profile.description && (
              <div className="fr-mb-2w">
                <div className="fr-text-mention--grey">Description</div>
                <span
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(profile.description),
                  }}
                ></span>
              </div>
            )}
            {profile.department && (
              <div className="fr-mb-2w">
                <div className="fr-text-mention--grey">Département</div>
                {getDepartmentName(profile.department)}
              </div>
            )}
          </div>
        )}
        {(hasContact(profile) || hasSocialNetwork(profile)) && (
          <div className="fr-col">
            {hasContact(profile) && (
              <>
                <h3 className="fr-h6 fr-mb-1w">Contact</h3>
                {profile.emailIsPublic && profile.email && (
                  <div className="fr-mb-2w">
                    <div className="fr-text-mention--grey">
                      Adresse mail de contact
                    </div>
                    <a
                      href={profile.email}
                      className="fr-link"
                      rel="noreferrer"
                      target="_blank"
                    >
                      {profile.email}
                    </a>
                  </div>
                )}
                {profile.website && (
                  <div className="fr-mb-2w">
                    <div className="fr-text-mention--grey">Site internet</div>
                    <a
                      href={profile.website}
                      className="fr-link"
                      rel="noreferrer"
                      target="_blank"
                    >
                      {profile.website}
                    </a>
                  </div>
                )}
              </>
            )}
            {hasSocialNetwork(profile) && (
              <>
                <h3 className="fr-h6 fr-mb-1w">Nous suivre</h3>
                <div className="fr-flex fr-flex-wrap fr-flex-gap-5v">
                  {profile.facebook && (
                    <a
                      href={profile.facebook}
                      className="fr-link"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span
                        role="img"
                        className="ri-facebook-circle-fill"
                        aria-hidden="true"
                      ></span>
                      &nbsp;Facebook
                    </a>
                  )}
                  {profile.twitter && (
                    <a
                      href={profile.twitter}
                      className="fr-link"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span
                        role="img"
                        className="ri-twitter-fill"
                        aria-hidden="true"
                      ></span>
                      &nbsp;X (Twitter)
                    </a>
                  )}

                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      className="fr-link"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span
                        role="img"
                        className="ri-linkedin-box-fill"
                        aria-hidden="true"
                      ></span>
                      &nbsp;Linkedin
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  ) : (
    <EmptyProfileInformations isConnectedUser={authorizations.isUser} />
  )
}

export default AProposPage
