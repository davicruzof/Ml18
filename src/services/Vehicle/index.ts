import { AxiosError } from "axios";
import api from "../api";

export const createVehicle = async (credentials: FormData) => {
  try {
    const { data } = await api.post("/vehicle/create", credentials);
    return data;
  } catch (err) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};
