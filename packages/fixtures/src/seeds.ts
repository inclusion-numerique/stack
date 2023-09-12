import { Command, InvalidArgumentError } from '@commander-js/extra-typings'
import { prismaClient } from '@app/web/prismaClient'
import { AppPrisma } from '@app/web/prisma'
import { formulairesGouvernance } from '@app/fixtures/formulairesGouvernance'
import { randomUsers, users } from './users'

function myParseInt(value: string) {
  const parsedValue = Number.parseInt(value, 10)
  if (Number.isNaN(parsedValue)) {
    throw new InvalidArgumentError('Not a number.')
  }
  return parsedValue
}

type TransactionClient = AppPrisma.TransactionClient

const deleteAll = async (transaction: TransactionClient) => {
  const tables = await transaction.$queryRaw<
    { table_name: string }[]
  >`SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      AND table_name != '_prisma_migrations' 
      AND table_name != '_prisma_migrations_lock'`

  await transaction.$queryRawUnsafe(
    `TRUNCATE TABLE "${tables
      .map(({ table_name }) => table_name)
      .join('", "')}" CASCADE`,
  )

  return tables.map(({ table_name }) => table_name)
}

const seed = async (transaction: TransactionClient, random?: number) => {
  console.log(`Creating users`)

  await (random
    ? transaction.user.createMany({ data: randomUsers(random) })
    : Promise.all(
        users.map((user) =>
          transaction.user.upsert({
            where: { id: user.id },
            create: user,
            update: user,
            select: { id: true },
          }),
        ),
      ))

  console.log(`Creating formulaires gouvernances (creation pass)`)

  // We need a first "pass" to create empty formulaire, to later be able to update them with related models
  await Promise.all(
    formulairesGouvernance().map((formulaire) =>
      transaction.formulaireGouvernance.upsert({
        where: { id: formulaire.id },
        create: {
          id: formulaire.id,
          gouvernancePersona: formulaire.gouvernancePersona,
          createur: formulaire.createur,
        },
        update: {
          gouvernancePersona: formulaire.gouvernancePersona,
        },
        select: { id: true },
      }),
    ),
  )

  console.log(`Creating formulaires gouvernances (data pass)`)
  // Then we can update them with related models
  await Promise.all(
    formulairesGouvernance().map((formulaire) =>
      transaction.formulaireGouvernance.update({
        where: { id: formulaire.id },
        data: formulaire,
        select: { id: true },
      }),
    ),
  )
}

const main = async (eraseAllData: boolean, random?: number) => {
  await prismaClient.$transaction(async (transaction) => {
    if (eraseAllData) {
      console.log('Erasing all data...')
      await deleteAll(transaction)
    }

    console.log(
      `Generating ${
        random ? `${random} set of random` : 'non-random fixtures'
      } data`,
    )
    await seed(transaction, random)
  })
  console.log(`Fixtures loaded successfully`)
}

const program = new Command()
  .option('-e, --erase-all-data', 'Erase all data', false)
  .option(
    '-r, --random [number]',
    'Number of random items to seed',
    myParseInt,
    0,
  )

program.parse()

const { eraseAllData, random } = program.opts()

main(eraseAllData, random === true ? 1 : random)
  // eslint-disable-next-line promise/always-return
  .then(() => prismaClient.$disconnect())
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch(async (error) => {
    console.error(error)
    await prismaClient.$disconnect()
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  })
