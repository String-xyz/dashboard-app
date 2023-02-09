import type { PageLoad } from './$types';

export const load = (({ params }) => {
	try {
		const resetToken = decodeURIComponent(params.slug);
		return { resetToken };
	} catch (e) {
		return { resetToken: "" };
	}
}) satisfies PageLoad;
