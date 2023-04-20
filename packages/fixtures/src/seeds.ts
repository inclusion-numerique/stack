import { program, InvalidArgumentError } from 'commander'
import { prismaClient } from '@stack/web/prismaClient'
import { users } from './users'

function myParseInt(value: string) {
  const parsedValue = Number.parseInt(value, 10)
  if (Number.isNaN(parsedValue)) {
    throw new InvalidArgumentError('Not a number.')
  }
  return parsedValue
}

const deleteAll = async () => {
  await prismaClient.user.deleteMany()
}

const seed = async (random?: number) => {
  await prismaClient.user.createMany({ data: users(random) })
}

const main = async (clean: boolean, random?: number) => {
  if (clean) {
    console.log('Cleaning data...')
    await deleteAll()
  }

  console.log(`Generate ${random ? `${random} set of random` : 'fix'} data`)
  await seed(random)
}

program.option('-c, --clean').option('-r, --random [number]', '0', myParseInt)

program.parse()

const { clean, random } = program.opts()
main(clean as boolean, (random === true ? 1 : random) as number | undefined)
  // eslint-disable-next-line promise/always-return
  .then(async () => {
    await prismaClient.$disconnect()
  })
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch(async (error) => {
    console.error(error)
    await prismaClient.$disconnect()
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  })
