import type { FastifyReply, FastifyRequest } from 'fastify'

type Request = FastifyRequest<{
  Querystring: {
    error: string
    code: string
    redirect: string
  }
}>

export async function auth (
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

  // Add pkce login check

  const auth = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      code: request.query.code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code'
    })
  })

  const { access_token: accessToken } = await auth.json();

  const userProfile = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  console.log(auth);
  console.log(accessToken);
  console.log(await userProfile.json());

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
