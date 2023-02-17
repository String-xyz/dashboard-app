// Jan 1, 1970
export const defaultDateOptions = { year: 'numeric', month: 'short', day: 'numeric' } as Intl.DateTimeFormatOptions;

// 01/01/70
export const dateWithSlashes = { year: '2-digit', month: '2-digit', day: '2-digit' } as Intl.DateTimeFormatOptions;

export const formatDate = (timestamp: string, dateOptions = defaultDateOptions) => {
	return new Date(timestamp).toLocaleDateString('en-US', dateOptions);
}