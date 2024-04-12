import type { FastifyReply, FastifyRequest } from 'fastify'

import { isProduction } from '@/utils/env'
import { GenericError } from '@/utils/errors'
import * as jwt from '@/utils/jwt'

const MONTH_IN_SECONDS = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))
const WEEK_IN_SECONDS = 604800

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
    response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
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

  const userProfile = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    method: 'GET',
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
      maxAge: WEEK_IN_SECONDS,
      expires: MONTH_IN_SECONDS
    })

  console.log('-------------', request.query.redirect)
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
