import type { NextApiRequest, NextApiResponse } from 'next'

export default function health(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ status: 'ok' })
}
