import { get as getStore } from "svelte/store";
import { toast as _toast } from "$lib/stores";
import { ErrorCode, type ApiError } from "$lib/services";

export const commonErrorHandler = (err: ApiError, object = "object", doNotHandle?: ErrorCode[]) => {
	console.error(err);

	const toast = getStore(_toast);

	switch (err.code) {
		case ErrorCode.BAD_REQUEST:
			if (doNotHandle && doNotHandle.includes(ErrorCode.BAD_REQUEST)) return;
			toast.show("error", `Invalid ${object} provided`)
		break;
		case ErrorCode.NOT_FOUND:
			if (doNotHandle && doNotHandle.includes(ErrorCode.NOT_FOUND)) return;
			toast.show("error", `Could not find target ${object}`);
		break;
		case ErrorCode.FORBIDDEN:
			if (doNotHandle && doNotHandle.includes(ErrorCode.FORBIDDEN)) return;
			toast.show("error", `You do not have authority to perform this action`);
		break;
		case ErrorCode.INTERNAL_SERVER_ERROR:
			if (doNotHandle && doNotHandle.includes(ErrorCode.INTERNAL_SERVER_ERROR)) return;
			toast.show("error", `Oops, something went wrong. Please try again.`);
		break;
	}
}