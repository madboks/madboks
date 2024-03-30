import jwt, { type SignOptions } from 'jsonwebtoken'

import { AuthError } from '@/lib/errors'

type AuthPayload = {
  id: string
  email: string
}

type JWTVerify = {
  sub: string
  email: string
}

export function generateJWT(
  subject: string,
  payload: Omit<AuthPayload, 'id'>,
): string {
  return jwt.sign(
    payload,
    process.env.AUTH_SIGNATURE as string,
    {
      expiresIn: process.env.AUTH_EXPIRATION !== undefined
        ? process.env.AUTH_EXPIRATION
        : '1.5 hrs',
      subject: String(subject),
      algorithm: process.env.AUTH_ALGORITHM,
      audience: process.env.AUTH_ISSUER,
      issuer: process.env.AUTH_ISSUER,
      header: {
        kid: process.env.KID
      }
    } as SignOptions
  )
}

export function verifyJWT(token: string): AuthPayload {
  try {
    const payload: JWTVerify = jwt.verify(
      token,
      process.env.AUTH_SIGNATURE as string,
      {
        algorithms: [process.env.AUTH_ALGORITHM],
        audience: process.env.AUTH_ISSUER,
      }
    ) as JWTVerify

    const payloadIntegrity = payload.hasOwnProperty('sub') && payload.hasOwnProperty('email')

    if (payloadIntegrity === false){
      throw new AuthError({ cause: 'INVALID_TOKEN' })
    }

    return {
      id: payload.sub as JWTVerify['sub'],
      email: payload.email as JWTVerify['email'],
    }
  } catch (error) {
    throw new AuthError({ cause: 'INVALID_TOKEN' })
  }
}
