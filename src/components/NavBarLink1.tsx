import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBarLink1.module.scss";

export type NavBarLink1Props = {
  isActive: boolean,
  text: string,
}

export const NavBarLink1: React.FC<NavBarLink1Props> = (props) =>
{

  return (
      <div className={`${styles.container} ${props.isActive ? styles.active : ""}`}>
        <span className={styles.text}>{props.text}</span>
      </div>
  )
}