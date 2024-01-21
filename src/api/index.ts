import axios, { AxiosResponse } from "axios";
import { IAuthTokens, TokenRefreshRequest, applyAuthTokenInterceptor, getBrowserLocalStorage } from "axios-jwt";
import { Tokens } from "./auth";

export const API_BASE_URL = "http://localhost:4444";

export const API = axios.create({
  baseURL: API_BASE_URL,
});

export interface APIError {
  message: string;
  error: string;
  statusCode: number;
}

export function isAPIError(data: any): data is APIError {
  return ("message" in data && "error" in data && "statusCode" in data);
}

const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {
  const res = await axios.post<{}, AxiosResponse<Tokens>>(`${API_BASE_URL}/auth/refresh`, {}, {
    headers: {
      "Authorization": `Refresh ${refreshToken}`
    }
  });

  return {
    accessToken: res.data.accesseToken,
    refreshToken: res.data.refreshToken
  };
}

applyAuthTokenInterceptor(API, { requestRefresh });

const getStorage = getBrowserLocalStorage;
applyAuthTokenInterceptor(API, { requestRefresh, getStorage });
