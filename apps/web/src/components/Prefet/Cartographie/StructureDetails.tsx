import React from 'react'
import { Structure } from '@app/web/components/Prefet/structuresData'

const StructureDetails = ({
  structure: {
    properties: { name, adresse, source },
  },
}: {
  structure: Structure
}) => (
  <>
    <h6 className="fr-mt-1v">{name}</h6>
    <p>{adresse}</p>
    <p className="fr-hint-text">Source : {source}</p>
  </>
)

export default StructureDetails
