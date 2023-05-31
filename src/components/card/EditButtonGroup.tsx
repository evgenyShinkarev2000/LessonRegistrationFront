import React from "react";
import { AcceptBtn } from "src/svg/AcceptBtn";
import { CancelBtn } from "src/svg/ClancelBtn";
import { EditBtn } from "src/svg/EditBtn";
import { RemoveBtn } from "src/svg/RemoveBtn";
import { Spinner } from "./Spinner";
import styles from "./EditButtonGroup.module.scss";

export type EditButtonGroupProps = {
  isEdit: boolean,
  onEditClick?: () => void,
  onAcceptClick?: () => void,
  onCancelClick?: () => void,
  onRemoveClick?: () => void,
  isUpdating?: boolean,
  isError?: boolean,
}

export const EditButtonGroup: React.FC<EditButtonGroupProps> = (props) =>
{
  if (props.isError){
    return (
      <p>error</p>
    )
  }

  if (props.isUpdating){
    return <Spinner/>
  }

  if (props.isEdit)
  {
    return (
      <div className={styles.buttons}>
        <div onClick={() => props.onAcceptClick?.()}>
          <AcceptBtn />
        </div>
        <div onClick={() => props.onCancelClick?.()}>
          <CancelBtn />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.buttons}>
      <div onClick={() => props.onEditClick?.()}>
        <EditBtn />
      </div>
      <div onClick={() => props.onRemoveClick?.()}>
        <RemoveBtn />
      </div>
    </div>
  )
}