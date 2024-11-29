import type { Prisma } from '@prisma/client'
import Tag from '@codegouvfr/react-dsfr/Tag'
import type {
  DataTableConfiguration,
  DataTableFilterValues,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { UtilisateurForList } from '@app/web/app/administration/utilisateurs/queryUtilisateursForList'
import { booleanToYesNo } from '@app/web/utils/yesNoBooleanOptions'
import { optionalNumberToString } from '@app/web/utils/formatNumber'
import { getUserLifecycle } from '@app/web/app/administration/utilisateurs/getUserLifecycle'
import { getUserLifecycleBadge } from '@app/web/app/administration/utilisateurs/getUserLifecycleBadge'
import { dateAsDayAndTime } from '@app/web/utils/dateAsDayAndTime'
import CopyToClipboardButton from '@app/web/components/CopyToClipboardButton'

export type UtilisateursDataTableConfiguration = DataTableConfiguration<
  UtilisateurForList,
  Prisma.UserWhereInput,
  Prisma.UserOrderByWithRelationInput
>

export const UtilisateursDataTable = {
  csvFilename: () => `coop-${dateAsIsoDay(new Date())}-utilisateurs`,
  rowKey: ({ id }) => id,
  rowLink: ({ id }) => ({ href: `/administration/utilisateurs/${id}` }),
  columns: [
    {
      name: 'statut',
      header: 'Statut',
      csvHeaders: ['Statut'],
      csvValues: (user) => [getUserLifecycle(user)],
      cell: (user) => getUserLifecycleBadge(user),
    },
    {
      name: 'creation',
      header: 'Créé',
      csvHeaders: ['Créé'],
      defaultSortable: true,
      defaultSortableDirection: 'desc',
      csvValues: ({ created }) => [created.toISOString()],
      cell: ({ created }) => dateAsDayAndTime(created),
      orderBy: (direction) => [
        {
          created: direction,
        },
      ],
    },
    {
      name: 'nom',
      header: 'Nom',
      csvHeaders: ['Nom'],
      csvValues: ({ name }) => [name],
      cell: ({ name }) => name,
      orderBy: (direction) => [
        {
          lastName: direction,
        },
      ],
    },
    {
      name: 'email',
      header: 'Email',
      csvHeaders: ['Email'],
      csvValues: ({ email }) => [email],
      cell: ({ email }) => (
        <div className="fr-position-relative fr-pl-11v">
          {email}
          <CopyToClipboardButton
            size="small"
            value={email}
            style={{ zIndex: 10, position: 'absolute', left: 0 }}
          />
        </div>
      ),
      orderBy: (direction) => [
        {
          email: direction,
        },
      ],
    },
    {
      name: 'activites',
      header: 'Activités',
      csvHeaders: ['Activités'],
      csvValues: ({ mediateur }) => [mediateur?._count.activites],
      cell: ({ mediateur }) =>
        optionalNumberToString(mediateur?._count.activites, null),
      orderBy: (direction) => [
        {
          mediateur: {
            activites: { _count: direction },
          },
        },
      ],
    },
    {
      name: 'lieux-activite',
      header: 'Lieux d’activité',
      csvHeaders: ['Lieux d’activité'],
      csvValues: ({ mediateur }) => [mediateur?._count.enActivite],
      cell: ({ mediateur }) =>
        optionalNumberToString(mediateur?._count.enActivite, null),
      orderBy: (direction) => [
        {
          mediateur: {
            enActivite: { _count: direction },
          },
        },
      ],
    },
    {
      name: 'beneficiaires',
      header: 'Bénéficiaires',
      csvHeaders: ['Bénéficiaires'],
      csvValues: ({ mediateur }) => [mediateur?._count.beneficiaires],
      cell: ({ mediateur }) =>
        optionalNumberToString(mediateur?._count.beneficiaires, null),
      orderBy: (direction) => [
        {
          mediateur: {
            beneficiaires: { _count: direction },
          },
        },
      ],
    },
    {
      name: 'roles',
      header: 'Rôles',
      csvHeaders: ['Rôle', 'Médiateur', 'Conseiller numérique', 'Coordinateur'],
      csvValues: ({ role, mediateur, coordinateur }) => [
        role,
        booleanToYesNo(!!mediateur),
        booleanToYesNo(!!mediateur?.conseillerNumerique),
        booleanToYesNo(!!coordinateur),
      ],
      cell: ({ role, mediateur, coordinateur }) => (
        <div className="fr-flex fr-flex-gap-2v">
          {role === 'Admin' && <Tag small>Administrateur</Tag>}
          {role === 'Support' && <Tag small>Support</Tag>}
          {!!mediateur && <Tag small>Médiateur</Tag>}
          {!!mediateur?.conseillerNumerique && (
            <Tag small>Conseiller numérique</Tag>
          )}
          {!!coordinateur && <Tag small>Coordinateur</Tag>}
        </div>
      ),
    },
  ],
} satisfies UtilisateursDataTableConfiguration

export type UtilisateursDataTableSearchParams =
  DataTableSearchParams<UtilisateursDataTableConfiguration>

export type UtilisateursDataTableFilterValues =
  DataTableFilterValues<UtilisateursDataTableConfiguration>
