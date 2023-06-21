import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { apiContainer } from "src/store/api";
import { Institute } from "../data/Institute";
import { CardFull } from "./card/CardFull";
import { ButtonGroup } from "./card/ButtonGroup";
import { TextFieldGroup } from "./card/TextFieldsGroup";

export type InstituteCardProps = {
  institute: Institute,
  showDepartments?: boolean,
  isExtended?: boolean,
  canExtend?: boolean,
  canEdit?: boolean,
  updateCard?: (state: Record<string, string>) => void
}

export const InstituteCard: React.FC<InstituteCardProps> = (props) =>
{
  const { register, getValues, reset } = useForm({ values: props.institute });
  const [updateInstitute, updateData] = apiContainer.useUpdateInstituteMutation();
  const [isEdit, setIsEdit] = useState(false);
  const handleAccept = useCallback(() =>
  {
    updateInstitute(getValues());
    setIsEdit(false);
  }, []);

  const handleCancel = useCallback(() =>
  {
    reset(props.institute);
    setIsEdit(false);
  }, []);


  return (
    <CardFull
      title={<input className="card-input" {...register("name")} readOnly={!isEdit} />}
      controlButtons={<ButtonGroup
        isEdit={isEdit}
        onEditClick={() => setIsEdit(prev => !prev)}
        isUpdating={updateData.isLoading}
        onAcceptClick={handleAccept}
        onCancelClick={handleCancel}
        onRemoveClick={() => { }}
      />}
      fieldGroups={[<TextFieldGroup
        key={1}
        title="департеманты"
        fields={props.institute.departments?.map((d, i) => <span key={i}>{d.name}</span>) ?? []}
      />]}
    />
  )
}