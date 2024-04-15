/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
