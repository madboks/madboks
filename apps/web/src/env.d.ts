/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly HOST: string
  readonly PORT: string
  readonly PUBLIC_API_URL: string
  readonly PUBLIC_APP_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
