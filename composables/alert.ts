export const useAlert = () => {
  /** Controls the visibility of the alert */
  const showAlert = ref(false);
  /** The type of the alert (success, error, refresh, info), on undefined the type is error */
  const alertType = ref<AlertType>(undefined);
  /** The message to show in the alert */
  const alertMessage = ref('');

  /**
   * Shows an alert with the given message, styled based on the type
   * @param message The message to show in the alert
   * @param type The type of the alert (success, error, refresh, info), on undefined the type is error
   */
  function openAlert(message: string, type?: AlertType) {
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
