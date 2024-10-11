import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
import { pageNotFoundExceptionHandler } from './middlewares/page-not-found-exception-handler'
import { handler } from './shared/exceptions/exceptionHandler'
import router from '@/routes'


const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())



app
  .get('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200)
    res.send({ message: 'Hello World!' })

  })
  .use('/api', router)
  .use(/\/(.*)/, pageNotFoundExceptionHandler) // express 5 bug
  .use(handler.handleHttp)

export default app
