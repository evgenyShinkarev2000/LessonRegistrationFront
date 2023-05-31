import React, { useCallback, useEffect, useState } from "react";
import { Department } from "src/data/Department";
import { CardFull } from "./card/CardFull";
import { apiContainer } from "src/store/api";
import { Controller, useForm } from "react-hook-form";
import { nameof } from "src/types/nameof";
import { EditButtonGroup } from "./card/EditButtonGroup";
import { CardTextField } from "./card/CardTextField";
import { Institute } from "src/data/Institute";
import Select from "react-select";

export type DepartmentCardProps = {
  department: Department,
  availableInstitutes: Institute[],
}

export const DepartmentCard: React.FC<DepartmentCardProps> = (props) =>
{
  const [updateDepartment, updateData] = apiContainer.useUpdateDepartmentMutation();
  const { register, getValues, reset, control } = useForm({ defaultValues: props.department });
  const [isEdit, setIsEdit] = useState(false);
  const handleAccept = useCallback(() =>
  {
    const values = getValues() as Department;
    updateDepartment(values);
    setIsEdit(false);
  }, []);
  const handleCancel = useCallback(() =>
  {
    reset(props.department);
    setIsEdit(false);
  }, []);

  const controller = <Controller
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
        value={{value: field.value as Institute, label: (field.value as Institute).name}}
        isDisabled={!isEdit}
        onChange={(v) => field.onChange(v!.value)}
        options={props.availableInstitutes.map(i => ({ value: i, label: i.name }))}
      />}
  />

  return (
    <CardFull
      title={<input className="card-input" readOnly={!isEdit} {...register(nameof<Department>("name"))} />}
      controlButtons={<EditButtonGroup
        isEdit={isEdit}
        onEditClick={() => setIsEdit(prev => !prev)}
        isUpdating={updateData.isLoading}
        onAcceptClick={handleAccept}
        onCancelClick={handleCancel}
        onRemoveClick={() => { }}
      />}
      extendedFields={[<CardTextField key={1} title="Интститут" value={controller} />]}
    />
  )
}