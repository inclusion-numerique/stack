import Notice from '@codegouvfr/react-dsfr/Notice'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { searchConseillerNumeriqueV1 } from '@app/web/external-apis/conseiller-numerique/searchConseillerNumeriqueV1'
import styles from '@app/web/data-table/DataTable.module.css'

const AdministrationConseillersNumeriquesV1 = async ({
  recherche,
}: {
  recherche: string
}) => {
  try {
    // If there is no result, we also search in conum v1 database
    const v1ConseillersNumeriques = await searchConseillerNumeriqueV1({
      recherche,
    })

    console.log('RESULTS', v1ConseillersNumeriques)

    return (
      <>
        <p className="fr-mb-2v">
          <strong>{v1ConseillersNumeriques.length}</strong> résultat
          {sPluriel(v1ConseillersNumeriques.length)}
        </p>
        <div className="fr-table" data-fr-js-table="true">
          <div className="fr-table__wrapper">
            <div className="fr-table__container">
              <div className="fr-table__content">
                <table data-fr-js-table-element="true">
                  <thead>
                    <tr>
                      <th scope="col">Nom</th>
                      <th scope="col">Email</th>
                      <th scope="col">Email pro</th>
                      <th scope="col">Email CN</th>
                      <th scope="col">Nom commune</th>
                    </tr>
                  </thead>
                  <tbody>
                    {v1ConseillersNumeriques.map((row) => (
                      <tr
                        key={row.id.toString('hex')}
                        className={classNames(
                          'fr-enlarge-link',
                          styles.rowWithLink,
                        )}
                      >
                        <th>
                          {row.prenom} {row.nom}
                        </th>
                        <td>{row.email}</td>
                        <td>{row.emailPro}</td>
                        <td>{row.emailConseillerNumerique}</td>
                        <td>{row.nomCommune}</td>
                        <td className={styles.rowLinkCell}>
                          <Link
                            href={`/administration/conseillers-v1/${row.id.toString('hex')}`}
                          />
                        </td>
                      </tr>
                    ))}
                    {v1ConseillersNumeriques.length === 0 && (
                      <tr>
                        <td colSpan={5}>Aucun résultat</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } catch (error) {
    return (
      <>
        <Notice
          className="fr-notice--error"
          title="Erreur lors de la recherche sur la base de données conseillers numérique v1"
        />
        <p className="fr-mt-4v fr-text-default--error">
          {typeof error === 'string' && error}
          {typeof error === 'object' &&
            !!error &&
            'message' in error &&
            typeof error.message === 'string' &&
            error.message}
        </p>
      </>
    )
  }
}

export default AdministrationConseillersNumeriquesV1
