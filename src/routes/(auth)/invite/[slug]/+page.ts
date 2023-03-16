import type { PageLoad } from "./$types";

export const load = ((data) => {
	const token = data.url.searchParams.get("token");

	return {
		id: data.params.slug,
		token
	};
}) satisfies PageLoad;
