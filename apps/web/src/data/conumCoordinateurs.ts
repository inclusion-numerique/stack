import axios from 'axios'

export const ConumCoordinateurs = {
  url: 'https://api.conseiller-numerique.gouv.fr/coordinateurs',
}

export type ConumCoordinateur = {
  id: string
  prenom: string
  nom: string
  commune: string
  codePostal: string
  adresse: string
  courriel: string
  telephone: string
  perimetre: string
  nombreDePersonnesCoordonnees: number
  nombreDeStructuresAvecDesPersonnesCoordonnees: number
  dispositif: string
  latitude: number
  longitude: number
}

export const getConumCoordinateurs = () =>
  axios
    .get<ConumCoordinateur[]>(ConumCoordinateurs.url)
    .then((response) => response.data)
