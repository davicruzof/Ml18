import { AxiosError, AxiosResponse } from "axios";
import api from "../api";
import { EnterPriseType } from "./types";

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

export const getEnterpriseById = (credential: any) =>
  new Promise((resolve) => {
    setTimeout(() => {
      api
        .post("/enterprises/getById", credential)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          resolve(error.message);
        });
    }, 0);
  });

export const createEnterprise = (credentials: any) =>
  new Promise((resolve) => {
    setTimeout(() => {
      api
        .post("/enterprises/create", credentials)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          resolve(error.response);
        });
    }, 0);
  });
