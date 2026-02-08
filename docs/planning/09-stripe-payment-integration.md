# Stripe Payment Integration Guide
**For: AltMed Medical Center Marketing Website**
**Date:** 2026-02-02

---

## Overview

Integrate Stripe payment processing into the AltMed website for:
- One-time service payments (walk-in patients)
- Invoice payments (corporate clients)
- Subscription billing (corporate accounts)

---

## Prerequisites

### 1. Stripe Account Setup
1. Create Stripe account at https://stripe.com
2. Complete business verification:
   - Business name: AltMed Medical Center
   - Tax ID (EIN)
   - Bank account for deposits
3. Enable test mode for development
4. Get API keys (test + production)

### 2. Required Stripe Products

Create these products in Stripe Dashboard:

**Services (One-time payments):**
- DOT Physical - $100
- Drug Test (5-panel) - $50
- Respirator Fit Test - $75
- Respirator Medical Evaluation - $85
- Primary Care Visit - $150
- Weight Loss Consultation - $200

**Subscriptions (Corporate accounts):**
- Basic Compliance Package - $299/month
- Premium Fleet Package - $599/month
- Enterprise - Custom pricing

---

## Installation

```bash
cd /Users/madhulekh/.openclaw/workspace/altmed-website
npm install @stripe/stripe-js @stripe/react-stripe-js
```

---

## Implementation

### 1. Environment Variables

Create `.env.local`:

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_STRIPE_SECRET_KEY=sk_test_...  # Server-side only
```

### 2. Stripe Provider Setup

**File: `/src/main.jsx`**

```jsx
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
);
```

### 3. Payment Components

**File: `/src/components/payment/CheckoutForm.jsx`**

```jsx
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, Lock } from 'lucide-react';

export default function CheckoutForm({ amount, description, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create payment intent on backend
    const { clientSecret } = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, description }),
    }).then(res => res.json());

    // Confirm payment
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    setLoading(false);

    if (stripeError) {
      setError(stripeError.message);
    } else if (paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-gray-700">
            Secure Payment via Stripe
          </span>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Information
          </label>
          <div className="border border-gray-300 rounded-lg p-3">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': { color: '#aab7c4' },
                  },
                },
              }}
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>Processing...</>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Pay ${(amount / 100).toFixed(2)}
            </>
          )}
        </button>

        <p className="mt-4 text-xs text-gray-500 text-center">
          Your payment information is encrypted and secure. We never store your card details.
        </p>
      </div>
    </form>
  );
}
```

### 4. Payment Pages

**File: `/src/pages/Payment.jsx`**

```jsx
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CheckoutForm from '../components/payment/CheckoutForm';
import { CheckCircle } from 'lucide-react';

export default function Payment() {
  const [searchParams] = useSearchParams();
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  // Get service from URL params
  const service = searchParams.get('service');
  const amount = searchParams.get('amount');
  const invoiceId = searchParams.get('invoice');

  const handleSuccess = (paymentIntent) => {
    console.log('Payment successful:', paymentIntent);
    setPaymentComplete(true);
    // TODO: Send receipt email, update DriverHub if applicable
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your payment. A receipt has been sent to your email.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {invoiceId ? 'Pay Invoice' : 'Pay for Service'}
          </h1>
          
          {service && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Service:</p>
              <p className="font-medium text-gray-900">{service}</p>
              <p className="text-2xl font-bold text-primary-600 mt-2">
                ${(Number(amount) / 100).toFixed(2)}
              </p>
            </div>
          )}

          {invoiceId && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Invoice #:</p>
              <p className="font-medium text-gray-900">{invoiceId}</p>
              <p className="text-2xl font-bold text-primary-600 mt-2">
                ${(Number(amount) / 100).toFixed(2)}
              </p>
            </div>
          )}
        </div>

        <CheckoutForm
          amount={Number(amount)}
          description={service || `Invoice ${invoiceId}`}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}
```

### 5. Backend API (Express)

**File: `/server/routes/payment.js`** (create new backend)

```javascript
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, description } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in cents
      currency: 'usd',
      description,
      metadata: {
        clinic: 'AltMed Medical Center',
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create subscription for corporate clients
router.post('/create-subscription', async (req, res) => {
  try {
    const { customerId, priceId } = req.body;

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    res.json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook for Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // TODO: Update DriverHub, send receipt email
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      break;
    
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      // TODO: Update corporate account billing status
      console.log('Invoice paid:', invoice.id);
      break;
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;
```

---

## Pricing Page Integration

Update `/src/pages/Pricing.jsx` with "Pay Now" buttons:

```jsx
<a
  href={`/payment?service=DOT Physical&amount=10000`}
  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
>
  Pay Now - $100
</a>
```

---

## Corporate Invoice Flow

1. Clinic staff creates invoice in DriverHub
2. Invoice email sent with payment link:
   ```
   https://altmedfirst.com/payment?invoice=INV-2026-001&amount=29900
   ```
3. Corporate admin clicks link, pays via Stripe
4. Webhook updates DriverHub invoice status to "Paid"

---

## Security Checklist

- [ ] Use HTTPS only (enforce in production)
- [ ] Never expose secret keys in frontend
- [ ] Validate amounts on backend (prevent tampering)
- [ ] Enable Stripe Radar (fraud detection)
- [ ] Set up webhook signature verification
- [ ] Store sensitive data in environment variables

---

## Testing

### Test Cards (Stripe Test Mode)

- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **3D Secure:** 4000 0027 6000 3184

Use any future expiration date and any 3-digit CVC.

---

## Going Live

1. Complete Stripe account verification
2. Replace test API keys with live keys
3. Update webhook endpoint with production URL
4. Test end-to-end with small real transaction
5. Enable production mode

---

## Future Enhancements

- [ ] Save payment methods for corporate clients (recurring)
- [ ] Auto-generate receipts with clinic logo
- [ ] Integrate with Zoho Books for accounting
- [ ] Support Apple Pay / Google Pay
- [ ] Payment plans for weight loss programs
