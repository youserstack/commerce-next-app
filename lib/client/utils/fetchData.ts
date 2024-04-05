import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production" ? process.env.NEXT_PRO_ENV : process.env.NEXT_DEV_ENV;

export const getData = async (url: string, query?: any, token?: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/api/${url}`,
    headers: { Authorization: `Bearer ${token}` },
    params: query,
  });
  return response;
};

export const postData = async (url: string, payload: any, token?: string | any) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/api/${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: payload,
  });
  return response;
};

export const putData = async (url: string, payload: any, token: string) => {
  const response = await axios({
    method: "put",
    url: `${BASE_URL}/api/${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: payload,
  });
  return response;
};

export const patchData = async (url: string, payload: any, token: string) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/api/${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: payload,
  });
  return response;
};

export const deleteData = async (url: string, payload: any, token: string) => {
  const response = await axios({
    method: "delete",
    url: `${BASE_URL}/api/${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: payload,
  });
  return response;
};
