const isProduction = import.meta.env.PROD;

export const BASE_URL: string = isProduction
  ? import.meta.env.VITE_PROD_URL
  : import.meta.env.VITE_DEV_URL;
