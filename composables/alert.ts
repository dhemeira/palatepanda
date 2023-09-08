export const useAlert = () => {
  /** Controls the visibility of the alert */
  const showAlert = useState('showAlert', () => false);
  /** The type of the alert (success, error, warning, info), on undefined the type is error */
  const alertType = useState<undefined | 'success' | 'error' | 'warning' | 'info'>(
    'alertType',
    () => undefined
  );
  /** The message to show in the alert */
  const alertMessage = useState('alertMessage', () => '');

  /**
   * Shows an alert with the given message, styled based on the type
   * @param message The message to show in the alert
   * @param type The type of the alert (success, error, warning, info), on undefined the type is error
   */
  function openAlert(message: string, type?: 'success' | 'error' | 'warning' | 'info' | undefined) {
    alertMessage.value = message;
    alertType.value = type;
    showAlert.value = true;
  }

  function resetAlert() {
    alertMessage.value = '';
    alertType.value = undefined;
    showAlert.value = false;
  }

  return { showAlert, alertType, alertMessage, openAlert, resetAlert };
};
