import 'dotenv/config'
import http from 'http'
import { HttpError } from 'http-errors'

import app from './app'

const port = process.env.PORT || 4000

const onError = (error: HttpError): void => {
  if (error.syscall !== 'listen') {
    throw error
  }
  if (error.code === 'EACCES') {
    console.error(`Port ${port.toString()} requires elevated privileges`)
    process.exit(1)
  } else if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port.toString()} is already in use`)
    process.exit(1)
  } else {
    throw error
  }
}

async function start(): Promise<void> {
  try {
    // TODO: Implement Init DB
    app.set('port', port)
    const server = http.createServer(app)
    server.listen(port, () => {
      console.log(`Server started on port ${port} 🚀🚀🚀`)
    })

    server.on('error', (error: HttpError) => {
      onError(error)
      process.exit(1)
    })
  } catch (error) {
    console.error('App startup failed!')
  }
}

process.on('uncaughtException', async (error: unknown) => {
  console.error('Uncaught exception thrown!')
  process.exit(1)
})

process.on('unhandledRejection', async (error: unknown) => {
  console.error('Unhandled exception thrown!')
  process.exit(1)
})

void start()
