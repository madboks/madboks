import { isProduction } from "@/utils/env"

interface FetchProps {
  url: string,
  method?: string,
  filters?: Record<string, string>
  body?: Record<string, string>
}

const normalizeFilters = (filters: Record<string, string>) => {
  const qs = Object
    .entries(filters)
    .reduce((acc, [key, value]) => {
      if (value) {
        acc.append(`filter[${key}]`, value)
      }

      return acc
    }, new URLSearchParams())

  return qs.toString()
}

export async function api ({
  url,
  method = 'GET',
  filters = {},
  body
}: FetchProps) {
  const abortController = new AbortController()

  const endpoint = new URL(`${import.meta.env.VITE_API}${url}`)

  endpoint.search = normalizeFilters(filters)

  let response: Response | undefined
  try {
    response = await window.fetch(
      decodeURI(endpoint.toString()),
      {
        signal: abortController.signal,
        method,
        ...(body && { body: JSON.stringify(body) }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: isProduction() ? 'same-origin' : 'include'
      }
    )

    if (response.ok) {
      return await response.json()
    }

    return await Promise.reject(response)
  } catch (error) {
    if (error.name && error.name.toLowerCase() !== 'aborterror') {
      abortController.abort()
    }

    return await Promise.reject(error)
  }
}
