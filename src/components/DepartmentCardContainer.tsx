import React, { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { CardMode } from "./card/CardMode";
import { apiContainer } from "src/store/api";
import { DepartmentCard, DepartmentCardProps } from "./DepartmentCard";
import { Institute } from "src/data/Institute";
import { Department } from "src/data/Department";
import { watch } from "fs";

type DepartmentContainerProps = {
  modeInitial: CardMode,
  availableInstitutes: Institute[],
  value: Department,
  onCreateClose?: () => void,
  render: (departmentCardProps: DepartmentCardProps) => React.ReactElement,
}

export const DepartmentCardContainer: React.FC<PropsWithChildren<DepartmentContainerProps>> = (props) =>
{
  const [addDepartment, addDepartmentResponse] = apiContainer.useAddDepartmentMutation();
  const [updateDepartment, updateDepartmentResponse] = apiContainer.useUpdateDepartmentMutation();
  const [removeDepartment, removeDepartmentResponse] = apiContainer.useRemoveDepartmentMutation();
  const [mode, setMode] = useState(props.modeInitial);
  const [isUpdating, setIsUpdating] = useState(false);

  const remove = () =>
  {
    if (isUpdating)
    {
      return;
    }
    setIsUpdating(true);
    removeDepartment(props.value.id).then(() =>
    {
      setIsUpdating(false);
    });
  }

  const update = (department: Department) =>
  {
    if (isUpdating)
    {
      return;
    }
    setIsUpdating(true);
    updateDepartment(department).then(() =>
    {
      setIsUpdating(false);
      setMode("watch");
    });
  }

  const create = (department: Department) =>
  {
    if (isUpdating)
    {
      return;
    }
    setIsUpdating(true);
    addDepartment(department).then(() =>
    {
      setIsUpdating(false);
      props.onCreateClose?.();
    });
  }

  const childrenProps: DepartmentCardProps = {
    availableInstitutes: props.availableInstitutes,
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