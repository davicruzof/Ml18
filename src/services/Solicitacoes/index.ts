import {AxiosError} from 'axios';
import api from 'services/api';

import {
  DptTypes,
  TypeRequest,
  TypeSolicitations,
  listRequestResponse,
} from './types';

export const getDepartments = async (): Promise<DptTypes[]> => {
  try {
    const {data} = await api.get('/departaments/list');
    return data;
  } catch (err) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const {error} = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const getTypeSolicitations = async (
  id: string,
): Promise<TypeSolicitations[]> => {
  try {
    const {data} = await api.post('/departaments/list_area_departamento', {
      id_area: id,
    });
    return data;
  } catch (err) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const {error} = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const createRequest = async (credentials: TypeRequest) => {
  try {
    const {data} = await api.post('requests/create', credentials);
    return data;
  } catch (err) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const {error} = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const listRequests = async (
  status: string,
): Promise<listRequestResponse[]> => {
  try {
    const {data} = await api.post('requests/list', {status});
    return data;
  } catch (err) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const {error} = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};

export const listRequest = async (
  id: string,
): Promise<listRequestResponse[]> => {
  try {
    const {data} = await api.post('requests/getById', {id_solicitacao: id});
    return data;
  } catch (err) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const {error} = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};
