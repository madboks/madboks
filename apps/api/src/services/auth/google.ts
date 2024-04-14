import type { FastifyReply, FastifyRequest } from 'fastify'

import { isProduction } from '@/utils/env'
import { GenericError } from '@/utils/errors'
import * as jwt from '@/utils/jwt'
import { METHOD_GET, METHOD_POST } from '@/constants/apiMethods'
import { GOOGLE_TOKEN, GOOGLE_USER_INFO } from '@/constants/externalEndpoints'
import { COOKIE_MAX_AGE, COOKIE_EXPIRES } from '@/constants/cookie'

type Request = FastifyRequest<{
  Querystring: {
    error: string
    code: string
    redirect: string
  }
}>

async function fetchUserInfo (code: string): Promise<Response> {
  // TODO: Add pkce login check
  let response
  try {
    response = await fetch(GOOGLE_TOKEN, {
      method: METHOD_POST,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        code: code,
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        redirect_uri: process.env.OAUTH_REDIRECT_URI,
        grant_type: 'authorization_code'
      })
    })
  } catch (e){
    throw new GenericError({ cause: 'AUTH_ERROR', code: 503 })
  }

  if (response?.ok === false) {
    throw new GenericError({ cause: 'AUTH_ERROR', code: 503 })
  }

  const { access_token: accessToken } = await response.json()

  return accessToken
}

export async function google (
  request: Request,
  response: FastifyReply
): Promise<FastifyReply> {
  if (request.query.error) {
    return await response
      .code(500)
      .send({
        error: true
      })
  }

  const accessToken = await fetchUserInfo(request.query.code)

  const userProfile = await fetch(GOOGLE_USER_INFO, {
    method: METHOD_GET,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  // TODO: save this information in the database or check if the user exists before
  const { given_name: name, email } = await userProfile.json()

  const authToken = jwt.generate(
    'XXXXX',
    {
      email
    },
  )

  response
    .setCookie('session', authToken, {
      // domain: process.env.COOKIE_DOMAIN,
      httpOnly: true,
      path: '/',
      signed: true,
      sameSite: 'lax',
      secure: isProduction(),
      maxAge: COOKIE_MAX_AGE,
      expires: COOKIE_EXPIRES
    })

  if (request.query.redirect) {
    return await response
      .code(302)
      .redirect(request.query.redirect)
  }

  return await response
    .code(200)
    .send({
      error: false
    })
}
