import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { buildFetchBaseQuery } from "./BuildFetchBaseQuery";
import { Institute } from "src/data/Institute";
import { Department } from "src/data/Department";

const transformDto = function (this: any, key: string, value: any): any
{
  const lower = key.slice(0, 1).toLowerCase() + key.slice(1);
  if (lower == key)
  {
    return value;
  }
  this[lower] = value;
}

export const api = createApi(
  {
    baseQuery: buildFetchBaseQuery(),
    tagTypes: ["Institutes", "Departments"],
    endpoints: (builder) =>
    {
      return {
        getInstitutes: builder.query<Institute[], void>(
          {
            query: () => ({
              url: "Institute",
              responseHandler: (r: Response) => r.text()
            }),
            transformResponse: (value: string) => JSON.parse(value, transformDto),
            providesTags: ["Institutes"],
          }
        ),
        getDepartments: builder.query<Department[], void>(
          {
            query: () => ({
              url: "Department",
              responseHandler: (r: Response) => r.text()
            }),
            transformResponse: (value: string) => JSON.parse(value, transformDto),
            providesTags: ["Departments"],
          }
        ),
        updateInstitute: builder.mutation<Institute, Institute>({
          query: (institute: Institute) => ({
              url: "Institute",
              responseHandler: (r: Response) => r.text(),
              body: institute,
              method: "PUT"
            }),
          transformResponse: (value: string) => JSON.parse(value, transformDto),
          invalidatesTags: ["Institutes"],
        }),
        updateDepartment: builder.mutation<Department, Department>({
          query: (department: Department) => ({
              url: "Department",
              responseHandler: (r: Response) => r.text(),
              body: department,
              method: "PUT"
            }),
          transformResponse: (value: string) => JSON.parse(value, transformDto),
          invalidatesTags: ["Departments", "Institutes"],
        }),
      }
    },
    reducerPath: "api"
  },
);

const { useGetInstitutesQuery, useGetDepartmentsQuery, useUpdateInstituteMutation, useUpdateDepartmentMutation } = api;

export const apiContainer = {
  useGetInstitutesQuery,
  useGetDepartmentsQuery,
  useUpdateInstituteMutation,
  useUpdateDepartmentMutation,
}
