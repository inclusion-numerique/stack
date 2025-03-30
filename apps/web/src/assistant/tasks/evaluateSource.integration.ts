import { evaluateSource } from '@app/web/assistant/tasks/evaluateSource'

describe('evaluateSource', () => {
  it('evaluates a good source', async () => {
    const { evaluation, text } = await evaluateSource({
      objectif: 'Trouver le nom du président actuel de la Géorgie',
      content: `Président de la Géorgie — Wikipédia

https://fr.m.wikipedia.org/wiki/Pr%C3%A9sident_de_la_G%C3%A9orgie
Résumé de la page :

Président de la Géorgie
Histoire
La Constitution de la république démocratique de Géorgie ne comportait pas de présidence de la République. Après sa sécession de l'Union soviétique le 9 avril 1991, le Conseil suprême crée, dès le 14 avril, le poste de président exécutif, et nomme par acclamation, et à l'unanimité, Zviad Gamsakhourdia à cette fonction.

Élection
À la suite de la révision de la Constitution de 2017, le scrutin présidentiel intervient au scrutin indirect, et non plus au suffrage universel direct. Le président est élu pour un mandat de cinq ans — renouvelable une seule fois — au scrutin indirect uninominal majoritaire à deux tours par les 300 membres d'un collège électoral.

Titulaires
Zviad Gamsakhourdia (1991-1992)
Edouard Chevardnadze (1992-2003)
Mikheil Saakachvili (2004-2013)
Guiorgui Margvelachvili (2013-2018)
Salomé Zourabichvili (2018-2024)
Mikheïl Kavelachvili (depuis 2024, contesté)
Notes et références
↑ (en) « Key Points of Newly Adopted Constitution », sur civil.ge, 27 septembre 2017
↑ ↑ (en) « Constitution of Georgia », sur სსიპ ”საქართველოს საკანონმდებლო მაცნე” (consulté le 14 décembre 2024)
↑ ↑ ↑ (ka) « პარტია „საქართველოსთვის" პრეზიდენტის პირდაპირი წესით არჩევის იდეით გამოდის », sur რადიო თავისუფლება,‎ 8 janvier 2024 (consulté le 28 octobre 2024)
↑ ↑ ↑ ↑ (en) « Constitution of Georgia: President of the Republic », sur Constitution of Georgia, 1995 (lire en ligne)
      `,
    })

    expect(text).toBeString()
    expect(text).toEqual('oui')
    expect(evaluation).toEqual(true)
  }, 30_000)

  it('evaluates a bad source', async () => {
    const { evaluation, text } = await evaluateSource({
      objectif: 'Trouver le nom du président actuel de la Géorgie',
      content: `Secrétariat général de la Présidence - Annuaire | Service-Public.fr

https://lannuaire.service-public.fr/gouvernement/8e2948cf-6734-4689-95e6-c5c780bf77b7
Résumé de la page :

Président actuel de la Géorgie
Le président actuel de la Géorgie n'est pas mentionné sur la page web fournie. Cependant, on peut trouver des informations sur le Secrétariat général de la Présidence de la République française, qui n'est pas lié à la Géorgie.

Informations sur la Géorgie
La page web fournie ne contient pas d'informations sur la Géorgie ou son président actuel. Si vous cherchez des informations sur la Géorgie, vous pouvez essayer de rechercher sur un moteur de recherche ou sur des sites web spécialisés dans les informations géopolitiques.

Informations sur le président de la Géorgie
Pour obtenir des informations sur le président actuel de la Géorgie, vous pouvez essayer de rechercher sur des sites web spécialisés dans les informations géopolitiques, tels que Wikipedia ou des sites web de presse internationale.`,
    })

    expect(text).toBeString()
    expect(text).toEqual('non')
    expect(evaluation).toEqual(false)
  }, 30_000)
})
