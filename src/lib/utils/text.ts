export const copyText = async (text?: string) => {
	if (!text) return;

	console.debug("Copied to clipboard: " + text);
	await navigator.clipboard.writeText(text);
}

export const capitalize = (text: string) => {
	if (!text) return text;
	return text.charAt(0).toUpperCase() + text.slice(1);
}