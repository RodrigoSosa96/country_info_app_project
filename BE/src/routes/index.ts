import countriesController from '@/controller/countriesController'
import { Router } from 'express'

const router = Router()

router.get('/countries', countriesController.getAvailableCountries)

router.get('/countries/:code', countriesController.getCountryInfo)

router.get('/countries/:code/provinces', countriesController.getCountryProvinces)

export default router
