import React, { useContext } from "react";
import { apiContainer } from "src/store/api";
import { AppApiContext } from "./ApiProvider";

export function useApi(): typeof apiContainer
{
  return useContext(AppApiContext);
}