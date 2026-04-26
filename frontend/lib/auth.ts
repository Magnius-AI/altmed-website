import { cookies } from "next/headers";

export async function isAuthenticated() {
  return Boolean(
    cookies().get("altmed_admin_access_token")?.value ||
      cookies().get("altmed_admin_refresh_token")?.value
  );
}
