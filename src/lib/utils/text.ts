export const copyText = async (text?: string) => {
	if (!text) return;

	console.debug("Copied to clipboard: " + text);
	await navigator.clipboard.writeText(text);
}

export const openLink = (link: string) => {
	window.open(link, '_blank', 'noreferrer');
}