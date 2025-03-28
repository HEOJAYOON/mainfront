import { defineNuxtPlugin } from '#app';
import { useAuthStore } from '~/store/auth';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const authStore = useAuthStore();
    authStore.loadUserFromStorage();
  }
});