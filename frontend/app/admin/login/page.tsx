import { LoginSubmitButton } from "./LoginSubmitButton";
import { loginAdminAction } from "./actions";

type AdminLoginPageProps = {
  searchParams?: {
    email?: string;
    error?: string;
  };
};

const errorMessages: Record<string, string> = {
  invalid: "Unable to sign in. Check the admin credentials and try again.",
  missing: "Enter both email and password to continue.",
  offline: "The admin API is unavailable right now. Start the backend and try again.",
  session: "Login succeeded but the session could not be created. Please try again."
};

export default function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const email = searchParams?.email ?? "";
  const error = searchParams?.error ? errorMessages[searchParams.error] ?? errorMessages.invalid : "";

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f4f8fa_0%,#eef6f7_48%,#f8fbfb_100%)] px-6 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        {/* TYPOGRAPHY FIX: Login hero heading was too large on narrow widths; compact scale and line-height prevent overlap. */}
        <section className="relative rounded-lg bg-[linear-gradient(145deg,#12344d_0%,#0f3044_55%,#1a5f3f_100%)] p-6 text-white md:p-10">
          <div className="inline-flex rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.05em] text-white/80">
            Altmed Admin
          </div>
          <h1 className="mt-5 max-w-2xl text-[2rem] font-semibold leading-[1.2] text-white md:text-[2.5rem]">
            Manage content with the same calm, clear UI as the public site.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
            Sign in to update blog posts, FAQs, service pages, announcements, providers, and
            SEO-critical content from one publishing console.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              "Blog and announcement workflows",
              "Service-page and FAQ editing",
              "Provider, SEO, and inbox management"
            ].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/10 p-4 text-sm leading-6 text-white/80">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="admin-card w-full max-w-xl justify-self-center p-6 md:p-8">
          <div className="admin-label">Secure Sign In</div>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-neutral-900">Welcome back</h2>
          <p className="mt-3 text-sm leading-7 text-neutral-600">
            Use the seeded administrator account from the backend setup, then continue into the
            Altmed publishing dashboard.
          </p>
          <form action={loginAdminAction} className="mt-8 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-neutral-800">Email</span>
              <input
                className="input min-h-[42px] bg-[var(--color-bg-gray)]"
                placeholder="Email"
                type="email"
                name="email"
                defaultValue={email}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-neutral-800">Password</span>
              <input
                className="input min-h-[42px] bg-[var(--color-bg-gray)]"
                placeholder="Password"
                type="password"
                name="password"
              />
            </label>
            {error ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}
            <div className="pt-2">
              <LoginSubmitButton />
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
