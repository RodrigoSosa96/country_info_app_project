import { NextFunction, Request, Response } from 'express'
import * as countryService from '@/services/countryService'

const getAvailableCountries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const countries = await countryService.getAllCountries()
    res.json(countries )
  } catch (error) {
    next(error)
  }
}

const getCountryInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const countryCode = req.params.code
    if (!countryCode) {
      throw new Error('Country code is required')
    }
    const countryInfo = await countryService.getCountryInfo(countryCode)
    res.json(countryInfo)
  } catch (error) {
    next(error)
  }
}

const getCountryProvinces = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const countryCode = req.params.code
    if (!countryCode) {
      throw new Error('Country code is required')
    }
    const provinces = await countryService.getCountryProvinces(countryCode)
    res.json(provinces)
  } catch (error) {
    next(error)
  }
}

export default {
  getAvailableCountries,
  getCountryInfo,
  getCountryProvinces,
}
