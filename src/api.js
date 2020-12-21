export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api-bazify.basile.vernouillet.dev"
    : "http://localhost:5000";
