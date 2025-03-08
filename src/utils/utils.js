export const NODE_END_POINT =
 process.env.NODE_ENV === "production"
    ? "https://url-shortner-backend-sigma.vercel.app/api"
    : "http://localhost:8900/api";
