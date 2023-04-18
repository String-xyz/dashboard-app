import { get as getStore } from "svelte/store";
import { toast as _toast } from "$lib/stores";
import { ErrorCode, type ApiError } from "$lib/services";
import { capitalize } from "$lib/utils";

export const commonErrorHandler = (err: ApiError, object = "object") => {
	console.error(err);

	const toast = getStore(_toast);

	switch (err.code) {
		case ErrorCode.BAD_REQUEST:
			toast.show("error", `Invalid ${object} provided`)
		break;
		case ErrorCode.NOT_FOUND:
			toast.show("error", `Could not find target ${object}`);
		break;
		case ErrorCode.FORBIDDEN:
			toast.show("error", `You do not have authority to perform this action`);
		break;
		case ErrorCode.CONFLICT:
			toast.show("error", `${capitalize(object)} already exists`);
		break;
		case ErrorCode.INTERNAL_SERVER_ERROR:
			toast.show("error", `Oops, something went wrong. Please try again.`);
		break;
	}
}