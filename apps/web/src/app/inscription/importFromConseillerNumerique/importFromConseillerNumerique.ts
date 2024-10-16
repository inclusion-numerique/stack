import { ObjectId } from 'mongodb'
import { v4 } from 'uuid'
import {
  type Prisma,
  ProfilInscription,
  StructureCartographieNationale,
} from '@prisma/client'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  ConseillerNumeriqueByEmailFinder,
  ConseillerNumeriqueFound,
} from '@app/web/external-apis/conseiller-numerique/findConseillerNumeriqueByEmail'
import { PremanenceConseillerNumerique } from '@app/web/external-apis/conseiller-numerique/PremanenceConseillerNumerique'
import { toStructureFromCartoStructure } from '@app/web/structure/toStructureFromCartoStructure'
import {
  associateCoordinateursTo,
  associateLieuxAtiviteFor,
  associateConseillersCoordonnesTo,
  createConseillerNumerique,
  createCoordinateur,
  createStructureEmployeuseFor,
  createStructures,
  findCartoStructureFor,
  findConseillerNumeriquesFor,
  findCoordinateursFor,
  findExistingStructureFor,
  findExistingStructuresCartoFor,
  markAsCheckedConseillerNumerique,
  markAsCheckedMediateur,
  toId,
} from './importFromConseillerNumerique.queries'

type ImportFromConseillerNumeriquePayload = {
  user: SessionUser
  profil: ProfilInscription
}

type StructureCartographieNationaleWithMatchingStructure =
  StructureCartographieNationale & {
    structures: { id: string }[] | null
  }

// todo: review `|| user.mediateur == null` removed
const alreadyProcessed = (user: SessionUser) =>
  user.checkConseillerNumeriqueInscription != null

const isConseillerNumerique = (
  mediateur?: SessionUser['mediateur'],
): mediateur is NonNullable<SessionUser['mediateur']> =>
  mediateur?.conseillerNumerique?.id != null

const toStructureToCreate = (permanence: PremanenceConseillerNumerique) =>
  ({
    id: v4(),
    nom: permanence.nomEnseigne,
    siteWeb: permanence.siteWeb,
    adresse: `${permanence.adresse.numeroRue} ${permanence.adresse.rue}`.trim(),
    commune: permanence.adresse.ville,
    codePostal: permanence.adresse.codePostal,
    latitude: permanence.location.coordinates[1],
    longitude: permanence.location.coordinates[0],
    siret: permanence.siret,
    codeInsee: permanence.adresse.codeCommune,
  }) satisfies Prisma.StructureCreateManyInput

const onlyWithoutStructure = (
  structureCarto: StructureCartographieNationaleWithMatchingStructure,
) => !structureCarto.structures

const withAPermanenceMatchingIdOf =
  ({ _id }: { _id: ObjectId }) =>
  (structure: StructureCartographieNationaleWithMatchingStructure) =>
    structure.conseillerNumeriquePermanenceIds.includes(_id.toString())

const toMatchingCartoStructureIn =
  (structures: StructureCartographieNationaleWithMatchingStructure[]) =>
  (permanence: { _id: ObjectId }) =>
    structures.find(withAPermanenceMatchingIdOf(permanence))

const onlyWithoutMatchingPermanenceIn =
  (structures: StructureCartographieNationaleWithMatchingStructure[]) =>
  (permanence: { _id: ObjectId }) =>
    !structures.some(withAPermanenceMatchingIdOf(permanence))

const createForProfilFor =
  (conseiller: ConseillerNumeriqueFound) =>
  async (user: SessionUser, profil: ProfilInscription) =>
    profil === ProfilInscription.ConseillerNumerique
      ? createConseillerNumerique(conseiller, user)
      : createCoordinateur(conseiller, user)

export const importFromConseillerNumerique =
  (findConseillerNumeriqueByEmail: ConseillerNumeriqueByEmailFinder) =>
  async ({ user, profil }: ImportFromConseillerNumeriquePayload) => {
    if (alreadyProcessed(user)) return user

    const conseillerFound = await findConseillerNumeriqueByEmail(user.email)

    if (conseillerFound == null) return markAsCheckedMediateur(user)

    const userWithProfile = isConseillerNumerique(user.mediateur)
      ? { profileId: user.mediateur.id, id: user.id }
      : await createForProfilFor(conseillerFound)(user, profil)

    if (profil === ProfilInscription.ConseillerNumerique) {
      const coordinateurs = await findCoordinateursFor(conseillerFound)
      await associateCoordinateursTo(userWithProfile)(coordinateurs)
    } else {
      const conseillers = await findConseillerNumeriquesFor(conseillerFound)
      await associateConseillersCoordonnesTo(userWithProfile)(conseillers)
    }

    const existingStructure = await findExistingStructureFor(conseillerFound)

    const structureCartographieNationale =
      existingStructure?.structureCartographieNationaleId
        ? { id: existingStructure.structureCartographieNationaleId }
        : await findCartoStructureFor(conseillerFound)

    const structureEmployeuse =
      existingStructure ??
      (await createStructureEmployeuseFor(conseillerFound)(
        structureCartographieNationale,
      ))

    if (profil === ProfilInscription.Coordinateur) {
      return markAsCheckedConseillerNumerique(user, profil, structureEmployeuse)
    }

    const existingCartoStructures: StructureCartographieNationaleWithMatchingStructure[] =
      await findExistingStructuresCartoFor(conseillerFound)

    const noExistingCartoNorStructureWithThePermanenceIds =
      conseillerFound.permanences
        .filter(onlyWithoutMatchingPermanenceIn(existingCartoStructures))
        .map(toStructureToCreate)

    const existingCartoButNoStructureWithThePermanenceIds =
      conseillerFound.permanences
        .map(toMatchingCartoStructureIn(existingCartoStructures))
        .filter(onlyDefinedAndNotNull)
        .filter(onlyWithoutStructure)
        .map(toStructureFromCartoStructure)

    const existingCartoAndStructureWithThePermanenceIds =
      conseillerFound.permanences
        .map(toMatchingCartoStructureIn(existingCartoStructures))
        .filter(onlyDefinedAndNotNull)
        .map(toId)

    const structuresToCreate = [
      ...noExistingCartoNorStructureWithThePermanenceIds,
      ...existingCartoButNoStructureWithThePermanenceIds,
    ]

    await createStructures(structuresToCreate)

    const lieuxActiviteStructureIds = [
      ...existingCartoAndStructureWithThePermanenceIds,
      ...noExistingCartoNorStructureWithThePermanenceIds.map(toId),
      ...existingCartoButNoStructureWithThePermanenceIds.map(toId),
    ]

    await associateLieuxAtiviteFor(userWithProfile)(lieuxActiviteStructureIds)

    return markAsCheckedConseillerNumerique(
      user,
      profil,
      structureEmployeuse,
      lieuxActiviteStructureIds,
    )
  }
