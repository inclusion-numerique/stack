import Badge from '@codegouvfr/react-dsfr/Badge'
import React, { Fragment } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import {
  DataTableConfiguration,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { compareMultiple } from '@app/web/utils/compareMultiple'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { detailGouvernancePath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { numberToEuros } from '@app/web/utils/formatNumber'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { compareFromArrayIndex } from '@app/web/utils/compareFromArrayIndex'
import {
  AdministrationBeneficiairesSubventionsDataRow,
  contactToString,
  searchableContactsToString,
} from '@app/web/app/(with-navigation)/administration/beneficiaires-subventions/getAdministrationBeneficiairesSubventions'
import { membreGouvernanceStatuts } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/getMembreGouvernanceStringName'

export const AdministrationBeneficiairesSubventionsDataTable = {
  csvFilename: () => `fne-${dateAsIsoDay(new Date())}-beneficiaires`,
  rowKey: ({ id }) => id,
  defaultSortableInMemory: (a, b) =>
    compareMultiple(
      a.gouvernance.departement.code.localeCompare(
        b.gouvernance.departement.code,
      ),
      a.nom.localeCompare(b.nom),
    ),
  rowInMemorySearchableString: (row) =>
    `${row.gouvernance.departement.searchable} ${row.nom} ${row.type} ${row.siret ?? row.codeInsee ?? ''} ${searchableContactsToString(row.contacts)}`,
  columns: [
    {
      name: 'convention',
      header: null,
      cell: ({ nom }) => (
        <Button
          size="small"
          title={`Télécharger la convention pour ${nom}`}
          iconId="fr-icon-download-line"
        />
      ),
    },
    {
      name: 'departement',
      header: 'Département',
      csvHeaders: ['Département'],
      csvValues: ({
        gouvernance: {
          departement: { code },
        },
      }) => [code],
      cell: ({
        gouvernance: {
          departement: { code, nom },
        },
      }) => <span title={nom}>{code}</span>,
      defaultSortable: true,
    },
    {
      name: 'beneficiaire',
      header: 'Bénéficiaire',
      csvHeaders: ['Bénéficiaire'],
      csvValues: ({ nom }) => [nom],
      cell: ({ nom }) => nom,
      sortable: (a, b) => a.nom.localeCompare(b.nom),
    },
    {
      name: 'typologie',
      header: 'Typologie',
      csvHeaders: ['Typologie'],
      csvValues: ({ type }) => [type],
      cell: ({ type }) => type,
      sortable: (a, b) => a.type.localeCompare(b.type),
    },
    {
      name: 'role',
      header: 'Role dans la gouvernance',
      csvHeaders: ['Role dans la gouvernance'],
      csvValues: ({ statutGouvernance }) => [statutGouvernance],
      cell: ({ statutGouvernance }) => statutGouvernance,
      sortable: (a, b) =>
        compareFromArrayIndex(
          a.statutGouvernance,
          b.statutGouvernance,
          membreGouvernanceStatuts,
        ),
    },
    {
      name: 'Fonds demandés',
      header: 'Fonds demandés',
      csvHeaders: ['Fonds demandés'],
      csvValues: ({ montantDemande }) => [montantDemande.toNumber()],
      cellClassName: 'fr-text--right',
      cell: ({ montantDemande }) => numberToEuros(montantDemande),
      sortable: (a, b) => a.montantDemande.sub(b.montantDemande).toNumber(),
    },
    {
      name: 'Actions',
      header: 'Actions',
      csvHeaders: ['Actions'],
      csvValues: ({ demandesCounts }) => [demandesCounts.total],
      cellClassName: 'fr-text--right',
      cell: ({ demandesCounts }) => demandesCounts.total || null,
      sortable: (a, b) => a.demandesCounts.total - b.demandesCounts.total,
    },
    {
      name: 'en-cours',
      header: 'En cours',
      csvHeaders: ['En cours'],
      csvValues: ({ demandesCounts }) => [demandesCounts.enCours],
      cellClassName: 'fr-text--right',
      cell: ({ demandesCounts }) =>
        demandesCounts.enCours ? (
          <Badge small severity="info" noIcon>
            {demandesCounts.enCours}
          </Badge>
        ) : null,
      sortable: (a, b) => a.demandesCounts.enCours - b.demandesCounts.enCours,
    },
    {
      name: 'a-instruire',
      header: 'À instruire',
      csvHeaders: ['À instruire'],
      csvValues: ({ demandesCounts }) => [demandesCounts.aInstruire],
      cellClassName: 'fr-text--right',
      cell: ({ demandesCounts }) =>
        demandesCounts.aInstruire ? (
          <Badge small severity="new" noIcon>
            {demandesCounts.aInstruire}
          </Badge>
        ) : null,
      sortable: (a, b) =>
        a.demandesCounts.aInstruire - b.demandesCounts.aInstruire,
    },
    {
      name: 'validees',
      header: 'Validées',
      csvHeaders: ['Validées'],
      csvValues: ({ demandesCounts }) => [demandesCounts.validees],
      cellClassName: 'fr-text--right',
      cell: ({ demandesCounts }) =>
        demandesCounts.validees ? (
          <Badge small severity="success" noIcon>
            {demandesCounts.validees}
          </Badge>
        ) : null,
      sortable: (a, b) => a.demandesCounts.validees - b.demandesCounts.validees,
    },
    {
      name: 'contacts',
      header: 'Contacts',
      csvHeaders: ['Contacts'],
      csvValues: ({ contacts }) => [contacts.map(contactToString).join(', ')],
      cell: ({ contacts }) => (
        <>
          {contacts.map(({ nom, email, type, fonction }) => (
            <Fragment key={email}>
              <Link
                href={`mailto:${nom}<${email}>`}
                className="fr-link fr-link--xs"
              >
                {type}&nbsp;:{' '}
                <b>
                  {nom} {email}
                </b>{' '}
                {!!fonction && `(${fonction})`}
              </Link>
              <br />
            </Fragment>
          ))}
        </>
      ),
    },
    {
      name: 'siret',
      header: 'Siret',
      csvHeaders: ['Siret'],
      csvValues: ({ siret }) => [siret],
      cell: ({ siret }) => siret,
    },
    {
      name: 'code-insee',
      header: 'Code Insee',
      csvHeaders: ['Code Insee'],
      csvValues: ({ codeInsee }) => [codeInsee],
      cell: ({ codeInsee }) => codeInsee,
    },

    {
      name: 'lien-instruire',
      header: null,
      csvHeaders: ['Instruire les demandes'],
      csvValues: ({
        gouvernance: {
          departement: { code },
        },
      }) => [
        getServerUrl(
          `/administration/gouvernances/${code}/demandes-de-subvention`,
        ),
      ],
      cell: ({
        gouvernance: {
          departement: { code },
        },
      }) => (
        <a
          className="fr-link fr-link--xs fr-ml-1v"
          href={`/administration/gouvernances/${code}/demandes-de-subvention`}
        >
          Instruire les demandes
        </a>
      ),
    },
    {
      name: 'lien-gouvernance',
      header: null,
      csvHeaders: ['Voir la gouvernance'],
      csvValues: ({
        gouvernance: {
          id,
          departement: { code },
        },
      }) => [
        getServerUrl(detailGouvernancePath({ codeDepartement: code }, id)),
      ],
      cell: ({
        gouvernance: {
          id,
          departement: { code },
        },
      }) => (
        <a
          className="fr-link fr-link--xs fr-ml-1v"
          href={detailGouvernancePath({ codeDepartement: code }, id)}
          target="_blank"
        >
          Voir la gouvernance
        </a>
      ),
    },
  ],
} satisfies DataTableConfiguration<AdministrationBeneficiairesSubventionsDataRow>

export type AdministrationBeneficiairesSubventionsDataTableSearchParams =
  DataTableSearchParams<typeof AdministrationBeneficiairesSubventionsDataTable>
