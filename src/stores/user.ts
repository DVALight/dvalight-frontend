import { defineStore } from "pinia";

interface UserState {}

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {};
  },

  getters: {},

  actions: {},
});
