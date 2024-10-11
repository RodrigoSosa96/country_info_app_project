import axios, { type Method } from "axios";

const axiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function makeRequest<TReturn, TData = any>(
  method: Method,
  url: string,
  data?: TData,
  params?: Record<string, string>,
): Promise<TReturn> {
  try {
    const response = await axiosInstance.request({
      method,
      url,
      data,
      params,
    });
    return response.data as TReturn;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
