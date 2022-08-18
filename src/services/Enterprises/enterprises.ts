import api from "../api";

export const getEnterprises = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      api
        .get("/enterprises")
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          resolve(error.message);
        });
    }, 0);
  });

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
