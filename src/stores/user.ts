import { defineStore } from "pinia";
import { API } from "../api";
import { LoginRequest, LoginResponse } from "../api/login";
import { AxiosResponse } from "axios";

interface UserState {}

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {};
  },

  getters: {},

  actions: {
    async login(email: string, password: string) {
      const res = await API.post<LoginRequest,AxiosResponse<LoginResponse>>("/login", { email, password });
      console.log(res);
    }
  },
});
