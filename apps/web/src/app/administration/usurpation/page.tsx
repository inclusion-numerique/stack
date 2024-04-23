import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Button from '@codegouvfr/react-dsfr/Button'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { prismaClient } from '@app/web/prismaClient'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { usurper } from '@app/web/app/administration/usurpation/usurper'

export const metadata = {
  title: metadataTitle('Usurpation'),
}

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
    <div className="fr-container">
      <Breadcrumb
        className="fr-mb-4v"
        currentPageLabel="Usurpation"
        segments={[
          {
            label: 'Page d’accueil',
            linkProps: {
              href: '/',
            },
          },
          {
            label: 'Administration',
            linkProps: {
              href: '/administration',
            },
          },
        ]}
      />
      <h1 className="fr-h2 fr-text-title--blue-france fr-mb-8v">
        Usurpation d’utilisateurs de test
      </h1>
      <p>
        Sur les instances de preview, vous pouvez vous connecter en tant
        qu’utilisateur de test (fixture) pour tester différent parcours.
      </p>

      {PublicWebAppConfig.isMain && (
        <Notice
          title="Cette fonctionnalité n’est pas disponible en production.
          Vous pouvez tester cette fonctionnalité en local ou sur une autre
          instance de l’application"
        />
      )}
      {!PublicWebAppConfig.isMain && (
        <div className="fr-table" data-fr-js-table="true">
          <table data-fr-js-table-element="true">
            <thead>
              <tr>
                <th scope="col">Utilisateur</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {fixtureUsers.map((row) => (
                <tr key={row.id}>
                  <th>{row.name}</th>
                  <td>
                    <form action={usurper}>
                      <input type="hidden" value={row.id} name="id" />
                      <Button
                        type="submit"
                        iconId="fr-icon-user-star-line"
                        size="small"
                        priority="secondary"
                      >
                        Usurper
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
              {fixtureUsers.length === 0 && (
                <tr>
                  <td colSpan={4}>Aucun utilisateur de test n’a été chargé</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Page
