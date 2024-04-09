import { SelectOption } from '@app/ui/components/Form/utils/options'
import { prismaClient } from '@app/web/prismaClient'
import { getMembreGouvernanceStringName } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/getMembreGouvernanceStringName'

export const getSubventionBeneficiairesOptions = async ({
  gouvernanceId,
}: {
  gouvernanceId: string
}) =>
  prismaClient.membreGouvernance
    .findMany({
      where: {
        gouvernanceId,
      },
      select: {
        id: true,
        region: {
          select: {
            code: true,
            nom: true,
          },
        },
        departement: {
          select: {
            code: true,
            nom: true,
          },
        },
        epci: {
          select: {
            code: true,
            nom: true,
          },
        },
        commune: {
          select: {
            code: true,
            nom: true,
          },
        },
        nomStructure: true,
        siret: true,
      },
      orderBy: [
        { region: { nom: 'asc' } },
        { departement: { nom: 'asc' } },
        { epci: { nom: 'asc' } },
        { commune: { nom: 'asc' } },
        {
          nomStructure: 'asc',
        },
      ],
    })
    .then((membresGouvernance) =>
      membresGouvernance.map(
        (membre) =>
          ({
            value: membre.id,
            name: getMembreGouvernanceStringName(membre),
          }) satisfies SelectOption,
      ),
    )
