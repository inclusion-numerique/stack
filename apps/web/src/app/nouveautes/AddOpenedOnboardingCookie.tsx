'use client'

import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { hasOpenedOnboardingV2Cookie } from '@app/web/app/nouveautes/onboardingV2Cookie'

const AddOpenedOnboardingCookie = () => {
  useEffect(() => {
    Cookies.set(hasOpenedOnboardingV2Cookie, new Date().toISOString(), {
      sameSite: 'strict',
      expires: 1,
    })
  }, [])
  return null
}

export default AddOpenedOnboardingCookie
