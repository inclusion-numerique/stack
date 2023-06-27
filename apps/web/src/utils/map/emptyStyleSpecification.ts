import { StyleSpecification } from 'maplibre-gl'

export const emptyStyleSpecification = {
  version: 8,
  name: 'Empty',
  metadata: {},
  center: [0, 0],
  zoom: 1,
  bearing: 0,
  pitch: 0,
  sources: {},
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#E8EDFF',
      },
    },
  ],
  id: 'empty',
} satisfies StyleSpecification & { id: string }
