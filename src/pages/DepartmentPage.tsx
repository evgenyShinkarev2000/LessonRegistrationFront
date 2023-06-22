import React, { useState } from "react";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import { DepartmentCard } from "src/components/DepartmentCard";
import { DepartmentCardContainer } from "src/components/DepartmentCardContainer";
import { InstituteCard } from "src/components/InstituteCard";
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
            availableInstitutes={institutes ?? []}
            key={d.id}
            render={(props) => <DepartmentCard {...props}/>}
          />)
        }
      </div>
      <br></br>
      <button onClick={() => setIsAddShow(true)}>Добавить</button>
      {
        isAddShow && <DepartmentCardContainer 
        //@ts-ignore
        value={{institute: {name: "Не выбран"}, name:"Новый департамент"}} 
        render={props => <DepartmentCard {...props}/>}
        availableInstitutes={institutes ?? []}
        modeInitial="create"
        onCreateClose={() => setIsAddShow(false)}
        />
      }
    </div>
  )
}