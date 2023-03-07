import { writable, type Writable, get as getStore } from "svelte/store";

type toastType = "success" | "error";
type ToastOptions = {
	type: toastType;
	message: string;
	title?: string;
	_show: () => boolean;
	show: (type: toastType, message: string, title?: string) => void;
};

const _showToast = (type: toastType = "error", message: string, title?: string) => {
	const _toast = getStore(toast);
	toast.set({ ..._toast, type, message, title });
	_toast._show();
};

export const toast: Writable<ToastOptions> = writable({
	type: "error",
	message: "error",
	_show: () => {
		return true;
	},
	show: _showToast
});
