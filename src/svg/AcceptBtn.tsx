import React from "react";
import { SvgWrapper } from "./SvgWrapper";

export const AcceptBtn: React.FC = () =>
{
  return (
    <SvgWrapper defaultFill>
      <path d="M5 13L10 18L19 7" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </SvgWrapper>
  )
}