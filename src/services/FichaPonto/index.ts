import { AxiosError } from "axios";
import api from "services/api";

export const getPdfConfirmed = async () => {
  try {
    const { data } = await api.get("/pdfs/getAllConfirmeds");
    return data;
  } catch (err) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};
