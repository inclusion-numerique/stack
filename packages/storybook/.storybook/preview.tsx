import React from 'react'
import { useRef } from '@storybook/addons'
import { Preview } from '@storybook/react'
import '../../../apps/web/src/app/app.css'

const loadDsfrJs = () => {
  const existing = document.querySelector('#dsfr-js')
  if (existing) {
    return
  }

  const script = document.createElement('script')
  script.id = 'dsfr-js'
  script.src = '/dsfr/dsfr.module.min.js'
  document.body.append(script)
}

const loadDsfrCss = () => {
  const existing = document.querySelector('#dsfr-css')
  if (existing) {
    return
  }

  const link = document.createElement('link')
  link.id = 'dsfr-css'
  link.href = '/dsfr/dsfr.min.css'
  link.rel = 'stylesheet'
  link.type = 'text/css'
  document.body.append(link)
}

const loadDsfrUtilityCss = () => {
  const existing = document.querySelector('#dsfr-utility-css')
  if (existing) {
    return
  }

  const utilityLink = document.createElement('link')
  utilityLink.id = 'dsfr-utility-css'
  utilityLink.href = '/dsfr/utility/utility.min.css'
  utilityLink.rel = 'stylesheet'
  utilityLink.type = 'text/css'

  document.body.append(utilityLink)
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      story: {
        // inline: false,
      },
    },
  },
  decorators: [
    (Story) => {
      const isSetup = useRef(false)
      if (!isSetup.current) {
        loadDsfrJs()
        loadDsfrCss()
        loadDsfrUtilityCss()
        isSetup.current = true
      }
      return <Story />
    },
  ],
}

export default preview
