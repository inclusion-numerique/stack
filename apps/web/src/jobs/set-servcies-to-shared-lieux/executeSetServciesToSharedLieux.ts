import { output } from '@app/cli/output'
import { servicesStructureLabels } from '@app/web/app/structure/optionsStructure'
import { PrismaClient } from '@prisma/client'
import { SetServciesToSharedLieuxJob } from './setServciesToSharedLieuxJob'

const prisma = new PrismaClient()

const DEFAULT_SERVICES = [
  servicesStructureLabels['Aide aux démarches administratives'],
  servicesStructureLabels['Maîtrise des outils numériques du quotidien'],
  servicesStructureLabels['Insertion professionnelle via le numérique'],
  servicesStructureLabels['Utilisation sécurisée du numérique'],
  servicesStructureLabels['Parentalité et éducation avec le numérique'],
  servicesStructureLabels['Loisirs et créations numériques'],
  servicesStructureLabels['Comprehension du monde numérique'],
]

export const executeSetServciesToSharedLieux = async (
  _job: SetServciesToSharedLieuxJob,
) => {
  output('Starting set default services to lieux shared with cartographie...')

  const lieuxToSetServices = await prisma.structure.findMany({
    where: {
      visiblePourCartographieNationale: true,
      services: { isEmpty: true },
    },
  })

  output(`Found ${lieuxToSetServices.length} lieux to set default services`)

  for (const lieu of lieuxToSetServices) {
    await prisma.structure.update({
      where: { id: lieu.id },
      data: {
        services: DEFAULT_SERVICES,
      },
    })
  }

  output('Successfully set default services to lieux shared with cartographie')
}
