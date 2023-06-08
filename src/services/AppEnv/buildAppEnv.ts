import { AppEnv } from './AppEnv';

export function buildAppEnv(): AppEnv{
  return {
    API_URI: ProcessEnvState.API_URI ?? import.meta.env.VITE_API_URI,
    XYZ: ProcessEnvState.XYZ ?? import.meta.env.VITE_XYZ,
  }
}