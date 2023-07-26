import { buildDatabase } from '@app/web/data/buildDatabase/buildDatabase'

export const POST = async () => {
  const start = new Date()
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
