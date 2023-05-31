import React, { useState } from "react";
import styles from "./CardFull.module.scss";
import { SwitchArrow } from "./SwitchArrow";
import { EditButtonGroup } from "./EditButtonGroup";

export type FieldGroup = {
  title: React.ReactElement,
  fields: React.ReactElement[],
}

export type CardFullProps = {
  title: React.ReactElement,
  controlButtons: React.ReactElement,
  extendedFields?: React.ReactElement[],
  fieldGroups?: React.ReactElement[],
  isExtendedInitial?: boolean,
}

export const CardFull: React.FC<CardFullProps> = (props) =>
{
  const [isExtended, setIsExtended] = useState(!!props.isExtendedInitial);

  return (
    <div className={styles.cardFull}>
      <div className={styles.extenedArrow}>
        <SwitchArrow onClick={() => setIsExtended(prev => !prev)} isExtended={isExtended} />
      </div>
      <div className={styles.title}>
        {
          props.title
        }
      </div>
      <div className={styles.buttons}>
        {
          props.controlButtons
        }
      </div>
      {
        isExtended &&
        <div className={styles.optionalFields}>
          {
            props.extendedFields?.length as number > 0 &&
            <div className={styles.extendedFields}>
              {
                props.extendedFields
              }
            </div>
          }
          {
            props.fieldGroups?.length as number > 0 &&
            <div className={styles.arrayFields}>
              {
                props.fieldGroups
              }
            </div>
          }
        </div>
      }
    </div>
  )
}