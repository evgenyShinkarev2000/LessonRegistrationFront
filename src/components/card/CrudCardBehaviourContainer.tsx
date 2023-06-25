import React, { useState } from "react";
import { CardMode } from "./CardMode";

export type CrudCardContainerProps<T> = {
  value: T,
  modeInitial: CardMode,
  render: (props: CrudCardPresentorPartialProps<T>) => React.ReactElement<CrudCardPresentorPartialProps<T>>,
  onCreate?: (value: T) => Promise<unknown>,
  onUpdate?: (value: T) => Promise<unknown>,
  onRemove?: () => Promise<unknown>,
  onCreateClose?: () => void,
}

export type CrudCardPresentorPartialProps<T> = {
  value: T,
  mode: CardMode,
  onCreate?: (value: T) => void,
  onCancelCreate?: () => void,
  onRemove?: () => void,
  onUpdate?: (value: T) => void,
  onSwitchRemove?: () => void,
  onSwitchUpdate?: () => void,
  onSwitchWatch?: () => void,
} & Record<string | number | symbol, unknown>


export function CrudCardBehaviourContainer<T>(props: CrudCardContainerProps<T>):
  React.ReactElement<CrudCardPresentorPartialProps<T>>
{
  const [mode, setMode] = useState(props.modeInitial);
  const [isUpdating, setIsUpdating] = useState(false);

  const remove = () =>
  {
    if (isUpdating)
    {
      return;
    }
    setIsUpdating(true);
    props.onRemove?.().then(() =>
    {
      setIsUpdating(false);
    });
  }


  const update = (value: T) =>
  {
    if (isUpdating)
    {
      return;
    }
    setIsUpdating(true);
    props.onUpdate?.(value).then(() =>
    {
      setIsUpdating(false);
      setMode("watch");
    });
  }

  const create = (value: T) =>
  {
    if (isUpdating)
    {
      return;
    }
    setIsUpdating(true);
    props.onCreate?.(value).then(() =>
    {
      setIsUpdating(false);
      props.onCreateClose?.();
    });
  }

  const childrenProps: CrudCardPresentorPartialProps<T> = {
    mode,
    value: props.value,
    isUpdating,
    onCancelCreate: props.onCreateClose,
    onCreate: create,
    onUpdate: update,
    onRemove: remove,
    onSwitchRemove: () => setMode("remove"),
    onSwitchUpdate: () => setMode("edit"),
    onSwitchWatch: () => setMode("watch"),
  };

  return props.render(childrenProps);
}