import React from 'react'
import Link from 'next/link'
import { Structure } from '@app/web/components/Prefet/structuresData'
import { formatDate } from '@app/web/utils/formatDate'
import { structureSubtypeLabel } from '@app/web/components/Prefet/structuresTypes'

const StructureDetails = ({
  structure: {
    properties: {
      name,
      adresse,
      postalCode,
      city,
      sourceLabel,
      sourceUrl,
      updated,
      conseillersNumeriques,
      aidantsHabilitesAidantsConnect,
      type,
      subtype,
      cnfsLabel,
      aidantsConnectLabel,
      franceServicesLabel,
      inZrr,
      inQpv,
    },
  },
}: {
  structure: Structure
}) => {
  const typeString =
    type === 'association'
      ? 'associative'
      : type === 'publique'
      ? 'publique'
      : 'privée'

  const subtypeString = subtype ? structureSubtypeLabel[subtype] : null

  return (
    <>
      <h6 className="fr-mt-1v">{name}</h6>
      <p className="fr-mb-1v">
        {adresse} {postalCode}&nbsp;{city}
      </p>
      <p className="fr-hint-text">
        Mise à jour le {formatDate(new Date(updated), 'dd/MM/yy')} · Source :{' '}
        <Link href={sourceUrl} target="_blank">
          {sourceLabel}
        </Link>
      </p>
      <hr className="fr-mt-6v" />
      <p className="fr-text--lg fr-text--bold fr-mb-2v">
        {conseillersNumeriques ?? 0} Conseiller
        {conseillersNumeriques === 1 ? '' : 's'} Numérique
        {conseillersNumeriques === 1 ? '' : 's'}
      </p>
      <p className="fr-text--lg fr-text--bold">
        {aidantsHabilitesAidantsConnect ?? 0} Aidant
        {aidantsHabilitesAidantsConnect === 1 ? '' : 's'} habilité Aidants
        Connect
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
      {!cnfsLabel && !aidantsConnectLabel && !franceServicesLabel && (
        <p className="fr-mb-1v">Aucun</p>
      )}
      {cnfsLabel && <p className="fr-mb-1v">Structures accueillant des CNFS</p>}
      {aidantsConnectLabel && (
        <p className="fr-mb-1v">Structures labellisées Aidants Connect</p>
      )}
      {franceServicesLabel && (
        <p className="fr-mb-1v">Structures labellisées France Services</p>
      )}
      {inZrr ||
        (inQpv && (
          <>
            <p className="fr-text--lg fr-text--bold fr-mt-6v fr-mb-3v">
              Territoires prioritaires
            </p>
            {inQpv && (
              <p className="fr-mb-1v">
                Structures en quartier prioritaire de la ville (QPV)
              </p>
            )}
            {inZrr && (
              <p className="fr-mb-1v">
                Structures en zone de revitalisation rurale (ZRR)
              </p>
            )}
          </>
        ))}
    </>
  )
}

export default StructureDetails
