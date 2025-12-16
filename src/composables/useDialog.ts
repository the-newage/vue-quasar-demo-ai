import { useQuasar } from 'quasar';

export function useDialog() {
  const $q = useQuasar();

  const showConfirmation = (message: string, onOk: () => void) => {
    $q.dialog({
      title: 'Confirm',
      message,
      cancel: true,
      persistent: true,
    }).onOk(onOk);
  };

  return {
    showConfirmation,
  };
}
