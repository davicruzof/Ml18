import { AxiosError, AxiosResponse } from "axios";
import { LoginData } from "pages/signInPage/types";
import api from "../api";
import { LoginResponse } from "./types";

export const getEnterprises = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      api
        .get("/auth/getEnterprises")
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          resolve(error.message);
        });
    }, 0);
  });

export const login = async (credentials: LoginData): Promise<LoginResponse> => {
  try {
    const { data } = await api.post("/auth/login", credentials);
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};
