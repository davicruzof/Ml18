import { AxiosError, AxiosResponse } from "axios";
import api from "../api";
import { EnterpriseResponse, EnterPriseType } from "./types";

export const getEnterprises = (): Promise<
  AxiosResponse<EnterPriseType[] | undefined>
> => {
  try {
    const data = api.get("/enterprises");
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const getEnterpriseByName = (credential: any) =>
  new Promise((resolve) => {
    setTimeout(() => {
      api
        .post("/enterprises/getByName", credential)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          resolve(error.message);
        });
    }, 0);
  });

export const getEnterpriseById = (
  credential: number
): Promise<AxiosResponse<EnterpriseResponse>> => {
  try {
    const data = api.post("/enterprises/getById", { id_empresa: credential });
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const createEnterprise = (credentials: any) => {
  try {
    const data = api.post("/enterprises/create", credentials);
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};
// new Promise((resolve) => {
//   setTimeout(() => {
//     api
//       .post("/enterprises/create", credentials)
//       .then(function (response) {
//         resolve(response);
//       })
//       .catch(function (error) {
//         resolve(error.response);
//       });
//   }, 0);
// });
