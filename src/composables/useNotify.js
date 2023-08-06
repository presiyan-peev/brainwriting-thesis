import { Notify } from "quasar";

export function useNotify() {
  function notifyPositive(message, options = {}) {
    alert(message);
    return;
    Notify.create({
      message,
      color: "green-4",
      textColor: "white",
      icon: "done",
      ...options,
    });
  }

  function notifyNegative(message, options = {}) {
    alert(message);
    return;
    Notify.create({
      message,
      color: "red-4",
      textColor: "white",
      icon: "error",
      ...options,
    });
  }

  return {
    notifyPositive,
    notifyNegative,
  };
}
