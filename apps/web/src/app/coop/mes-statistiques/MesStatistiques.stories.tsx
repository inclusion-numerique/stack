import { Meta, StoryObj } from '@storybook/react'
import { MesStatistiques } from './MesStatistiques'
import {
  AccompagnementLabel,
  MaterielLabel,
  QuantifiedShare,
} from './quantifiedShare'

const modalitesAccompagnement: (QuantifiedShare<AccompagnementLabel> & {
  participants?: number
})[] = [
  { label: 'Accompagnements individuels', count: 121, proportion: 58 },
  { label: 'Ateliers collectifs', count: 4, proportion: 8, participants: 40 },
  { label: 'Aide aux démarches administratives', count: 68, proportion: 34 },
]

const materielUtilise: QuantifiedShare<MaterielLabel>[] = [
  { label: 'Ordinateur', count: 56, proportion: 16 },
  { label: 'Smartphone', count: 84, proportion: 24 },
  { label: 'Tablette', count: 21, proportion: 6 },
  { label: 'Autre', count: 115, proportion: 33 },
  { label: 'Sans matériel', count: 73, proportion: 21 },
]

const thematiquesAccompagnement = [
  { label: 'Prendre en main du matériel', count: 488, proportion: 23 },
  { label: 'Navigation sur internet', count: 322, proportion: 16 },
  { label: 'E-mail', count: 288, proportion: 12 },
  { label: 'Bureautique', count: 176, proportion: 8 },
  { label: 'Réseaux sociaux - communication', count: 152, proportion: 7 },
  { label: 'Santé', count: 116, proportion: 5 },
  { label: 'Banque et achats en ligne', count: 53, proportion: 2 },
  { label: 'Entrepreneuriat', count: 23, proportion: 1 },
  { label: 'Insertion professionnelle', count: 18, proportion: 1 },
  { label: 'Prévention en sécurité numérique', count: 16, proportion: 1 },
  { label: 'Parentalité', count: 12, proportion: 1 },
  { label: 'Scolarité et numérique', count: 8, proportion: 1 },
  { label: 'Créer avec le numérique', count: 5, proportion: 1 },
  { label: 'Culture numérique', count: 2, proportion: 1 },
]

const nombreAccompagnementsParLieu = [
  { label: "Bibliotheque Musee de l'Opera", count: 488, proportion: 23 },
  { label: 'Le techshop', count: 322, proportion: 16 },
  { label: 'Open Factory', count: 288, proportion: 12 },
  { label: 'Médiathèque de Quimper', count: 176, proportion: 8 },
  { label: 'La station', count: 152, proportion: 7 },
]

const communesDesBeneficiaires = [
  { label: "L'Arbresle", count: 488, proportion: 23 },
  { label: 'Bessenay', count: 322, proportion: 16 },
  { label: 'Sain Bel', count: 288, proportion: 12 },
  { label: 'Jucieux', count: 176, proportion: 8 },
  { label: 'Brullioles', count: 152, proportion: 7 },
]

const nombreAccompagnements = [
  { label: 'Avril', count: 24, proportion: 0 },
  { label: 'Mai', count: 93, proportion: 0 },
  { label: 'Juin', count: 31, proportion: 0 },
  { label: 'Juil.', count: 75, proportion: 0 },
  { label: 'Aout', count: 71, proportion: 0 },
  { label: 'Sep.', count: 60, proportion: 0 },
  { label: 'Oct.', count: 82, proportion: 0 },
  { label: 'Nov.', count: 90, proportion: 0 },
  { label: 'Dec.', count: 80, proportion: 0 },
]

const accompagnementBeneficiaires = {
  accompagnements: 329,
  beneficiaires: 477,
  anonymes: 223,
}

const canauxAccompagnement = [
  { label: 'Lieu d’activité', count: 22, proportion: 18 },
  { label: 'À distance', count: 16, proportion: 13 },
  { label: 'Autre lieu', count: 54, proportion: 46 },
  { label: 'À domicile', count: 41, proportion: 35 },
]

const dureesAccompagnement = [
  { label: '30 min', count: 22, proportion: 18 },
  { label: '1h', count: 16, proportion: 13 },
  { label: '1h30', count: 54, proportion: 46 },
  { label: '2h', count: 41, proportion: 35 },
]

const genres = [
  { label: 'Masculin', count: 20, proportion: 48 },
  { label: 'Féminin', count: 11, proportion: 22 },
  { label: 'Non communiqué', count: 8, proportion: 20 },
]

const tranchesAge = [
  { label: '75 ans et plus', count: 23, proportion: 36 },
  { label: '60 - 74 ans', count: 19, proportion: 25 },
  { label: '45 - 59 ans', count: 7, proportion: 13 },
  { label: '30 - 44 ans', count: 2, proportion: 6 },
  { label: '18 - 29 ans', count: 3, proportion: 8 },
  { label: 'Mineur(e)', count: 4, proportion: 9 },
  { label: 'Non communiqué', count: 1, proportion: 3 },
]

const status = [
  { label: 'Retraité', count: 20, proportion: 47 },
  { label: 'Sans emploi', count: 11, proportion: 28 },
  { label: 'En emploi', count: 9, proportion: 13 },
  { label: 'Scolaire', count: 8, proportion: 8 },
  { label: 'Non communiqué ou hétérogène ', count: 4, proportion: 4 },
]

export default {
  title: 'Mes statistiques',
  component: MesStatistiques,
} as Meta<typeof MesStatistiques>

type Story = StoryObj<typeof MesStatistiques>

export const Statistiques: Story = {
  args: {
    modalitesAccompagnement,
    materielUtilise,
    thematiquesAccompagnement,
    nombreAccompagnementsParLieu,
    nombreAccompagnements,
    accompagnementBeneficiaires,
    canauxAccompagnement,
    dureesAccompagnement,
    genres,
    tranchesAge,
    status,
    communesDesBeneficiaires,
  },
}
Statistiques.storyName = 'Statistiques'
