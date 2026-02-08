import { Link } from 'react-router-dom';
import { CheckCircle, Phone, HelpCircle } from 'lucide-react';

const pricingCategories = [
  {
    title: 'DOT & Occupational Health',
    color: 'bg-green-50 border-green-200',
    services: [
      { name: 'DOT Physical (CDL Medical Exam)', price: '$85', note: 'Same-day certificate' },
      { name: 'DOT Physical + Drug Screen', price: '$130', note: 'Combo discount' },
      { name: 'Pre-Employment Drug Test (5-panel)', price: '$45', note: '' },
      { name: 'Pre-Employment Drug Test (10-panel)', price: '$55', note: '' },
      { name: 'Rapid Drug Test', price: '$35', note: 'Results in 15 min' },
      { name: 'Breath Alcohol Test (BAT)', price: '$35', note: 'DOT compliant' },
      { name: 'Pre-Employment Physical', price: '$75', note: '' },
      { name: 'Non-DOT Physical', price: '$65', note: '' },
    ],
  },
  {
    title: 'Weight Loss Programs',
    color: 'bg-blue-50 border-blue-200',
    services: [
      { name: 'Initial Consultation', price: '$150', note: 'Comprehensive evaluation' },
      { name: 'Semaglutide (Wegovy/Ozempic) - Monthly', price: '$350-450', note: 'Includes injections' },
      { name: 'Tirzepatide (Mounjaro) - Monthly', price: '$450-550', note: 'Includes injections' },
      { name: 'B12/Lipotropic Injection (single)', price: '$25', note: '' },
      { name: 'B12/Lipotropic Injections (4-pack)', price: '$80', note: 'Save $20' },
      { name: 'Phentermine Program (monthly)', price: '$99', note: 'Includes med + visit' },
      { name: 'Body Composition Scan', price: '$50', note: '' },
    ],
  },
  {
    title: 'Primary & Urgent Care',
    color: 'bg-orange-50 border-orange-200',
    services: [
      { name: 'Urgent Care Visit (self-pay)', price: '$125', note: '' },
      { name: 'Primary Care Visit (self-pay)', price: '$95', note: '' },
      { name: 'Follow-up Visit', price: '$75', note: '' },
      { name: 'Flu Shot', price: '$35', note: '' },
      { name: 'COVID Test (Rapid)', price: '$75', note: 'Results same day' },
      { name: 'Sports / School Physical', price: '$45', note: '' },
      { name: 'Immigration Physical (I-693)', price: '$275', note: 'Includes vaccines' },
    ],
  },
];

const corporateTiers = [
  {
    name: 'Small Business',
    employees: '1-10 employees',
    highlight: false,
    features: [
      'Standard pricing on all services',
      'Corporate billing available',
      'Basic compliance tracking',
    ],
  },
  {
    name: 'Medium Business',
    employees: '11-50 employees',
    highlight: true,
    features: [
      '10% discount on all services',
      'Corporate billing included',
      'Random testing pool management',
      'Dedicated account manager',
      'Driver Hub access',
    ],
  },
  {
    name: 'Enterprise',
    employees: '51+ employees',
    highlight: false,
    features: [
      'Custom volume pricing',
      'All Medium Business features',
      'On-site services available',
      'Priority scheduling',
      'Custom compliance reporting',
    ],
  },
];

const faqs = [
  {
    q: 'Do you accept insurance?',
    a: 'Yes, we accept most major insurance plans for primary care, urgent care, and some occupational health services. DOT physicals and drug tests are typically self-pay or employer-paid.',
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes, especially for weight loss programs. We offer monthly payment options to make treatment more accessible.',
  },
  {
    q: 'What forms of payment do you accept?',
    a: 'We accept cash, all major credit cards, HSA/FSA cards, and corporate billing for business accounts.',
  },
  {
    q: 'Are there hidden fees?',
    a: 'Never. The prices listed are what you pay. Any additional tests or services will be discussed and quoted before proceeding.',
  },
  {
    q: 'Do employers get volume discounts?',
    a: 'Yes! Companies with 11+ employees qualify for discounted rates. Contact us for custom corporate pricing.',
  },
];

export default function Pricing() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Transparent Pricing</h1>
          <p className="text-xl text-primary-200 max-w-2xl">
            No surprise bills. Know your costs upfront. Self-pay rates listed below — 
            insurance may cover additional services.
          </p>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-12">
            {pricingCategories.map((category, i) => (
              <div key={i}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h2>
                <div className={`${category.color} border rounded-xl overflow-hidden`}>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left px-6 py-4 font-semibold text-gray-900">Service</th>
                        <th className="text-right px-6 py-4 font-semibold text-gray-900">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.services.map((service, j) => (
                        <tr key={j} className="border-b last:border-0">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{service.name}</div>
                            {service.note && <div className="text-sm text-gray-500">{service.note}</div>}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="font-semibold text-gray-900">{service.price}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Corporate & Employer Pricing</h2>
            <p className="text-gray-600">Volume discounts and dedicated support for businesses</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {corporateTiers.map((tier, i) => (
              <div key={i} className={`bg-white rounded-xl p-6 border-2 ${tier.highlight ? 'border-primary-500 ring-2 ring-primary-100' : 'border-gray-200'}`}>
                {tier.highlight && (
                  <div className="bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{tier.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{tier.employees}</p>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/corporate"
                  className={`block w-full text-center px-4 py-2 rounded-lg font-medium ${
                    tier.highlight 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pricing FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border rounded-xl p-6">
                <div className="flex gap-3">
                  <HelpCircle className="w-6 h-6 text-primary-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Pricing?</h2>
          <p className="text-primary-200 mb-8">
            Call us for a custom quote or to verify what your insurance covers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+17033614357"
              className="px-6 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-blue-50 flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call (703) 361-4357
            </a>
            <Link
              to="/contact"
              className="px-6 py-3 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 border border-primary-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
