import { useState } from "react";
import { Institute } from "src/data/Institute";
import { useApi } from "src/services/Api/useApi";
import { InstituteCardProps } from "./InstituteCard";
import { CardMode } from "./card/CardMode";

type InstituteCardContainerProps = {
  modeInitial: CardMode,
  value: Institute,
  onCreateClose?: () => void,
  render: (instituteCardProps: InstituteCardProps) => React.ReactElement,
}

export const InstituteCardContainer: React.FC<InstituteCardContainerProps> = (props) => {
  const [mode, setMode] = useState(props.modeInitial);
  const [isUpdating, setIsUpdating] = useState(false);
  const api = useApi();
  const [updateInstitute, updateInstituteResponse] = api.useUpdateInstituteMutation();
  const [addInstitute, addInstituteResponse] = api.useAddInstituteMutation();
  const [removeInstitute, removeInstituteResponse] = api.useRemoveInstituteMutation();

  const create = (institute: Institute) => {
    if (isUpdating){
      return;
    }
    setIsUpdating(true);
    addInstitute(institute).then(() => {
      setIsUpdating(false);
      props.onCreateClose?.();
    });
  }

  const update = (institute: Institute) => {
    if (isUpdating){
      return;
    }
    setIsUpdating(true);
    updateInstitute(institute).then(() => {
      setIsUpdating(false);
      setMode("watch");
    });
  }

  const remove = () => {
    if (isUpdating){
      return;
    }
    setIsUpdating(true);
    removeInstitute(props.value.id).then(() => {
      setIsUpdating(false);
    })
  }

  const childrenProps: InstituteCardProps = {
    value: props.value,
    mode,
    isUpdating,
    onCancelCreate: props.onCreateClose,
    onCreate: create,
    onUpdate: update,
    onRemove: remove,
    onSwitchRemove: () => setMode("remove"),
    onSwitchUpdate: () => setMode("edit"),
    onSwitchWatch: () => setMode("watch"),
  }

  return props.render(childrenProps);
}