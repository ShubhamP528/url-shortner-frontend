export const NODE_END_POINT =
  import.meta.env === "production"
    ? "https://url-shortner-backend-sigma.vercel.app/api"
    : "http://localhost:8900/api";
