import { AxiosError } from "axios";
import api from "../api";
import { videoType, videoTypeEdit } from "./type";

export const createVideo = async (credentials: FormData) => {
  try {
    const { data } = await api.post("/video/upload", credentials);
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const updateVideo = async (credentials: videoTypeEdit) => {
  try {
    const { data } = await api.post("/video/update", credentials);
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const getVideos = async (): Promise<videoType[] | undefined> => {
  try {
    const { data } = await api.get("/video/getAll");
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};
