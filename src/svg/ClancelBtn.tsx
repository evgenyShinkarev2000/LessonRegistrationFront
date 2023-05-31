import React from "react";
import { SvgWrapper } from "src/svg/SvgWrapper";

export const CancelBtn: React.FC = () =>
{
  return (
    <SvgWrapper defaultFill>
      <path d="M7 17L17 7" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
      <path d="M17 17L7 7" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
    </SvgWrapper>
  )
}