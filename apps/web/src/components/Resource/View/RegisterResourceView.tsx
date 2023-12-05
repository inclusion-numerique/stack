'use client'

import { useEffect } from 'react'
import { nonBlockingRegisterResourceViewServerAction } from '@app/web/server/resourceView/registerResourceViewServerAction'

/**
 * Client component that triger server action registerResourceView()
 * @constructor
 */
const RegisterResourceView = ({
  resourceId,
  userId,
}: {
  resourceId: string
  userId?: string
}) => {
  useEffect(() => {
    nonBlockingRegisterResourceViewServerAction({
      resourceId,
      userId,
    })
  })
  return null
}

export default RegisterResourceView
