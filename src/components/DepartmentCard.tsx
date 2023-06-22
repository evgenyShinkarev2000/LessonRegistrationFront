import { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { Department } from "src/data/Department";
import { Institute } from "src/data/Institute";
import { AcceptBtnPath } from "src/svg/AcceptBtnPath";
import { CancelBtnPath } from "src/svg/ClancelBtnPath";
import { CreateBtnPath } from "src/svg/CreateBtnPath";
import { EditBtnPath } from "src/svg/EditBtnPath";
import { RemoveBtnPath } from "src/svg/RemoveBtnPath";
import { nameof } from "src/types/nameof";
import { ButtonGroup } from "./card/ButtonGroup";
import { CardFull } from "./card/CardFull";
import { CardMode } from "./card/CardMode";
import { CardTextField } from "./card/CardTextField";
import { CardButtons } from "./card/CardButtons";

export type DepartmentCardProps = {
  value: Department,
  availableInstitutes: Institute[],
  mode: CardMode,
  isUpdating?: boolean,
  onCreate?: (value: Department) => void,
  onCancelCreate?: () => void,
  onRemove?: () => void,
  onUpdate?: (value: Department) => void,
  onSwitchRemove?: () => void,
  onSwitchUpdate?: () => void,
  onSwitchWatch?: () => void,
}

export const DepartmentCard: React.FC<DepartmentCardProps> = (props) =>
{
  const { register, getValues, reset, control } = useForm({ defaultValues: props.value });
  const isReadonly = props.mode === "watch" || props.mode === "remove";

  const switchRemove = useCallback(() =>
  {
    props.onSwitchRemove?.();
  }, [props.onSwitchRemove]);

  const switchUpdate = useCallback(() =>
  {
    props.onSwitchUpdate?.();
  }, [props.onSwitchUpdate]);

  const switchWatch = useCallback(() =>
  {
    props.onSwitchWatch?.();
  }, [props.onSwitchWatch]);

  const update = useCallback(() =>
  {
    const values = getValues();
    props.onUpdate?.(values);
  }, [props.onUpdate]);

  const create = useCallback(() =>
  {
    const values = getValues();
    props.onCreate?.(values);
  }, [props.onCreate]);

  const cancelUpdate = useCallback(() =>
  {
    reset(props.value);
    switchWatch();
  }, []);

  const remove = useCallback(() =>
  {
    props.onRemove?.();
  }, [props.onRemove]);

  const cancelRemove = useCallback(() =>
  {
    props.onSwitchWatch?.();
  }, [props.onSwitchWatch]);

  const cancelCreate = useCallback(() =>
  {
    props.onCancelCreate?.();
  }, [props.onCancelCreate]);

  const managedSelect = <Controller
    name={nameof<Department>("institute")}
    control={control}
    render={({ field }) =>
      <Select
        styles={{
          singleValue: (baseStyles, state) =>
          {
            return state.isDisabled
              ? { ...baseStyles, color: "hsl(0, 0%, 30%)" }
              : baseStyles;
          }
        }}
        value={{ value: field.value as Institute, label: (field.value as Institute).name }}
        isDisabled={isReadonly}
        onChange={(v) => field.onChange(v!.value)}
        options={props.availableInstitutes.map(i => ({ value: i, label: i.name }))}
      />}
  />

  const controlButtons = useMemo(() =>
    <CardButtons
      mode={props.mode}
      acceptCreate={{ onClick: create }}
      cancelCreate={{ onClick: cancelCreate }}
      acceptUpdate={{ onClick: update }}
      cancelUpdate={{ onClick: cancelUpdate }}
      acceptRemove={{ onClick: remove }}
      cancelRemove={{ onClick: cancelRemove }}
      switchUpdate={{ onClick: switchUpdate }}
      switchRemove={{ onClick: switchRemove }}
    />, [props.mode]);

  return (
    <CardFull
      title={<input className="card-input" readOnly={isReadonly} {...register(nameof<Department>("name"))} />}
      controlButtons={controlButtons}
      extendedFields={[<CardTextField key={1} title="Интститут" value={managedSelect} />]}
      canChangeExtended={props.mode !== "create"}
      isExtendedInitial={props.mode === "create"}
    />
  )
}