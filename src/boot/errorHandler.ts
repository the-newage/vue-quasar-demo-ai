import { boot } from 'quasar/wrappers';
import { useErrorStore } from '@/stores/error';

export default boot(({ app }) => {
  app.config.errorHandler = (err, instance, info) => {
    // In a real app, you would log this error to a service like Sentry
    console.error('Global Error:', err);
    console.error('Vue instance:', instance);
    console.error('Error info:', info);

    const errorStore = useErrorStore();
    const message =
      err instanceof Error ? err.message : 'An unknown error occurred.';
    errorStore.setError(`A component failed to render. Details: ${message}`);
  };
});
