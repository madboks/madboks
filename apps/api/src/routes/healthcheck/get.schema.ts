export const HEALTCHECK_GET_SCHEMA = {
  response: {
    200: {
      description: 'Returns the current state of the system',
      type: 'object',
      required: ['error', 'data'],
      properties: {
        error: {
          type: 'boolean',
          default: false
        },
        data: {
          type: 'array',
          default: [],
          items: {
            additionalProperties: false,
            required: ['server', 'database'],
            type: 'object',
            properties: {
              server: { type: 'boolean' },
              database: { type: 'boolean' }
            }
          }
        }
      }
    }
  }
}
