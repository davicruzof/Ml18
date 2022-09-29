import { AxiosError } from "axios";
import { LoginData } from "pages/signInPage/types";
import api from "../api";
import { LoginResponse } from "./types";

export const login = async (credentials: LoginData): Promise<LoginResponse> => {
  try {
    const { data } = await api.post("/auth/login", credentials);
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const user = async () => {
  try {
    const { data } = await api.get("/auth/me");
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};
