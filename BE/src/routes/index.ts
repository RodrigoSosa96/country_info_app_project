import countriesController from '@/controller/countriesController'
import { Router } from 'express'

const router = Router()

router.get('/countries', countriesController.getAvailableCountries)

router.get('/countries/:code', countriesController.getCountryInfo)

export default router
