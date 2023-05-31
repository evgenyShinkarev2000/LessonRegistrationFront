import React, { useEffect, useState } from "react"
import { Institute } from "../data/Institute"
import { InstituteCard } from "../components/InstituteCard";
import { useSearchParams } from "react-router-dom";
import { apiContainer } from "src/store/api";

export const InstitutePage: React.FC = () =>
{
  const [selectedId, setSelectedId] = useSearchParams("selectedId");
  const {data} = apiContainer.useGetInstitutesQuery();

  return (
    <div className="container">
      <span>it's institute page</span>
      <br></br>
      <div className="card-layout">
        {data?.map((i: Institute) => 
        <InstituteCard 
        institute={i} 
        key={i.id} 
        showDepartments={true}
        canEdit={true}
        canExtend={true}
        />)}
      </div>
    </div>
  )
}