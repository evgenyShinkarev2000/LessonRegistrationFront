import React from "react";
import { Department } from "src/data/Department";
import { useApi } from "src/services/Api/useApi";
import { CardMode } from "./card/CardMode";
import { CrudCardBehaviourContainer, CrudCardContainerProps, CrudCardPresentorPartialProps } from "./card/CrudCardBehaviourContainer";

type DepartmentContainerProps = {
  value: Department,
  modeInitial: CardMode,
  render: (props: CrudCardPresentorPartialProps<Department>) => React.ReactElement<CrudCardPresentorPartialProps<Department>>,
}

export const DepartmentCardContainer: React.FC<DepartmentContainerProps> = (props) =>
{
  const api = useApi();
  const [create, createResponse] = api.useAddDepartmentMutation();
  const [update, updateResponse] = api.useUpdateDepartmentMutation();
  const [remove, removeResponse] = api.useRemoveDepartmentMutation();

  const childrenProps: CrudCardContainerProps<Department> = {
    ...props,
    onCreate: create,
    onUpdate: update,
    onRemove: () => remove(props.value.id),
  }

  return <CrudCardBehaviourContainer {...childrenProps}/>
}