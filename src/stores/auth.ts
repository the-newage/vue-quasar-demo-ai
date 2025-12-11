import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const user = ref<{ name: string; email: string } | null>(null);

  function login(email: string) {
    // Mock authentication - replace with actual auth logic
    isAuthenticated.value = true;
    user.value = { name: 'Demo User', email };
  }

  function logout() {
    isAuthenticated.value = false;
    user.value = null;
  }

  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
});