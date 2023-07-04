import React from 'react'
import { City } from '@app/web/types/City'

const CityDetails = ({ city: { nom, population } }: { city: City }) => (
  <>
    <h6 className="fr-mt-1v">{nom}</h6>
    <div>Commune de {population} hab.</div>
  </>
)

export default CityDetails
