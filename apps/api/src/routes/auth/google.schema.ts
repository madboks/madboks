import errorSchema from "@/utils/errorSchema";

export const GOOGLE_GET_SCHEMA = {
  querystring: {
    type: 'object',
    additionalProperties: true,
    properties: {
      error: {
        type: 'boolean',
      },
      redirect: {
        type: 'string',
      },
      code: {
        type: 'string',
      },
      scope: {
        type: 'string',
      },
      authuser: {
        type: 'number',
      },
      prompt: {
        type: 'string',
      },
    },
  },
  response: {
    200: {
      description: 'Returns information about the authentication process',
      type: 'object',
      required: ['error'],
      properties: {
        error: {
          type: 'boolean',
          default: false
        }
      }
    },
    302: {
      description: 'Redirects the user to the specified URL if the authentication process is successful',
      type: 'string',
    },
    400: errorSchema(400),
  }
}
