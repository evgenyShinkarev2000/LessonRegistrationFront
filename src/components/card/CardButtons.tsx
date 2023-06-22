import React from "react";
import { ButtonGroup } from "./ButtonGroup";
import { EditBtnPath } from "src/svg/EditBtnPath";
import { AcceptBtnPath } from "src/svg/AcceptBtnPath";
import { CancelBtnPath } from "src/svg/ClancelBtnPath";
import { RemoveBtnPath } from "src/svg/RemoveBtnPath";
import { CardMode } from "./CardMode";
import { CreateBtnPath } from "src/svg/CreateBtnPath";
import { CardButtonProps } from "./CardButtonProps";

type CardButtonsProps = {
  mode: CardMode,
  isUpdating?: boolean,
  acceptCreate?: CardButtonProps,
  cancelCreate?: CardButtonProps,
  acceptUpdate?: CardButtonProps,
  cancelUpdate?: CardButtonProps,
  acceptRemove?: CardButtonProps,
  cancelRemove?: CardButtonProps,
  switchUpdate?: CardButtonProps,
  switchRemove?: CardButtonProps,
}

export const CardButtons: React.FC<CardButtonsProps> = (props) => {
  switch (props.mode)
  {
    case "create":
      return <ButtonGroup
        isUpdating={props.isUpdating}
        render={() => [
          <svg className="svg-default" onClick={props.acceptCreate?.onClick} key={1}>
            <CreateBtnPath />
          </svg>,
          <svg className="svg-default" onClick={props.cancelCreate?.onClick} key={2}>
            <CancelBtnPath />
          </svg>
        ]} />
    case "edit":
      return <ButtonGroup
        isUpdating={props.isUpdating}
        render={() => [
          <svg className="svg-default" onClick={props.acceptUpdate?.onClick} key={1}>
            <AcceptBtnPath />
          </svg>,
          <svg className="svg-default" onClick={props.cancelUpdate?.onClick} key={2}>
            <CancelBtnPath />
          </svg>
        ]}
      />
    case "watch":
      return <ButtonGroup
        isUpdating={props.isUpdating}
        render={() => [
          <svg className="svg-default" onClick={props.switchUpdate?.onClick} key={1}>
            <EditBtnPath />
          </svg>,
          <svg className="svg-default" onClick={props.switchRemove?.onClick} key={2}>
            <RemoveBtnPath />
          </svg>
        ]}
      />
    case "remove":
      return <ButtonGroup
        isUpdating={props.isUpdating}
        render={() => [
          <svg className="svg-default" onClick={props.acceptRemove?.onClick} key={1}>
            <AcceptBtnPath />
          </svg>,
          <svg className="svg-default" onClick={props.cancelRemove?.onClick} key={2}>
            <CancelBtnPath />
          </svg>
        ]}
      />
  }
}