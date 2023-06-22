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

const responseHandler = (r: Response) => r.text();
const transformResponse = (value: string) => JSON.parse(value, transformDto);

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
              responseHandler,
            }),
            transformResponse,
            providesTags: ["Institutes"],
          }
        ),
        getDepartments: builder.query<Department[], void>(
          {
            query: () => ({
              url: "Department",
              responseHandler,
            }),
            transformResponse,
            providesTags: ["Departments"],
          }
        ),
        removeDepartment: builder.mutation({
          query: (id: number) => ({
            url: `Department/${id}`,
            method: "Delete",
            responseHandler,
          }),
          transformResponse,
          invalidatesTags: ["Departments", "Institutes"],
        }),
        addDepartment: builder.mutation({
          query: (department: Omit<Department, "id">) => ({
            url: "Department",
            method: "Post",
            body: department,
            responseHandler,
          }),
          transformResponse,
          invalidatesTags: ["Departments", "Institutes"],
        }),
        updateInstitute: builder.mutation<Institute, Institute>({
          query: (institute: Institute) => ({
            url: "Institute",
            responseHandler,
            body: institute,
            method: "PUT"
          }),
          transformResponse,
          invalidatesTags: ["Institutes"],
        }),
        addInstitute: builder.mutation<Institute, Institute>({
          query: (institute: Institute) => ({
            url: "Institute",
            responseHandler,
            body: institute,
            method: "Post",
          }),
          transformResponse,
          invalidatesTags: ["Institutes"],
        }),
        removeInstitute: builder.mutation<Institute, number>({
          query: (id: number) => ({
            url: `Institute/${id}`,
            responseHandler,
            method: "Delete",
          }),
          transformResponse,
          invalidatesTags: ["Institutes"],
        }),
        updateDepartment: builder.mutation<Department, Department>({
          query: (department: Department) => ({
            url: "Department",
            responseHandler,
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
  useAddInstituteMutation,
  useRemoveInstituteMutation,
} = api;

export const apiContainer = {
  useGetInstitutesQuery,
  useGetDepartmentsQuery,
  useUpdateInstituteMutation,
  useUpdateDepartmentMutation,
  useAddDepartmentMutation,
  useRemoveDepartmentMutation,
  useAddInstituteMutation,
  useRemoveInstituteMutation,
};