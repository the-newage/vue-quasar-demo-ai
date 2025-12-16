import { useQuasar } from 'quasar';

export function useDialog() {
  const $q = useQuasar();

  const showConfirmation = (message:string) => {
    return new Promise((resolve, reject) => {
      $q.dialog({
        title: 'Confirm',
        message,
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          resolve(true);
        })
        .onCancel(() => {
          reject(new Error('User cancelled'));
        });
    });
  };

  return {
    showConfirmation,
  };
}
