import Badge from '@codegouvfr/react-dsfr/Badge'
import React from 'react'
import {
  DataTableConfiguration,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { compareMultiple } from '@app/web/utils/compareMultiple'
import { getServerUrl } from '@app/web/utils/baseUrl'
import {
  detailGouvernancePath,
  gouvernanceHomePath,
} from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { numberToEuros } from '@app/web/utils/formatNumber'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import type { AdministrationGouvernancesDataRow } from '@app/web/app/(with-navigation)/administration/gouvernances/getAdministrationGouvernances'
import {
  statutsAction,
  statutsDemandeSubvention,
} from '@app/web/gouvernance/statutDemandesSubvention'
import { compareFromArrayIndex } from '@app/web/utils/compareFromArrayIndex'

export const AdministrationGouvernancesDataTable = {
  csvFilename: () => `fne-${dateAsIsoDay(new Date())}-gouvernances`,
  rowKey: ({ departement }) => departement.code,
  defaultSortableInMemory: (a, b) =>
    a.departement.code.localeCompare(b.departement.code),
  rowInMemorySearchableString: (row) => row.departement.searchable,
  columns: [
    {
      name: 'departement',
      header: 'Département',
      csvHeaders: ['Département', 'Nom'],
      csvValues: ({ departement: { code, nom } }) => [code, nom],
      cellAsTh: true,
      cell: ({ departement: { code, nom } }) => (
        <>
          {code}&nbsp;·&nbsp;{nom}
        </>
      ),
      defaultSortable: true,
    },
    {
      name: 'coporteurs',
      header: 'Coporteurs',
      csvHeaders: ['Coporteurs'],
      csvValues: ({ membresCounts }) => [membresCounts.coPorteurs],
      sortable: (a, b) =>
        compareMultiple(
          (a.gouvernance ? 1 : 0) - (b.gouvernance ? 1 : 0),
          a.membresCounts.coPorteurs - b.membresCounts.coPorteurs,
        ),
      cell: ({ gouvernance, membresCounts }) =>
        gouvernance ? (
          membresCounts.coPorteurs === 0 ? (
            <Badge small severity="info">
              Aucun&nbsp;co-porteur
            </Badge>
          ) : (
            membresCounts.coPorteurs
          )
        ) : (
          <Badge small severity="warning">
            Aucune&nbsp;gouvernance
          </Badge>
        ),
    },
    {
      name: 'membres',
      header: 'Membres',
      csvHeaders: ['Membres'],
      csvValues: ({ membresCounts }) => [membresCounts.total],
      cellClassName: 'fr-text--right',
      cell: ({ membresCounts }) => membresCounts.total || null,
      sortable: (a, b) =>
        compareMultiple(
          (a.gouvernance ? 1 : 0) - (b.gouvernance ? 1 : 0),
          a.membresCounts.total - b.membresCounts.total,
        ),
    },
    {
      name: 'feuilles-de-route',
      header: 'Feuilles de route',
      csvHeaders: ['Feuilles de route'],
      csvValues: ({ feuillesDeRoutesCount }) => [feuillesDeRoutesCount],
      cellClassName: 'fr-text--right',
      cell: ({ feuillesDeRoutesCount }) => feuillesDeRoutesCount || null,
      sortable: (a, b) => a.feuillesDeRoutesCount - b.feuillesDeRoutesCount,
    },
    {
      name: 'dotation-totale',
      header: 'Dotation totale',
      csvHeaders: ['Dotation totale'],
      csvValues: ({ dotationTotale }) => [dotationTotale.toNumber()],
      cellClassName: 'fr-text--right',
      cell: ({ dotationTotale }) => numberToEuros(dotationTotale),
      sortable: (a, b) => a.dotationTotale.sub(b.dotationTotale).toNumber(),
    },
    {
      name: 'dotation-ingenierie',
      header: 'Dotation ingénierie',
      csvHeaders: ['Dotation ingénierie'],
      csvValues: ({ dotationIngenierie }) => [dotationIngenierie.toNumber()],
      cellClassName: 'fr-text--right',
      cell: ({ dotationIngenierie }) => numberToEuros(dotationIngenierie),
      sortable: (a, b) =>
        a.dotationIngenierie.sub(b.dotationIngenierie).toNumber(),
    },
    {
      name: 'beneficiaire-formation',
      header: 'Bénéficiaire formation',
      csvHeaders: ['Bénéficiaire formation'],
      csvValues: ({ statutBeneficiaireFormation }) => [
        statutBeneficiaireFormation,
      ],
      cell: ({ statutBeneficiaireFormation }) =>
        statutBeneficiaireFormation === 'Validé' ? (
          <Badge small severity="success">
            {statutBeneficiaireFormation}
          </Badge>
        ) : statutBeneficiaireFormation === 'Envoyé' ? (
          <Badge small severity="new">
            {statutBeneficiaireFormation}
          </Badge>
        ) : statutBeneficiaireFormation === 'En cours' ? (
          <Badge small severity="info">
            {statutBeneficiaireFormation}
          </Badge>
        ) : (
          <Badge small severity="warning">
            {statutBeneficiaireFormation}
          </Badge>
        ),
      sortable: (a, b) =>
        compareMultiple(
          compareFromArrayIndex(
            a.statutBeneficiaireFormation,
            b.statutBeneficiaireFormation,
            statutsAction,
          ),
          a.demandesCounts.total - b.demandesCounts.total,
        ),
    },
    {
      name: 'statut-demandes',
      header: 'Statut subventions',
      csvHeaders: ['Statut subventions'],
      csvValues: ({ statutDemandesSubvention }) => [statutDemandesSubvention],
      cell: ({ statutDemandesSubvention }) =>
        statutDemandesSubvention === 'Finalisé' ? (
          <Badge small severity="success">
            {statutDemandesSubvention}
          </Badge>
        ) : statutDemandesSubvention === 'En cours' ? (
          <Badge small severity="info">
            {statutDemandesSubvention}
          </Badge>
        ) : (
          <Badge small severity="warning">
            {statutDemandesSubvention}
          </Badge>
        ),
      sortable: (a, b) =>
        compareMultiple(
          compareFromArrayIndex(
            a.statutDemandesSubvention,
            b.statutDemandesSubvention,
            statutsDemandeSubvention,
          ),
          a.demandesCounts.total - b.demandesCounts.total,
        ),
    },
    {
      name: 'montant',
      header: 'Montant demandé',
      csvHeaders: ['Montant demandé'],
      csvValues: ({ montantDemande }) => [montantDemande.toNumber()],
      cellClassName: 'fr-text--right',
      cell: ({ montantDemande }) =>
        montantDemande.gt(0) ? numberToEuros(montantDemande) : null,
      sortable: (a, b) => a.montantDemande.sub(b.montantDemande).toNumber(),
    },
    {
      name: 'beneficiaires',
      header: 'Bénéficiaires',
      csvHeaders: ['Bénéficiaires'],
      csvValues: ({ deduplicatedBeneficiairesCount }) => [
        deduplicatedBeneficiairesCount,
      ],
      cellClassName: 'fr-text--right',
      cell: ({ deduplicatedBeneficiairesCount }) =>
        deduplicatedBeneficiairesCount || null,
      sortable: (a, b) =>
        a.deduplicatedBeneficiairesCount - b.deduplicatedBeneficiairesCount,
    },
    {
      name: 'actions',
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
      name: 'lien-instruire',
      header: null,
      csvHeaders: ['Instruire les demandes'],
      csvValues: ({ gouvernance, departement: { code } }) => [
        gouvernance
          ? getServerUrl(
              `/administration/gouvernances/${code}/demandes-de-subvention`,
            )
          : null,
      ],
      cell: ({ gouvernance, departement: { code } }) =>
        gouvernance ? (
          <a
            className="fr-link fr-link--xs fr-ml-1v"
            href={`/administration/gouvernances/${code}/demandes-de-subvention`}
          >
            Instruire les demandes
          </a>
        ) : null,
    },
    {
      name: 'lien-gouvernance',
      header: null,
      csvHeaders: ['Voir la gouvernance'],
      csvValues: ({ gouvernance, departement: { code } }) => [
        gouvernance
          ? getServerUrl(
              detailGouvernancePath({ codeDepartement: code }, gouvernance.id),
            )
          : null,
      ],
      cell: ({ gouvernance, departement: { code } }) =>
        gouvernance ? (
          <a
            className="fr-link fr-link--xs fr-ml-1v"
            href={detailGouvernancePath(
              { codeDepartement: code },
              gouvernance.id,
            )}
            target="_blank"
          >
            Voir la gouvernance
          </a>
        ) : null,
    },
    {
      name: 'vue-prefecture',
      header: null,
      cell: ({ gouvernance, departement: { code } }) =>
        gouvernance ? (
          <a
            className="fr-link fr-link--xs fr-ml-1v"
            href={gouvernanceHomePath({ codeDepartement: code })}
          >
            Vue préfecture
          </a>
        ) : null,
    },
  ],
} satisfies DataTableConfiguration<AdministrationGouvernancesDataRow>

export type AdministrationGouvernancesDataTableSearchParams =
  DataTableSearchParams<typeof AdministrationGouvernancesDataTable>
