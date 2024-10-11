import { NextFunction, Request, Response } from 'express'

import { NotFoundException } from '../shared/exceptions/http.exceptions'

export const pageNotFoundExceptionHandler = (_req: Request, _res: Response, _next: NextFunction) => {
  throw new NotFoundException('Page not found!')
}
