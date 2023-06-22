import React, { useEffect, useState } from "react"
import { Institute } from "../data/Institute"
import { InstituteCard } from "../components/InstituteCard";
import { useSearchParams } from "react-router-dom";
import { apiContainer } from "src/store/api";
import { InstituteCardContainer } from "src/components/InstituteCardContainer";

export const InstitutePage: React.FC = () =>
{
  const [selectedId, setSelectedId] = useSearchParams("selectedId");
  const [isAddShow, setIsAddShow] = useState(false);
  const { data } = apiContainer.useGetInstitutesQuery();

  return (
    <div className="container">
      <span>it's institute page</span>
      <br></br>
      <div className="card-layout">
        {data?.map((institute: Institute, index: number) =>
          <InstituteCardContainer
            modeInitial="watch"
            value={institute}
            render={(instituteCardProps => <InstituteCard {...instituteCardProps} />)}
            key={institute.id}
          />)}
      </div>
      <br></br>
      <button onClick={() => setIsAddShow(true)}>Добавить</button>
      {
        isAddShow && <InstituteCardContainer
          //@ts-ignore
          value={{name: "Новый Институт"}}
          render={props => <InstituteCard {...props} />}
          modeInitial="create"
          onCreateClose={() => setIsAddShow(false)}
        />
      }
    </div>
  )
}