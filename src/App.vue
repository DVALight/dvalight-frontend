<template>
  <div :style="styleObject">
    <NavMenu></NavMenu>
    <div class="content">
      <div class="controls">
        <div class="block">
          <p>color</p>
          <color-picker
            :disabled="isDisabledRCP"
            :h="h"
            @input="onColorInput"
            @select="onColorSelect"
          />
        </div>
        <div class="block modes">
          <p>timer</p>
          <button
            v-for="mode in MODES"
            :key="mode"
            class="mode"
            :class="{ active: mode === selectedMode }"
            :disabled="!isCheckedPwr"
            @click="selectMode(mode)"
          >
            {{ mode }}
          </button>
        </div>
        <div class="block">
          <p>lights controls</p>
          <input @change="onPower()" v-model="isCheckedPwr" type="checkbox" />
        </div>
      </div>

      <div class="logoImage">
        <h2>D.Va Lights</h2>
        <p>A powerful lighting system</p>
        <p>for your home.</p>
        <img src="/images/dva.jfif" alt="" />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import NavMenu from "./components/NavMenu.vue";
import Footer from "./components/Footer.vue";
import { ref, computed, onMounted } from "vue";
import { useDeviceStore } from "./stores/device";
const deviceStore = useDeviceStore();

const MODES = ["1H", "4H", "2H", "8H"];
const selectedMode = ref(null);

const isCheckedPwr = ref();
const h = ref(0), s = 1, l = 0.5;

const device = computed(() => {
  return deviceStore.getDevice;
});

//let lState = ref(0);
let color = ref("rgb(255,0,0)");
let isDisabledRCP = ref(true);

const styleObject = computed(() => ({
  "--active-color": color.value,
  "--lights-state": device.value ? device.value.state : false,
}));

onMounted(() => {
  deviceStore.fetchDevice(1).then(() => console.log("fetch device"));
});

function onPower() {
  // code to turn on/off
  deviceStore.setDeviceState(isCheckedPwr.value ? true : false).then(() => {
    //lState.value = isCheckedPwr.value ? 1 : 0;
    console.log(device.value.state);
    isDisabledRCP.value = !device.value.state;
    selectedMode.value = null;
  });
}

function onColorSelect(value) {
  const rgb = HSLToRGB(h.value, s, l);
  color.value = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

  // code to set the color
}

const selectMode = (mode) => {
  selectedMode.value = mode;

  // code to set the timer
};

function onColorInput(value) {
  h.value = value;
}

const HSLToRGB = (h, s, l) => {
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [
    Math.round(255 * f(0)),
    Math.round(255 * f(8)),
    Math.round(255 * f(4)),
  ];
};
</script>
