import { AxiosError } from "axios";
import api from "services/api";

import {
  DptTypes,
  TypeRequest,
  TypeSolicitations,
  listRequestResponse,
  TypeListRequest,
} from "./types";

export const getDepartments = async (): Promise<DptTypes[]> => {
  try {
    const { data } = await api.get("/departaments/list");
    return data;
  } catch (err) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const getTypeSolicitations = async (
  id: string
): Promise<TypeSolicitations[]> => {
  try {
    const { data } = await api.post("/departaments/list_area_departamento", {
      id_area: id,
    });
    return data;
  } catch (err) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const createRequest = async (credentials: TypeRequest) => {
  try {
    const { data } = await api.post("requests/create", credentials);
    return data;
  } catch (err) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const listRequests = async (
  credentials: TypeListRequest
): Promise<listRequestResponse[]> => {
  try {
    const { data } = await api.post("requests/list", credentials);
    return data;
  } catch (err) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const listRequest = async (
  id: string
): Promise<listRequestResponse[]> => {
  try {
    const { data } = await api.post("requests/getById", { id_solicitacao: id });
    return data;
  } catch (err) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const updateRequest = async (
  credentials: any
): Promise<listRequestResponse[]> => {
  try {
    const { data } = await api.put("requests/update", credentials);
    return data;
  } catch (err) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const getMessages = async (id: string) => {
  try {
    const { data } = await api.post("requestsChat/getMessages", {
      id_solicitacao: id,
    });
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const sendMessage = async (credentials: any) => {
  try {
    const { data } = await api.post("requestsChat/create", credentials);
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};
