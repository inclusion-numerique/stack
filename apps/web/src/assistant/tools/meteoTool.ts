import { tool } from 'ai'
import axios from 'axios'
import { z } from 'zod'

type GeocodingResult = {
  results?: {
    latitude: number
    longitude: number
    name: string
    country: string
  }[]
}

type WeatherData = {
  current_weather?: {
    temperature: number
    windspeed: number
    weathercode: number
  }
}

export type MeteoToolResult = {
  meteo: string
  temperatureCelcius: number
  vent: number
  city: string
  pays: string
  icone: number
}

export const meteoTool = tool({
  description: 'donne la météo actuelle pour un lieu donné',
  parameters: z.object({
    location: z.string().describe('le lieu pour lequel on veut la météo'),
  }),
  execute: async ({ location }) => {
    try {
      // 1. géolocalisation
      const { data: geoData } = await axios.get<GeocodingResult>(
        `https://geocoding-api.open-meteo.com/v1/search`,
        {
          params: {
            name: location,
            count: 1,
            language: 'fr',
            format: 'json',
          },
        },
      )

      if (!geoData.results || geoData.results.length === 0) {
        return { erreur: `Lieu introuvable : "${location}"` }
      }

      const { latitude, longitude, name, country } = geoData.results[0]

      // 2. météo actuelle
      const { data: meteoData } = await axios.get<WeatherData>(
        `https://api.open-meteo.com/v1/forecast`,
        {
          params: {
            latitude,
            longitude,
            current_weather: true,
          },
        },
      )

      const weather = meteoData.current_weather
      if (!weather) {
        return { erreur: `Météo indisponible pour "${name}, ${country}"` }
      }

      const { temperature: temp, windspeed: vent, weathercode: icone } = weather

      return {
        meteo: `À ${name}, ${country} : ${temp}°C, vent ${vent} km/h`,
        temperatureCelcius: temp,
        vent,
        city: name,
        pays: country,
        icone,
      }
    } catch (error) {
      return {
        erreur: `Erreur lors de la requête: ${(error as Error).message}`,
      }
    }
  },
})
