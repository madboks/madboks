interface FetchProps {
  url: string
  filters?: unknown
  data?: unknown
}

export interface GetResponse<T> {
  data: T
  error: boolean

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

export async function get ({ url, filters = {} }: FetchProps) {
  const abortController = new AbortController()

  const endpoint = new URL(`${import.meta.env.VITE_API}/${url}`)

  endpoint.search = normalizeFilters(filters)

  let response: Response | undefined
  try {
    response = await window.fetch(
      decodeURI(endpoint.toString()),
      {
        signal: abortController.signal,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )

    if (response.ok) {
      return await response.json()
    }

    return await Promise.reject(response)
  } catch (error) {
    if (error.name && error.name.toLowerCase() !== 'aborterror') {
      return await Promise.reject(error)
    }
  }
}

export async function post ({ url, data }: FetchProps) {
  const abortController = new AbortController()

  let response: Response | undefined
  try {
    response = await window.fetch(
      `${import.meta.env.VITE_API}/${url}`,
      {
        signal: abortController.signal,
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      }
    )

    if (response.ok) {
      return await response.json()
    }

    return await Promise.reject(response)
  } catch (error) {
    if (error.name && error.name.toLowerCase() !== 'aborterror') {
      return await Promise.reject(error)
    }
  }
}
