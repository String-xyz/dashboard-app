const ENV = import.meta.env.VITE_ENV;

export const isSandbox = ENV === "dev";