// Vite will error if any env var is missing
const config = {
	ENV: import.meta.env.VITE_ENV,
	IS_SANDBOX: import.meta.env.VITE_ENV === "dev",
	API_URL: import.meta.env.VITE_API_URL,
	PROD_DASH_URL: import.meta.env.VITE_PROD_DASH_URL,
	SBOX_DASH_URL: import.meta.env.VITE_SBOX_DASH_URL,
	DOCS_URL: import.meta.env.VITE_DOCS_URL,
	KYB_URL: import.meta.env.VITE_KYB_URL,
} as const;

export default config;