'use client'

import { Toaster as BaseToaster } from 'react-hot-toast'
import React from 'react'
import styles from './Toaster.module.css'

const Toaster = () => (
  <BaseToaster
    position="top-center"
    reverseOrder={false}
    gutter={8}
    containerClassName=""
    containerStyle={{}}
    toastOptions={{
      className: styles.toast,
      duration: 5000,
    }}
  />
)

export default Toaster
