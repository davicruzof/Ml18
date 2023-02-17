import { AxiosError } from "axios";
import api from "../api";

export const createVideo = async (credentials: FormData) => {
  try {
    const { data } = await api.post("/video/upload", credentials);
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};
