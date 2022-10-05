import { AxiosError, AxiosResponse } from "axios";
import api from "../api";
import { EmployeeAreasType, EmployeeByIdType, EmployeeType } from "./types";

export const getAllEmployee = (): Promise<
  AxiosResponse<EmployeeType[] | undefined>
> => {
  try {
    const data = api.get("/employee/getAll");
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const getEmployeeById = (
  id: string
): Promise<AxiosResponse<EmployeeByIdType[] | undefined>> => {
  try {
    const data = api.post("/employee/getById", { id_funcionario: id });
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const updateEmployeeAreas = (credentials: EmployeeAreasType) => {
  try {
    const data = api.post("/employee/add-area", credentials);
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};
