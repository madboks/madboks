import React from 'react'
import { Form } from 'react-router-dom'

export function Login() {
  return (
    <div>
      <Form method="post">
        <input type="submit" value="Login" />
      </Form>
    </div>
  )
}
