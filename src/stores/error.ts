import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useErrorStore = defineStore('error', () => {
  const message = ref<string | null>(null);
  const show = ref(false);

  function setError(newMessage: string) {
    message.value = newMessage;
    show.value = true;
  }

  function clearError() {
    message.value = null;
    show.value = false;
  }

  return {
    message,
    show,
    setError,
    clearError,
  };
});
