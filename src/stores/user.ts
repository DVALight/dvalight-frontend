import { defineStore } from "pinia";
import { API, APIError, isAPIError } from "../api";
import { LoginRequest, LoginResponse, isLoginResponse } from "../api/auth";
import { AxiosResponse, isAxiosError } from "axios";
import { User } from "../api/user";

interface UserState {
  error: APIError | null
  user: User | null
}

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      error: null,
      user: null
    };
  },

  getters: {},

  actions: {
    async login(email: string, password: string) {
      try {
        const res = await API.post<
          LoginRequest,
          AxiosResponse<LoginResponse | APIError>
        >("/auth/login", { email, password });

        if (isLoginResponse(res.data)) {
          this.user = res.data.user;
          console.log(res.data.tokens);
        }
      } catch (e) {
        if (isAxiosError(e) && isAPIError(e.response?.data)) {
          this.error = e.response?.data;
          console.log(this.error);
        }
      }
    },
  },
});
