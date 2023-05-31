import React from "react";
import styles from "./SwitchArror.module.scss";
import arrow from "@icons/arrow.svg";

export type SwitchArrorProps = {
  onClick?: () => void,
  isExtended?: boolean,
}

export const SwitchArrow: React.FC<SwitchArrorProps> = (props) => {

  return (
    <div className={styles.container} onClick={() => props.onClick?.()}>
      <img src={arrow} className={`${styles.arrow} ${props.isExtended ? styles.extended : ""}`}></img>
    </div>
  )
}