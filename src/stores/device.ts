import { defineStore } from "pinia";
import { Device } from "../api/device";
import { API } from "../api";
import { AxiosResponse } from "axios";

interface DeviceState {
  device: Device | null;
}

export const useDeviceStore = defineStore("device", {
  state: (): DeviceState => {
    return {
      device: null
    }
  },

  getters: {
    device: (state: DeviceState): Device | null => state.device
  },

  actions: {
    async fetchDevice(id: number) {
      try {
        const res = await API.get<Device>(`/device/${id}`);
        this.device = res.data;
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    },

    async updateDevice() {
      if (!this.device) return;
      try {
        const res = await API.put<
          Device,
          AxiosResponse<Device>
        >(`/device/${this.device.id}`, this.device);
        this.device = res.data;
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    }
  }
});
