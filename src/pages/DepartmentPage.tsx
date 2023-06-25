import React, { useState } from "react";
import { DepartmentCard } from "src/components/DepartmentCard";
import { DepartmentCardContainer } from "src/components/DepartmentCardContainer";
import { apiContainer } from "src/store/api";

export const DepartmentPage: React.FC = () =>
{
  const departments = apiContainer.useGetDepartmentsQuery().data;
  const institutes = apiContainer.useGetInstitutesQuery().data;
  const [isAddShow, setIsAddShow] = useState(false);

  return (
    <div className="container">
      <span>It's department page</span>
      <br></br>
      <div className="card-block">
        {
          departments?.map((d, i) => <DepartmentCardContainer
            value={d}
            modeInitial="watch"
            key={d.id}
            render={(props) => <DepartmentCard {...{...props, availableInstitutes: institutes ?? []}}/>}
          />)
        }
      </div>
      <br></br>
      <button onClick={() => setIsAddShow(true)}>Добавить</button>
      {
        isAddShow && <DepartmentCardContainer 
        //@ts-ignore
        value={{institute: {name: "Не выбран"}, name:"Новый департамент"}} 
        render={props => <DepartmentCard {...{...props, availableInstitutes: institutes ?? []}}/>}
        availableInstitutes={institutes ?? []}
        modeInitial="create"
        onCreateClose={() => setIsAddShow(false)}
        />
      }
    </div>
  )
}