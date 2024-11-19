import Notice from '@codegouvfr/react-dsfr/Notice'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { prismaClient } from '@app/web/prismaClient'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import UsurpUserButton from '@app/web/app/administration/usurpation/UsurpUserButton'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import ResetUserFixtureButton from '@app/web/app/administration/usurpation/ResetUserFixtureButton'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import SudoUsurpation from '@app/web/app/administration/usurpation/SudoUsurpation'

export const metadata = {
  title: metadataTitle('Usurpation'),
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async () => {
  const fixtureUsers = await prismaClient.user.findMany({
    where: {
      isFixture: true,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <CoopPageContainer>
      <AdministrationBreadcrumbs currentPage="Usurpation" />
      <AdministrationTitle icon="ri-spy-line">
        Usurpation d’utilisateurs de test
      </AdministrationTitle>
      <p>
        Sur les instances de preview, vous pouvez vous connecter en tant
        qu’utilisateur de test (fixture) pour tester différent parcours.
      </p>

      {ServerWebAppConfig.Sudo.usurpation && <SudoUsurpation />}

      {PublicWebAppConfig.isMain && (
        <Notice
          title="Cette fonctionnalité n’est pas disponible en production.
          Vous pouvez tester cette fonctionnalité en local ou sur une autre
          instance de l’application"
        />
      )}
      {!PublicWebAppConfig.isMain && (
        <div className="fr-table" data-fr-js-table="true">
          <div className="fr-table__wrapper">
            <div className="fr-table__container">
              <div className="fr-table__content">
                <table data-fr-js-table-element="true">
                  <thead>
                    <tr>
                      <th scope="col">Utilisateur</th>
                      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                      <th scope="col" colSpan={2} />
                    </tr>
                  </thead>
                  <tbody>
                    {fixtureUsers.map((row) => (
                      <tr key={row.id}>
                        <th>{row.name}</th>
                        <td>
                          <UsurpUserButton size="small" userId={row.id} />
                        </td>
                        <td>
                          <ResetUserFixtureButton userId={row.id} />
                        </td>
                      </tr>
                    ))}
                    {fixtureUsers.length === 0 && (
                      <tr>
                        <td colSpan={4}>
                          Aucun utilisateur de test n’a été chargé
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </CoopPageContainer>
  )
}

export default Page
