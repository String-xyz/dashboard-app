import { writable, type Writable, get as getStore } from "svelte/store";

type toastType = "success" | "error";
type ToastOptions = {
	type: toastType;
	message: string;
	title?: string;
	_display?: () => void;
	show: (type: toastType, message: string) => void;
};

const _showToast = (type: toastType = "error", message: string) => {
	const _toast = getStore(toast);
	toast.set({ ..._toast, type, message });
	if (_toast._display) _toast._display();
};

export const toast: Writable<ToastOptions> = writable({
	type: "error",
	message: "error",
	show: _showToast
});
