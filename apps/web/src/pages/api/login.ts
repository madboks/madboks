// Astro API Route:
// https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes

import type { APIRoute, AstroConfig } from 'astro'

const OAUTH_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const OAUTH_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'

]

export const POST: APIRoute = () => {
  const params = new URLSearchParams()
  params.set('response_type', 'code')
  params.set('client_id', import.meta.env.OAUTH_CLIENT_ID)
  params.set('access_type', 'offline')
  params.set('scope', OAUTH_SCOPES.join(' '))
  params.set('redirect_uri', import.meta.env.OAUTH_REDIRECT_URI)

  const autorizationUrl = new URL(OAUTH_AUTHORIZATION_URL)
  autorizationUrl.search = params.toString()

  return new Response(
    JSON.stringify({
      url: autorizationUrl.toString()
    })
  )
}
