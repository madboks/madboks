import React from 'react'

// secret: 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

export function Component() {

  const handleLogin = () => {
    const oauth2Endpoint = new URL('https://accounts.google.com/o/oauth2/v2/auth')


    oauth2Endpoint.searchParams.append('client_id', '553557141511-mr50q3e74t3u33oue403ad04pcv03bj0.apps.googleusercontent.com')
    oauth2Endpoint.searchParams.append('redirect_uri', 'http://localhost:3000/api/login/callback?redirect=http://localhost:9000')
    oauth2Endpoint.searchParams.append('state', 'madboks-app-csrf')
    oauth2Endpoint.searchParams.append('response_type', 'code')
    oauth2Endpoint.searchParams.append('access_type', 'online')
    oauth2Endpoint.searchParams.append('scope', 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email')

    console.log(oauth2Endpoint.toString());
    window.location.href = oauth2Endpoint.toString()
  }

  return (
    <button type='button' onClick={handleLogin}>
      Login google
    </button>
  )
};

Component.displayName = 'Login'
