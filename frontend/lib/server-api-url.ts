export function getServerApiUrl() {
  return (
    process.env.BACKEND_URL_INTERNAL ??
    process.env.API_URL_INTERNAL ??
    (process.env.NODE_ENV === "production"
      ? "http://backend:3001"
      : process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001")
  );
}
