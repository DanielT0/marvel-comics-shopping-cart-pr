import { toast, ToastPosition } from "react-toastify";

const defaultToastProps = {
  position: "top-right" as ToastPosition,
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  progress: undefined,
  theme: "dark",
};

export function showErrorToast(message: string) {
  toast.error(message, defaultToastProps);
}

export function showSuccessToast(message: string) {
  toast.success(message, defaultToastProps);
}

export function showInfoToast(message: string) {
  toast.success(message, defaultToastProps);
}
