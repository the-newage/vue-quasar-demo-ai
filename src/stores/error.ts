import { defineStore } from 'pinia';

export const useErrorStore = defineStore('error', {
  state: () => ({
    message: null as string | null,
    show: false,
  }),
  actions: {
    setError(message: string) {
      this.message = message;
      this.show = true;
    },
    clearError() {
      this.message = null;
      this.show = false;
    },
  },
});
