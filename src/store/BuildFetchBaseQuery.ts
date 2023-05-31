import { TokenManager } from './../services/TokenManager';
import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export function buildFetchBaseQuery()
{

  const baseUrl = import.meta.env.VITE_USE_ORIGIN_URI === "true"
    ? `https://${window.location.hostname}:${import.meta.env.VITE_ORIGIN_API_PORT}/api`
    : import.meta.env.VITE_API_URI;

  if (!baseUrl?.trim())
  {
    throw new Error("Couldn't find baseUri");
  }
  const tokenManager = new TokenManager(baseUrl);
  return fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, api) =>
    {
      if (tokenManager.token)
      {
        headers.set("Authorization", `Bearer ${tokenManager.token}`);
      }

      return headers;
    },

  });
}

const t = fetchBaseQuery({});