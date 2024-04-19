type ErrorSchema = {
  type: string
  required: string[]
  properties: Record<string, unknown>
}

function schema (status = 400): ErrorSchema {
  return ({
    type: 'object',
    required: ['error', 'errors'],
    properties: {
      error: {
        type: 'boolean',
        default: true,
      },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          required: ['code', 'status'],
          properties: {
            code: { type: 'string' },
            status: {
              type: 'string',
              default: status.toString(),
            },
            detail: { type: 'string' },
          },
        },
      },
    },
  })
}

export default schema
