type MatcherKeys = {
  key: string
  match: string
}

type MatcherSettings = {
  caseSensitive?: boolean
  exceptions?: Record<string, string>
}

export function matcher (
  oldest: Record<string, string>[],
  newest: Record<string, string>[],
  { key, match }: MatcherKeys,
  options: MatcherSettings = { caseSensitive: false, exceptions: {} },
) {
  const fn = new Intl.Collator('en', { sensitivity: options.caseSensitive ? 'variant' : 'base' })

  const transformed: Record<string, string> = {}

  oldest.forEach((old) => {
    const matched = newest.find(n => fn.compare(n[match] as string, old[key] as string) === 0)

    if (matched && matched.id) {
      transformed[old.id as string] = matched.id

      return
    }

    const excep = options.exceptions?.[old[key] as string]
    if (excep !== undefined) {
      const matchException = newest.find(n => fn.compare(n[match] as string, excep) === 0)

      if (matchException) {
        transformed[old[key] as string] = matchException.id as string

        return
      }

      return
    }
  })

  return transformed
}
