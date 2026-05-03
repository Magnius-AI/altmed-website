import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { AdminToast } from "@/components/admin/AdminToast";
import { getStripeSettingsSummary } from "@/lib/api";
import { updateStripeSettingsAction } from "../actions";

type Props = {
  searchParams?: {
    saved?: string;
  };
};

function noticeMessage(saved?: string) {
  if (saved === "settings") {
    return "Payment settings saved successfully.";
  }

  return null;
}

export default async function PaymentSettingsPage({ searchParams }: Props) {
  const settings = await getStripeSettingsSummary();

  return (
    <div className="admin-card p-5">
      <AdminToast message={noticeMessage(searchParams?.saved)} />
      <div className="admin-label">Stripe Configuration</div>
      <h2 className="mt-2 text-2xl font-semibold text-neutral-900">Payment settings</h2>
      <p className="mt-1 max-w-3xl text-sm leading-6 text-neutral-600">
        Secret keys are encrypted before storage. Saved secrets display only their last four characters.
      </p>
      <form action={updateStripeSettingsAction} className="mt-5 grid max-w-3xl gap-4">
        <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
          <input type="checkbox" name="isLiveMode" defaultChecked={settings.isLiveMode} />
          Live mode
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-neutral-700">Publishable Key</span>
          <input name="stripePublishableKey" defaultValue={settings.stripePublishableKey} className="input" placeholder="pk_test_..." />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-neutral-700">
            Secret Key {settings.stripeSecretKeyLast4 ? `(saved ending ${settings.stripeSecretKeyLast4})` : ""}
          </span>
          <input name="stripeSecretKey" type="password" className="input" placeholder="Leave blank to keep saved key" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-neutral-700">
            Webhook Secret {settings.stripeWebhookSecretLast4 ? `(saved ending ${settings.stripeWebhookSecretLast4})` : ""}
          </span>
          <input name="stripeWebhookSecret" type="password" className="input" placeholder="whsec_..." />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-neutral-700">Webhook Endpoint URL</span>
          <input
            name="stripeWebhookEndpointUrl"
            type="url"
            defaultValue={settings.stripeWebhookEndpointUrl}
            className="input"
            placeholder="https://altmedfirst.com/api/webhooks/stripe"
          />
        </label>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-neutral-700">
          Required Stripe webhook events: checkout.session.completed, payment_intent.payment_failed, charge.refunded.
        </div>
        <AdminSubmitButton className="btn btn-primary w-fit" pendingLabel="Saving settings...">
          Save settings
        </AdminSubmitButton>
      </form>
    </div>
  );
}
