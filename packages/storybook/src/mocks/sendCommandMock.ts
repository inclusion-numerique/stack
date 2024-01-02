import { SendCommand } from '@app/web/components/Resource/Edition/ResourceEdition'

export const sendCommandMock: SendCommand = () =>
  Promise.reject(new Error('Pas de backend pour Storybook'))
