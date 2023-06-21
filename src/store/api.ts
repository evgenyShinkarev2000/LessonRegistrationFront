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

const transformResponse = function (value: string): any
{
  return JSON.parse(value, transformDto);
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
            transformResponse,
            providesTags: ["Institutes"],
          }
        ),
        getDepartments: builder.query<Department[], void>(
          {
            query: () => ({
              url: "Department",
              responseHandler: (r: Response) => r.text()
            }),
            transformResponse,
            providesTags: ["Departments"],
          }
        ),
        removeDepartment: builder.mutation({
          query: (id: number) => ({
            url: `Department/${id}`,
            method: "Delete",
            responseHandler: (r: Response) => r.text(),
          }),
          transformResponse,
          invalidatesTags: ["Departments", "Institutes"],
        }),
        addDepartment: builder.mutation({
          query: (department: Omit<Department, "id">) => ({
            url: "Department",
            method: "Post",
            body: department,
            responseHandler: (r: Response) => r.text(),
          }),
          transformResponse,
          invalidatesTags: ["Departments", "Institutes"],
        }),
        updateInstitute: builder.mutation<Institute, Institute>({
          query: (institute: Institute) => ({
            url: "Institute",
            responseHandler: (r: Response) => r.text(),
            body: institute,
            method: "PUT"
          }),
          transformResponse,
          invalidatesTags: ["Institutes"],
        }),
        updateDepartment: builder.mutation<Department, Department>({
          query: (department: Department) => ({
            url: "Department",
            responseHandler: (r: Response) => r.text(),
            body: department,
            method: "PUT"
          }),
          transformResponse,
          invalidatesTags: ["Departments", "Institutes"],
        }),
      }
    },
    reducerPath: "api"
  },
);

const { useGetInstitutesQuery,
  useGetDepartmentsQuery,
  useUpdateInstituteMutation,
  useUpdateDepartmentMutation,
  useAddDepartmentMutation,
  useRemoveDepartmentMutation,
} = api;

export const apiContainer = {
  useGetInstitutesQuery,
  useGetDepartmentsQuery,
  useUpdateInstituteMutation,
  useUpdateDepartmentMutation,
  useAddDepartmentMutation,
  useRemoveDepartmentMutation,
}
