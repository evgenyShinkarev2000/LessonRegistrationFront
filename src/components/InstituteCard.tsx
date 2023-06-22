import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { apiContainer } from "src/store/api";
import { Institute } from "../data/Institute";
import { CardButtons } from "./card/CardButtons";
import { CardFull } from "./card/CardFull";
import { CardMode } from "./card/CardMode";
import { TextFieldGroup } from "./card/TextFieldsGroup";

export type InstituteCardProps = {
  value: Institute,
  mode: CardMode,
  isUpdating?: boolean,
  onCreate?: (value: Institute) => void,
  onCancelCreate?: () => void,
  onRemove?: () => void,
  onUpdate?: (value: Institute) => void,
  onSwitchRemove?: () => void,
  onSwitchUpdate?: () => void,
  onSwitchWatch?: () => void,
}

export const InstituteCard: React.FC<InstituteCardProps> = (props) =>
{
  const { register, getValues, reset } = useForm({ values: props.value });
  const isReadonly = props.mode === "watch" || props.mode === "remove";

  const acceptUpdate = useCallback(() =>
  {
    const values = getValues();
    props.onUpdate?.(values);
  }, [props.onUpdate]);

  const cancelUpdate = useCallback(() =>
  {
    reset(props.value);
    props.onSwitchWatch?.();
  }, [props.onSwitchWatch]);

  const acceptCreate = useCallback(() =>
  {
    const values = getValues();
    props.onCreate?.(values);
  }, [props.onCreate]);

  const cancelCreate = useCallback(() =>
  {
    props.onCancelCreate?.();
  }, [props.onCreate]);

  const acceptRemove = useCallback(() =>
  {
    props.onRemove?.();
  }, [props.onRemove]);

  const cancelRemove = useCallback(() =>
  {
    props.onSwitchWatch?.();
  }, [props.onSwitchWatch]);

  const switchUpdate = useCallback(() =>
  {
    props.onSwitchUpdate?.();
  }, [props.onSwitchUpdate]);

  const switchRemove = useCallback(() =>
  {
    props.onSwitchRemove?.();
  }, [props.onSwitchRemove]);

  const controlButtons = useMemo(() =>
    <CardButtons
      mode={props.mode}
      acceptCreate={{ onClick: acceptCreate }}
      cancelCreate={{ onClick: cancelCreate }}
      acceptRemove={{ onClick: acceptRemove }}
      cancelRemove={{ onClick: cancelRemove }}
      acceptUpdate={{ onClick: acceptUpdate }}
      cancelUpdate={{ onClick: cancelUpdate }}
      switchRemove={{ onClick: switchRemove }}
      switchUpdate={{ onClick: switchUpdate }}
    />, [props.mode]);


  return (
    <CardFull
      title={<input className="card-input" {...register("name")} readOnly={isReadonly} />}
      controlButtons={controlButtons}
      fieldGroups={props.mode !== "create" ? [<TextFieldGroup
        key={1}
        title="департеманты"
        fields={props.value.departments?.map((d, i) => <span key={i}>{d.name}</span>) ?? []}
      />] : []}
      canChangeExtended={props.mode !== "create"}
      isExtendedInitial={props.mode === "create"}
    />
  )
}