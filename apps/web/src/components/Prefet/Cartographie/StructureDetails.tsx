import React from 'react'
import Link from 'next/link'
import { DepartementCartographieDataStructure } from '@app/web/app/(cartographie)/tableau-de-bord/departement/[codeDepartement]/cartographie/getDepartementCartographieData'
import { structureSubtypeLabel } from '@app/web/components/Prefet/structuresTypes'
import { dateAsDay } from '@app/web/utils/dateAsDay'

const StructureDetails = ({
  structure: {
    properties: {
      nom,
      adresse,
      codePostal,
      codeCommune,
      commune,
      conseillersNumeriques,
      aidantsConnect,
      type,
      sousTypePublic,
      labelAidantsConnect,
      labelConseillersNumerique,
      labelFranceServices,
      zrr,
      qpv,
    },
  },
}: {
  structure: DepartementCartographieDataStructure
}) => {
  const typeString =
    type === 'association'
      ? 'associative'
      : type === 'publique'
      ? 'publique'
      : 'privée'

  const subtypeString = sousTypePublic
    ? structureSubtypeLabel[
        sousTypePublic as keyof typeof structureSubtypeLabel
      ]
    : null

  return (
    <>
      <h6 data-testid="structure-details-title" className="fr-mt-1v">
        {nom}
      </h6>
      <p className="fr-mb-1v">
        {adresse} {codePostal}&nbsp;{commune}
      </p>
      <p className="fr-hint-text fr-mb-0">
        Code postal : {codePostal} - INSEE : {codeCommune || 'non disponible'}
      </p>
      <p className="fr-hint-text">
        Mise à jour le {dateAsDay(new Date('2023-07-21'))} · Source :{' '}
        <Link
          href="https://cartographie.societenumerique.gouv.fr/"
          target="_blank"
        >
          Cartographie Nationale
        </Link>
      </p>
      <hr className="fr-mt-6v" />
      <p className="fr-text--lg fr-text--bold fr-mb-2v">
        {conseillersNumeriques} Conseiller
        {conseillersNumeriques === 1 ? '' : 's'} Numérique
        {conseillersNumeriques === 1 ? '' : 's'}
      </p>
      <p className="fr-text--lg fr-text--bold">
        {aidantsConnect} Aidant
        {aidantsConnect === 1 ? '' : 's'} habilité Aidants Connect
      </p>
      <hr className="fr-mt-6v" />
      <p className="fr-text--lg fr-text--bold fr-mb-3v">
        Typologie de la structure
      </p>
      {type === 'nonDefini' ? (
        <p>Non défini</p>
      ) : (
        <p>
          Structure {typeString}
          {subtypeString ? ` (${subtypeString})` : null}
        </p>
      )}
      <p className="fr-text--lg fr-text--bold fr-mb-3v">Labels</p>
      {!labelConseillersNumerique &&
        !labelAidantsConnect &&
        !labelFranceServices && <p className="fr-mb-1v">Aucun</p>}
      {labelConseillersNumerique && (
        <p className="fr-mb-1v">Lieux accueillant des conseillers numérique</p>
      )}
      {labelAidantsConnect && (
        <p className="fr-mb-1v">Points d’accueil habilités Aidants Connect</p>
      )}
      {labelFranceServices && (
        <p className="fr-mb-1v">
          Points d’accueil numérique labellisés France Services
        </p>
      )}
      {(zrr || qpv) && (
        <p className="fr-text--lg fr-text--bold fr-mt-6v fr-mb-3v">
          Territoires prioritaires
        </p>
      )}
      {qpv && (
        <p className="fr-mb-1v">
          Structures en quartier prioritaire de la ville (QPV)
        </p>
      )}
      {zrr && (
        <p className="fr-mb-1v">
          Structures en zone de revitalisation rurale (ZRR)
        </p>
      )}
    </>
  )
}

export default StructureDetails
