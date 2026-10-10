export const siteBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.NODE_ENV === "production" ? "/Shereif-Portfolio" : "");

