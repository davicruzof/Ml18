import { AxiosError } from "axios";
import api from "../api";
import { videoType, videoTypeEdit } from "./type";

export const createVideo = async (dataSend: any) => {
  try {
    const { credentials, setProgress } = dataSend;
    const data = await api.post("/video/upload", credentials, {
      onUploadProgress: (progressEvent) => {
        let progress: number = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        setProgress(progress);
      },
    });
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const sendVideoToEmployee = async (dataSend: any) => {
  try {
    const { credentials, setProgress } = dataSend;
    const { data } = await api.post("/video/sendToEmployee", credentials, {
      onUploadProgress: (progressEvent) => {
        let progress: number = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        setProgress(progress);
      },
    });
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const updateVideo = async (credentials: videoTypeEdit) => {
  try {
    const { data } = await api.put("/video/update", credentials);
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

export const deleteVideo = async (id_video: number) => {
  try {
    const { data } = await api.delete("/video/delete", {
      data: {
        id_video,
      },
    });
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};
