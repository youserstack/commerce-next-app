import axios from "axios";
const baseUrl =
  process.env.NODE_ENV === "production" ? process.env.BASE_URL : process.env.NEXT_PUBLIC_ENV;
// console.log({
//   NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
//   BASE_URL: process.env.BASE_URL,
// });
export const getData = async (url: string, query?: any, token?: string) => {
  const response = await axios({
    method: "get",
    url: `${baseUrl}/api/${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: query,
    // params: query ? query : null,
  });
  return response;
};
export const postData = async (url: string, payload: any, token?: string | any) => {
  const response = await axios({
    method: "post",
    url: `${baseUrl}/api/${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
  return response;
};
export const putData = async (url: string, payload: any, token: string) => {
  const response = await axios({
    method: "put",
    url: `${baseUrl}/api/${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
  return response;
};
export const patchData = async (url: string, payload: any, token: string) => {
  const response = await axios({
    method: "patch",
    url: `${baseUrl}/api/${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
  return response;
};
export const deleteData = async (url: string, payload: any, token: string) => {
  const response = await axios({
    method: "delete",
    url: `${baseUrl}/api/${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
  return response;
};
