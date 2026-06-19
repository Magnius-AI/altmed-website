const LOCAL_ORIGIN = "http://localhost:3000";
export const PRODUCTION_ORIGIN = "https://altmedfirst.com";

type HeaderReader = {
  get(name: string): string | null;
};

function stripLeadingWww(hostname: string) {
  return hostname.replace(/^www\./i, "");
}

function getDefaultOrigin() {
  return process.env.NODE_ENV === "production" ? PRODUCTION_ORIGIN : LOCAL_ORIGIN;
}

function normalizeOrigin(value?: string | null) {
  const fallback = getDefaultOrigin();

  if (!value) {
    return fallback;
  }

  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    url.hostname = stripLeadingWww(url.hostname.toLowerCase());

    if (process.env.NODE_ENV === "production" && isLocalHost(url.host)) {
      return PRODUCTION_ORIGIN;
    }

    return url.origin;
  } catch {
    return fallback;
  }
}

export function isLocalHost(host: string) {
  const hostname = host.split(":")[0]?.toLowerCase();
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0" || hostname === "[::1]";
}

export function getConfiguredSiteOrigin() {
  return normalizeOrigin(
    process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.NEXT_PUBLIC_APP_URL ??
      process.env.SITE_URL ??
      process.env.APP_URL ??
      process.env.FRONTEND_URL ??
      process.env.VERCEL_URL
  );
}

export function isProductionHost(host: string) {
  return getCanonicalHost(host).split(":")[0] === new URL(PRODUCTION_ORIGIN).hostname;
}

export function shouldNoIndexHost(host: string) {
  return !isLocalHost(host) && !isProductionHost(host);
}

export function getOriginFromHeaders(headersList: HeaderReader) {
  const forwardedHost = headersList.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || headersList.get("host")?.split(",")[0]?.trim();

  if (!host) {
    return getConfiguredSiteOrigin();
  }

  const protocol =
    headersList.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
    (isLocalHost(host) ? "http" : "https");
  const [hostname, port] = host.toLowerCase().split(":");
  const canonicalHost = `${stripLeadingWww(hostname)}${port ? `:${port}` : ""}`;

  return `${protocol}://${canonicalHost}`;
}

export function getCanonicalHost(host: string) {
  const [hostname, port] = host.toLowerCase().split(":");
  return `${stripLeadingWww(hostname)}${port ? `:${port}` : ""}`;
}

export function getAbsoluteUrl(path: string, origin = getConfiguredSiteOrigin()) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${origin}${path === "/" ? "" : path}`;
}
