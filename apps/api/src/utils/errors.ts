interface Error {
  cause: string
  code?: number
  name?: string
}

export class AuthError extends Error {
  code: number

  constructor({ cause }: Pick<Error, 'cause'>) {
    super(cause, { cause })

    this.name = 'UNAUTHORIZED'
    this.code = 401
    this.cause = cause
  }
}

export class GenericError extends Error {
  static errorName = 'GENERIC_ERROR'
  static errorCode = 500

  code: number

  constructor({
    cause,
    code = GenericError.errorCode,
    name = GenericError.errorName,
  }: Error) {
    super(cause, { cause })

    this.name = name
    this.code = code
    this.cause = cause
  }
}
