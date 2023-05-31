import React from "react";
import styles from "./SvgWrapperStyles.module.scss";

export type SvgWrapperProps = {
  style?: React.CSSProperties,
  defaultFill?: boolean,
  defaultStroke?: boolean,
}

export const SvgWrapper: React.FC<React.PropsWithChildren<SvgWrapperProps>> = (props) => {

  const classNames = `${styles.svgWrapper} ${props.defaultFill ? "" : styles.currentFill} ${props.defaultStroke ? "" : styles.currentStroke}`;

  return (
    <svg className={classNames} style={props.style} viewBox="0 0 24 24" fill="none" stroke="none">
      {props.children}
    </svg>
  )
}