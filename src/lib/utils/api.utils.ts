import { CustomMethod, SecureRequestProps } from "@/types/api.types";
import axios, { AxiosHeaders } from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { cookies } from "next/dist/client/components/headers";
import { AuthPages, Constants, PAGES } from "../constants";

axios.interceptors.request.use(
  async (config) => {
    let token = "";
    if (typeof window !== "undefined") {
      token = getCookie(Constants.token)?.toString() ?? "";
    } else {
      const cookieStore = cookies();
      token = cookieStore.get(Constants.token)?.value ?? "";
    }
    config.headers = {
      Authorization: `Bearer ${token ?? ""}`,
      ...config.headers,
    } as AxiosHeaders["headers"];
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = getCookie(Constants.token)?.toString() ?? "";
    if (
      // error?.response &&
      // error.response.status === 401
      !token &&
      !AuthPages.includes(window.location.pathname)
    ) {
      if (typeof window !== "undefined") {
        deleteCookie(Constants.token);
        window.location.href = `${PAGES.SIGNIN}?callbackUrl=${window.location.href}`;
      }
    }
    return Promise.reject(error);
  }
);

export const secureRequest = async ({
  url,
  method = "get",
  body = undefined,
  headers: requestHeader,
}: SecureRequestProps) => {
  const givenMethod = method.toLocaleLowerCase() as CustomMethod;

  const headers = {
    // "content-type": url.includes("admin/media/upload") ? "" : "application/json",
    ...requestHeader,
  };

  if (givenMethod === "get" || givenMethod === "delete") {
    //dont include body in GET request request will fail
    return axios[givenMethod](url, {
      params: {
        ...body,
      },
      headers,
    });
  }
  return axios[givenMethod](url, body, { headers });
};
