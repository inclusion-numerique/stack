import { buildDatabase } from '@app/web/data/buildDatabase/buildDatabase'

export const POST = async () => {
  const start = new Date()

  // TODO THIS SEEMS TO BE ANOTHER DATABASE THAN THE ONE USED BY THE APP
  // FIXTURES ARE LOADED TO (RIGHT?) DATABASE FROM CI. COMPARE URLS IN CI AND HERE
  console.log('BUILD DATA FOR', process.env.DATABASE_URL)
  await buildDatabase()

  const end = new Date()

  return new Response(
    JSON.stringify({
      status: 'ok',
      time: end.getTime() - start.getTime(),
    }),
    { headers: { 'Content-Type': 'application/json' } },
  )
}
