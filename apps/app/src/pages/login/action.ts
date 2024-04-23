import { redirect } from 'react-router-dom'

const OAUTH_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const OAUTH_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',

]

export async function action() {
  const params = new URLSearchParams()

  params.set('response_type', 'code')
  params.set('client_id', import.meta.env.VITE_OAUTH_CLIENT_ID)
  params.set('access_type', 'offline')
  params.set('scope', OAUTH_SCOPES.join(' '))
  params.set('redirect_uri', import.meta.env.VITE_OAUTH_REDIRECT_URI)

  const autorizationUrl = new URL(OAUTH_AUTHORIZATION_URL)
  autorizationUrl.search = params.toString()

  return redirect(autorizationUrl.toString())
}
