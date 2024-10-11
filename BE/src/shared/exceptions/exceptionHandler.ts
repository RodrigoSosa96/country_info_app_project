import { NextFunction, Request, Response } from 'express'


export interface IHTTPError extends Error {
  statusCode: number
  message: string
}
class ErrorHandler {
  constructor() {}

  public async handleHttp(error: IHTTPError, req: Request, res: Response, next: NextFunction) {
    const statusCode = error.statusCode || 500
    const message = error.message || 'Something went wrong!'

    // await this.logErrors(error, req, res)
    return res.status(statusCode).send({ statusCode, message })
  }

  private async logErrors(error: IHTTPError, req?: Request, res?: Response) {
    // ...log error to db
  }

  public async handleError(error: Error) {
    // if(error instanceof AppError) {
  }
}

export const handler = new ErrorHandler()
