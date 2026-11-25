import { reactive } from 'vue';

export const toastState = reactive({
  visible: false,
  message: '',
  type: 'success',
});

let toastTimer = null;

export function showToast(message, type = 'success', duration = 3000) {
  toastState.message = message;
  toastState.type = type;
  toastState.visible = true;

  if (toastTimer) {
    clearTimeout(toastTimer);
  }

  toastTimer = setTimeout(() => {
    toastState.visible = false;
  }, duration);
}

export function hideToast() {
  toastState.visible = false;
  if (toastTimer) {
    clearTimeout(toastTimer);
    toastTimer = null;
  }
}

