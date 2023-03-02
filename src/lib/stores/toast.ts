import { writable, type Writable, get as getStore } from "svelte/store";

type toastType = "success" | "error";
type ToastOptions = {
	type: toastType;
	message: string;
	title?: string;
	_show: () => void;
	show: (type: toastType, message: string, title?: string) => void;
};

const _showToast = (type: toastType = "error", message: string, title?: string) => {
	const _toast = getStore(toast);
	_toast._show = () => {
		console.debug("toast show");
	};
	toast.set({ ..._toast, type, message, title });
	_toast._show();
};

export const toast: Writable<ToastOptions> = writable({
	type: "error",
	message: "error",
	_show: () => {
		console.debug("toast show");
	},
	show: _showToast
});
