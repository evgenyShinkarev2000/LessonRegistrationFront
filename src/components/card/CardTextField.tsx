import React, { ReactNode } from "react";
import styles from "./CardTextField.module.scss";

export type CardFieldProps = {
  title?: string,
  value?: ReactNode,
}

export const CardTextField: React.FC<CardFieldProps> = (props) =>
{
  return (
    <div className={styles.field}>
      {
        props.title &&
        <span className={styles.title}>
          {
            props.title
          }
        </span>
      }
      <div className={styles.value}>
      {
        props.value 
      }
      </div>
    </div>
  )
}