import React from 'react'
import Link from 'next/link'
import { Structure } from '@app/web/components/Prefet/structuresData'
import { formatDate } from '@app/web/utils/formatDate'

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
      cnfsLabel,
      aidantsConnectLabel,
      franceServicesLabel,
      inZrr,
      inQpv,
    },
  },
}: {
  structure: Structure
}) => (
  <>
    <h6 className="fr-mt-1v">{name}</h6>
    <p className="fr-mb-1v">
      {adresse} {postalCode}&nbsp;{city}
    </p>
    <p className="fr-hint-text">
      Mise à jour le {formatDate(new Date(updated), 'dd/MM/yy')} · Source :{' '}
      <Link href={sourceUrl} target="_blank">
        {sourceLabel}
      </Link>
    </p>
    <hr className="fr-mt-6v" />
    <p className="fr-text--lg fr-text--bold fr-mb-2v">
      {conseillersNumeriques ?? 0}  Conseiller
      {conseillersNumeriques === 1 ? '' : 's'} Numériques
    </p>
    <p className="fr-text--lg fr-text--bold">
      {aidantsHabilitesAidantsConnect ?? 0}  Aidant
      {aidantsHabilitesAidantsConnect === 1 ? '' : 's'} habilité Aidants Connect
    </p>
    <hr className="fr-mt-6v" />
    <p className="fr-text--lg fr-text--bold fr-mb-3v">
      Typologie de la structure
    </p>
    <p>
      Structure{' '}
      {type === 'associations'
        ? 'associative'
        : type === 'public'
        ? 'publique'
        : 'privée'}
    </p>
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
    <p className="fr-text--lg fr-text--bold fr-mt-6v fr-mb-3v">
      Territoires prioritaires
    </p>
    {!inZrr && !inQpv && <p className="fr-mb-1v">Non concerné</p>}
    {cnfsLabel && <p className="fr-mb-1v">Structures accueillant des CNFS</p>}
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
)

export default StructureDetails
