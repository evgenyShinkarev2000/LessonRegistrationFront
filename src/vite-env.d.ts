/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URI: string,
  readonly VITE_USE_ORIGIN_URI: string,
  readonly VITE_ORIGIN_API_PORT: string,
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}