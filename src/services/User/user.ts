import api from "../api";
import { RegisterProps } from "./types";

export const createUser = async (credentials: RegisterProps) => {
  try {
    console.log(credentials);
    const { data } = await api.post("/user/create", {
      ...credentials,
      id_grupo: null,
    });
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
