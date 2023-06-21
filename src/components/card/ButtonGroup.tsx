import React from "react";
import styles from "./ButtonGroup.module.scss";
import { Spinner } from "./Spinner";

type ButtonGroupProps = {
  isUpdating?: boolean,
  isError?: boolean,
  render: () => React.ReactElement[],
}

export const ButtonGroup: React.FC<ButtonGroupProps> = (props) =>
{
  if (props.isError)
  {
    return (
      <p>error</p>
    )
  }

  if (props.isUpdating)
  {
    return <Spinner />
  }

  return (
    <div className={styles.buttons}>
      {props.render()}
    </div>
  )
}