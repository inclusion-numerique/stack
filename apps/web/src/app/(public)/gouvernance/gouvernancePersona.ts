export type GouvernancePersona = {
  slug: string
  title: string
  cta: string
  description: string
  blocs: {
    title: string
    items: string[]
  }[]
}

const conseilRegional = {
  slug: 'conseil-regional',
  title: 'Conseil régional',
  cta: 'Portez une feuille de route ou participez à l’élaboration des feuilles de routes territoriales.',
  description:
    'En tant que Conseil régional, vous pouvez portez une feuille de route ou participer à l’élaboration des feuilles de routes territoriales qui seront proposées.<br/><br/>' +
    'Retrouvez ci-dessous les informations qui vous seront demandées&nbsp;:',
  blocs: [
    {
      title: 'Pour porter une feuille de route territoriale',
      items: [
        'Il vous faudra définir le périmètre de votre feuille de route : Renseignez quels sont les EPCI & les communes que vous souhaitez intégrer à votre feuille de route de l’Inclusion Numérique. Pour chacun d’eux, nous vous demanderons de renseigner un contact (Nom, Prénom, Fonction & Adresse e-mail).',
        'Vous pourrez également impliquer d’autres personnes morales publiques ou privées (associations, opérateurs de services publics, entreprises) à votre feuille de route. Nous vous demanderons d’indiquer le nom de la structure ainsi qu’un contact (Nom, Prénom, Fonction & Adresse e-mail).',
      ],
    },
    {
      title:
        'Pour participer à l’élaboration des feuilles de routes territoriales',
      items: [
        'Il vous faudra renseigner un contact politique (Nom, Prénom, Fonction & Adresse e-mail)',
        'Il vous faudra renseigner un contact technique (Nom, Prénom, Fonction & Adresse e-mail). ce second contact est facultatif.',
      ],
    },
  ],
} satisfies GouvernancePersona

const conseilDepartemental = {
  slug: 'conseil-departemental',
  title: 'Conseil départemental',
  cta: 'Portez une feuille de route ou participez à l’élaboration des feuilles de routes territoriales.',
  description:
    'En tant que Conseil départemental, vous pouvez portez une feuille de route ou participer à l’élaboration des feuilles de routes territoriales qui seront proposées.<br/><br/>' +
    'Retrouvez ci-dessous les informations qui vous seront demandées&nbsp;:',
  blocs: conseilRegional.blocs,
} satisfies GouvernancePersona

const epci = {
  slug: 'epci',
  title: 'EPCI & groupement de communes',
  cta: 'Portez une feuille de route ou participez à l’élaboration des feuilles de routes territoriales.',
  description:
    'En tant qu&apos;EPCI, vous pouvez portez une feuille de route ou participer à l’élaboration des feuilles de routes territoriales qui seront proposées.<br/><br/>' +
    'Retrouvez ci-dessous les informations qui vous seront demandées&nbsp;:',
  blocs: conseilRegional.blocs,
} satisfies GouvernancePersona

const commune = {
  slug: 'commune',
  title: 'Commune',
  cta: "Participez à l’élaboration des feuilles de routes territoriales. Vous serez sollicités à l'occasion des concertations territoriales.",
  description:
    'En tant que commune, vous pouvez participer à l&apos;élaboration des feuilles de routes territoriales.<br/><br/>' +
    'Retrouvez ci-dessous les informations qui vous seront demandées&nbsp;:',
  blocs: [conseilRegional.blocs[1]],
} satisfies GouvernancePersona

const structure = {
  slug: 'structure',
  title:
    'Autre personne morale publique ou privée (associations, opérateurs de services publics, entreprises)',
  cta: "Participez à l’élaboration des feuilles de routes territoriales. Vous serez sollicités à l'occasion des concertations territoriales.",
  description:
    "En tant que personne morale publique ou privée, vous pouvez participer à l’élaboration des feuilles de routes territoriales. Vous serez sollicités à l'occasion des concertations territoriales.<br/><br/>" +
    'Retrouvez ci-dessous les informations qui vous seront demandées&nbsp;:',
  blocs: [conseilRegional.blocs[1]],
} satisfies GouvernancePersona

export const gouvernancePersonas = {
  conseilRegional,
  conseilDepartemental,
  epci,
  commune,
  structure,
}
export type GouvernancePersonaType =
  (typeof gouvernancePersonas)[keyof typeof gouvernancePersonas]['slug']
