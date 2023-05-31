import React from "react";
import styles from "./Spinner.module.scss";

export const Spinner: React.FC = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.first}></div>
      <div className={styles.second}></div>
      <div className={styles.third}></div>
    </div>
  )
}