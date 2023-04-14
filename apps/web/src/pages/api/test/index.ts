import { NextApiRequest, NextApiResponse } from 'next'
import { getValue, updateValue } from './service'
import { objectFormValidation } from './type'

const get = async () => getValue()

const put = async (request: NextApiRequest, res: NextApiResponse) => {
  const body = objectFormValidation.safeParse(request.body)
  if (!body.success) {
    return res.status(400).json(body.error)
  }

  await updateValue(body.data.name)
  return res.status(200).send('OK')
}

const test = async (request: NextApiRequest, res: NextApiResponse) => {
  try {
    if (request.method === 'GET') {
      const name = await get()
      return res.status(200).json(name)
    }

    if (request.method === 'PUT') {
      return await put(request, res)
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: error as string })
  }
}
export default test
