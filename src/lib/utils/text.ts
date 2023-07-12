export const copyText = async (text?: string) => {
	if (!text) return;

	console.debug("Copied to clipboard: " + text);
	await navigator.clipboard.writeText(text);
}

export const capitalize = (text: string) => {
	if (!text) return text;
	return text.charAt(0).toUpperCase() + text.slice(1);
}

export const formatAddr = (addr: string, rightDigits=4) => {
	if (!addr) return addr;
	return addr.slice(0, 6) + "..." + addr.slice(-rightDigits);
}