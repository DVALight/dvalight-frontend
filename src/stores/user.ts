import { defineStore } from "pinia";
import { API, APIError, isAPIError } from "../api";
import { LoginRequest, LoginResponse } from "../api/login";
import { AxiosResponse, isAxiosError } from "axios";

interface UserState {
  error: APIError | null
}

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      error: null
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
      } catch (e) {
        if (isAxiosError(e) && isAPIError(e.response?.data)) {
          this.$state.error = e.response?.data;
          console.log(this.$state.error);
        }
      }
    },
  },
});
