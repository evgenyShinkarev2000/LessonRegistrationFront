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

export type DepartmentCardProps = {
  value: Department,
  availableInstitutes: Institute[],
  mode: CardMode,
  isUpdating?: boolean,
  onCreate?: (value: Department) => void,
  onCancelAdd?: () => void,
  onRemove?: () => void,
  onUpdate?: (value: Department) => void,
  onSwitchRemove?: () => void,
  onSwitchUpdate?: () => void,
  onSwitchWatch?: () => void,
}

export const DepartmentCard: React.FC<DepartmentCardProps> = (props) =>
{
  const { register, getValues, reset, control } = useForm({ defaultValues: props.value });

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

  const cancelCreate = useCallback(() =>
  {
    props.onCancelAdd?.();
  }, [props.onCancelAdd]);

  const isReadonly = props.mode === "watch" || props.mode === "remove";

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

  const selectControlButtons = () =>
  {
    switch (props.mode)
    {
      case "create":
        return <ButtonGroup
          isUpdating={props.isUpdating}
          render={() => [
            <svg className="svg-default" onClick={create} key={1}>
              <CreateBtnPath />
            </svg>,
            <svg className="svg-default" onClick={cancelCreate} key={2}>
              <CancelBtnPath />
            </svg>
          ]} />
      case "edit":
        return <ButtonGroup
          isUpdating={props.isUpdating}
          render={() => [
            <svg className="svg-default" onClick={update} key={1}>
              <AcceptBtnPath />
            </svg>,
            <svg className="svg-default" onClick={cancelUpdate} key={2}>
              <CancelBtnPath />
            </svg>
          ]}
        />
      case "watch":
        return <ButtonGroup
          isUpdating={props.isUpdating}
          render={() => [
            <svg className="svg-default" onClick={switchUpdate} key={1}>
              <EditBtnPath />
            </svg>,
            <svg className="svg-default" onClick={switchRemove} key={2}>
              <RemoveBtnPath />
            </svg>
          ]}
        />
      case "remove":
        return <ButtonGroup
          isUpdating={props.isUpdating}
          render={() => [
            <svg className="svg-default" onClick={remove} key={1}>
              <AcceptBtnPath />
            </svg>,
            <svg className="svg-default" onClick={switchWatch} key={2}>
              <CancelBtnPath />
            </svg>
          ]}
        />
    }
  }

  const controlButtons = useMemo(() => selectControlButtons(), [props.mode]);

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