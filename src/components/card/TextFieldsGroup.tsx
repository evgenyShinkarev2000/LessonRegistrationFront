import React, { ReactNode } from "react";
import styles from "./TextFieldsGroup.module.scss";

export type TextFieldGroupProps = {
  title: ReactNode,
  fields: ReactNode[],
}

export const TextFieldGroup: React.FC<TextFieldGroupProps> = (props) =>
{
  return (
    <div className={styles.group}>
      <div className={styles.title}>
        {props.title}
      </div>
      <div className={styles.fields}>
        {props.fields}
      </div>
    </div>
  )
}