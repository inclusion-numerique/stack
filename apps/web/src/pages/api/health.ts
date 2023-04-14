import type { NextApiRequest, NextApiResponse } from 'next'

export default function health(request: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ status: 'ok' })
}
