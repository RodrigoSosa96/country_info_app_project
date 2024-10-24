import { count } from 'console'

import { makeRequest } from '@/shared/utils/axios'

const NAGER = process.env.NAGER
const COUNTRIESNOW = process.env.COUNTRIESNOW
const WEATHER_API = process.env.WEATHER_API
const WEATHER_API_KEY = process.env.WEATHER_API_KEY

export const getAllCountries = async () => {
  try {
    const response = await makeRequest('GET', `${NAGER}/AvailableCountries`)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getCountryInfo = async (countryCode: string): Promise<any> => {
  try {
    const countryData = await makeRequest<Omit<Country, 'population' | 'flag'>>(
      'GET',
      `${NAGER}/CountryInfo/${countryCode}`
    )

    const contryPopulation = await getCountryPopulation(countryData.commonName)
    const countryFlag = await getCountryFlag(countryData.commonName)
    const countryTemperature = await getCountryTemperature(countryData.commonName)

    return {
      ...countryData,
      population: contryPopulation,
      flag: countryFlag,
      temperature: countryTemperature,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getCountryTemperature = async (country: string) => {
  try {
    const response = await makeRequest<{ main: { temp: number } }>(
      'GET',
      `${WEATHER_API}?q=${country}&appid=${WEATHER_API_KEY}`
    )
    return response.main.temp
  } catch (error) {
    console.error(error)
    throw error
  }
}

type PopulationResponse = {
  data: {
    country: string
    code: string
    populationCounts: {
      year: number
      value: number
    }[]
  }
}

export const getCountryPopulation = async (country: string) => {
  try {
    const response = await makeRequest<PopulationResponse>('POST', `${COUNTRIESNOW}/countries/population`, {
      country,
    })
    return response.data.populationCounts
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getCountryFlag = async (country?: string) => {
  try {
    const response = await makeRequest<{ data: CountryFlag }>(
      'POST',
      `${COUNTRIESNOW}/countries/flag/images`,
      {
        country,
      }
    )
    return response.data.flag
  } catch (error) {
    console.error(error)
    throw error
  }
}

type PopulationCount = {
  year: number
  value: number
}

type Population = {
  country: string
  code: string
  // iso3: string
  populationCounts: PopulationCount[]
}

type CountryFlag = {
  name: string
  flag: string
  iso2: string
  iso3: string
}

type CountryBorder = {
  commonName: string
  officialName: string
  countryCode: string
  region: string
  borders: CountryBorder[] | null
}

type Country = {
  commonName: string
  officialName: string
  countryCode: string
  region: string
  borders: CountryBorder[]
  population: Population
  flag: CountryFlag
  temperature: number
}
