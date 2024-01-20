<template>
  <div class="nav">
    <button v-on:click="onLogin"></button>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
const userStore = useUserStore();

function onLogin() {
  userStore.login("admin@DVALight.com", "admin").then(() => {});
}
</script>
