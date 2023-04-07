import { NextApiRequest, NextApiResponse } from 'next'
import { getValue, updateValue } from './service'
import { objectFormValidation } from './type'

const get = async () => getValue()

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = objectFormValidation.safeParse(req.body)
  if (!body.success) {
    return res.status(400).json(body.error)
  }

  updateValue(body.data.name)
  return res.status(200).send('OK')
}

const test = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const name = await get()
      return res.status(200).json(name)
    }

    if (req.method === 'PUT') {
      await put(req, res)
      return
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error as string })
  }
}
export default test
