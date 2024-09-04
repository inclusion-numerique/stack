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
  {
    label: 'Accompagnements individuels',
    count: 121,
    proportion: 58,
    participants: 0,
  },
  { label: 'Ateliers collectifs', count: 4, proportion: 8, participants: 40 },
  {
    label: 'Aide aux démarches administratives',
    count: 68,
    proportion: 34,
    participants: 0,
  },
]

const materielsAccompagnements: QuantifiedShare<MaterielLabel>[] = [
  { label: 'Ordinateur', count: 56, proportion: 16 },
  { label: 'Téléphone', count: 84, proportion: 24 },
  { label: 'Tablette', count: 21, proportion: 6 },
  { label: 'Autre matériel', count: 115, proportion: 33 },
  { label: 'Pas de matériel', count: 73, proportion: 21 },
]

const nombreAccompagnementsParMois = [
  { label: 'Avril', count: 24, proportion: 0, month_name: 'Avril' },
  { label: 'Mai', count: 93, proportion: 0, month_name: 'Mai' },
  { label: 'Juin', count: 31, proportion: 0, month_name: 'Juin' },
  { label: 'Juil.', count: 75, proportion: 0, month_name: 'Juil.' },
  { label: 'Aout', count: 71, proportion: 0, month_name: 'Aout' },
  { label: 'Sep.', count: 60, proportion: 0, month_name: 'Sep.' },
  { label: 'Oct.', count: 82, proportion: 0, month_name: 'Oct.' },
  { label: 'Nov.', count: 90, proportion: 0, month_name: 'Nov.' },
  { label: 'Dec.', count: 80, proportion: 0, month_name: 'Dec.' },
]

const nombreAccompagnementsParJour = [
  { label: '01/07', count: 24, proportion: 0 },
  { label: '02/07', count: 93, proportion: 0 },
  { label: '03/07', count: 31, proportion: 0 },
  { label: '04/07', count: 75, proportion: 0 },
  { label: '05/07', count: 71, proportion: 0 },
  { label: '06/07', count: 71, proportion: 0 },
  { label: '07/07', count: 60, proportion: 0 },
  { label: '08/07', count: 60, proportion: 0 },
  { label: '09/07', count: 82, proportion: 0 },
  { label: '10/07', count: 90, proportion: 0 },
  { label: '11/07', count: 80, proportion: 0 },
  { label: '12/07', count: 24, proportion: 0 },
  { label: '13/07', count: 93, proportion: 0 },
  { label: '14/07', count: 31, proportion: 0 },
  { label: '15/07', count: 75, proportion: 0 },
  { label: '16/07', count: 71, proportion: 0 },
  { label: '17/07', count: 60, proportion: 0 },
  { label: '18/07', count: 82, proportion: 0 },
  { label: '19/07', count: 90, proportion: 0 },
  { label: '20/07', count: 80, proportion: 0 },
  { label: '21/07', count: 24, proportion: 0 },
  { label: '22/07', count: 93, proportion: 0 },
  { label: '23/07', count: 31, proportion: 0 },
  { label: '24/07', count: 75, proportion: 0 },
  { label: '25/07', count: 82, proportion: 0 },
]

const accompagnementBeneficiaires = {
  accompagnements: 329,
  beneficiaires: 477,
  anonymes: 223,
}

const canauxAccompagnements = [
  { label: 'Lieu d’activité', count: 22, proportion: 18 },
  { label: 'À domicile', count: 41, proportion: 35 },
  { label: 'À distance', count: 16, proportion: 13 },
  { label: 'Autre lieu', count: 54, proportion: 46 },
]

const dureesAccompagnements = [
  { label: '30', count: 22, proportion: 18 },
  { label: '60', count: 16, proportion: 13 },
  { label: '90', count: 54, proportion: 46 },
  { label: '120', count: 41, proportion: 35 },
]

const lieuxAccompagnements = [
  { label: "Bibliotheque Musee de l'Opera", count: 488, proportion: 23 },
  { label: 'Le techshop', count: 322, proportion: 16 },
  { label: 'Open Factory', count: 288, proportion: 12 },
  { label: 'Médiathèque de Quimper', count: 176, proportion: 8 },
  { label: 'La station', count: 152, proportion: 7 },
  { label: 'CCAS de Bretagne', count: 82, proportion: 4 },
]

const thematiquesAccompagnements = [
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

const thematiquesDemarchesAdministratives = [
  { label: 'Papiers - Élections Citoyenneté', count: 152, proportion: 7 },
  { label: 'Famille - Scolarité', count: 116, proportion: 5 },
  { label: 'Social - Santé', count: 23, proportion: 1 },
  { label: 'Travail - Formation', count: 18, proportion: 1 },
  { label: 'Logement', count: 12, proportion: 1 },
  { label: 'Transports - Mobilité', count: 8, proportion: 1 },
  { label: 'Argent - Impôts', count: 2, proportion: 1 },
  { label: 'Justice', count: 1, proportion: 1 },
  { label: 'Étrangers - Europe', count: 1, proportion: 1 },
  { label: 'Loisirs - Sports Culture', count: 1, proportion: 1 },
]

const genresBeneficiaires = [
  { label: 'Masculin', count: 20, proportion: 48 },
  { label: 'Féminin', count: 11, proportion: 22 },
  { label: 'Non communiqué', count: 8, proportion: 20 },
]

const statusBeneficiaires = [
  { label: 'Retraité', count: 20, proportion: 47 },
  { label: 'Sans emploi', count: 11, proportion: 28 },
  { label: 'En emploi', count: 9, proportion: 13 },
  { label: 'Scolaire', count: 8, proportion: 8 },
  { label: 'Non communiqué ou hétérogène ', count: 4, proportion: 4 },
]

const tranchesAgeBeneficiaires = [
  { label: '75 ans et plus', count: 23, proportion: 36 },
  { label: '60 - 74 ans', count: 19, proportion: 25 },
  { label: '45 - 59 ans', count: 7, proportion: 13 },
  { label: '30 - 44 ans', count: 2, proportion: 6 },
  { label: '18 - 29 ans', count: 3, proportion: 8 },
  { label: 'Mineur(e)', count: 4, proportion: 9 },
  { label: 'Non communiqué', count: 1, proportion: 3 },
]

const communesBeneficiaires = [
  { label: "L'Arbresle", count: 488, proportion: 23 },
  { label: 'Bessenay', count: 322, proportion: 16 },
  { label: 'Sain Bel', count: 288, proportion: 12 },
  { label: 'Jucieux', count: 176, proportion: 8 },
  { label: 'Brullioles', count: 152, proportion: 7 },
  { label: 'Brussieux', count: 77, proportion: 3 },
]

export default {
  title: 'Mes statistiques',
  component: MesStatistiques,
} as Meta<typeof MesStatistiques>

type Story = StoryObj<typeof MesStatistiques>

export const Statistiques: Story = {
  args: {
    modalitesAccompagnement,
    nombreAccompagnementsParMois,
    nombreAccompagnementsParJour,
    accompagnementBeneficiaires,
    materielsAccompagnements,
    canauxAccompagnements,
    dureesAccompagnements,
    lieuxAccompagnements,
    thematiquesAccompagnements,
    thematiquesDemarchesAdministratives,
    genresBeneficiaires,
    statusBeneficiaires,
    tranchesAgeBeneficiaires,
    communesBeneficiaires,
    codeInsee: '75101',
  },
}
Statistiques.storyName = 'Statistiques'
