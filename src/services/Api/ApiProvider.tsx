import React, { PropsWithChildren, createContext } from "react";
import { apiContainer } from "src/store/api";

export const AppApiContext = createContext({} as typeof apiContainer);

type ApiProviderProps = {
  api: typeof apiContainer
};

export const ApiProvider: React.FC<PropsWithChildren<ApiProviderProps>> = (props) =>
{
  return (
    <AppApiContext.Provider value={props.api}>
      {props.children}
    </AppApiContext.Provider>
  )
}