import createError from 'http-errors'

import { StatusCodes } from '../utils/http-status-codes'

export class BadRequestException {
  constructor(message: string = 'Bad Request') {
    throw createError(StatusCodes.BAD_REQUEST, message, { expose: true })
  }
}

export class UnauthorizedException {
  constructor(message: string = 'Unauthorized') {
    throw createError(StatusCodes.UNAUTHORIZED, message)
  }
}

export class NotFoundException {
  constructor(message: string = 'Not Found') {
    throw createError(StatusCodes.NOT_FOUND, message, { stack: undefined })
  }
}

export class ConflictException {
  constructor(message: string = 'Conflict') {
    throw createError(StatusCodes.CONFLICT, message)
  }
}

export class UnprocessableEntityException {
  constructor(message: string = 'Unprocessable Entity') {
    throw createError(StatusCodes.UNPROCESSABLE_ENTITY, message)
  }
}

export class TooManyRequestsException {
  constructor(message = 'Too Many Requests') {
    throw createError(StatusCodes.TOO_MANY_REQUESTS, message)
  }
}

export class InternalServerErrorException {
  constructor(message = 'Internal Server Error') {
    throw createError(StatusCodes.INTERNAL_SERVER_ERROR, message)
  }
}

export class BadGatewayException {
  constructor(message = 'Bad Gateway') {
    throw createError(StatusCodes.BAD_GATEWAY, message)
  }
}
