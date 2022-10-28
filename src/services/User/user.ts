import { AxiosError } from "axios";
import api from "../api";
import { RegisterProps, UserResponse } from "./types";

export const createUser = async (credentials: RegisterProps) => {
  try {
    const { data } = await api.post("/user/create", {
      ...credentials,
      id_grupo: null,
    });
    return data;
  } catch (err) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const getUser = async (): Promise<UserResponse> => {
  try {
    const { data } = await api.get("/auth/me");
    return data;
  } catch (err) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};
