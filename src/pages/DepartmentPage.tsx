import React from "react";
import { DepartmentCard } from "src/components/DepartmentCard";
import { Department } from "src/data/Department";
import { apiContainer } from "src/store/api";

export const DepartmentPage: React.FC = () =>
{
  const departments = apiContainer.useGetDepartmentsQuery().data;
  const institutes = apiContainer.useGetInstitutesQuery().data;

  return (
    <div className="container">
      <span>It's department page</span>
      <br></br>
      <div className="card-block">
        {
          departments?.map((d, i) => <DepartmentCard department={d} availableInstitutes={institutes ?? []} key={i} />)
        }
      </div>
    </div>
  )
}