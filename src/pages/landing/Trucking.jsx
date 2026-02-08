import { Link } from 'react-router-dom';
import { 
  Truck, CheckCircle, Shield, Clock, FileCheck, AlertTriangle,
  Calendar, Phone, ArrowRight, Users
} from 'lucide-react';

const services = [
  {
    title: 'DOT Physicals',
    desc: 'FMCSA-certified examiners, same-day certificates, walk-ins welcome',
    price: 'Starting at $85',
  },
  {
    title: 'Drug Testing (DOT)',
    desc: '5-panel and 10-panel, rapid and lab-based options',
    price: 'Starting at $45',
  },
  {
    title: 'Breath Alcohol Testing',
    desc: 'DOT-compliant BAT testing with certified technicians',
    price: 'Starting at $35',
  },
  {
    title: 'Random Testing Pool',
    desc: 'Quarterly randomization, notifications, and compliance tracking',
    price: '$60/driver/year',
  },
  {
    title: 'Driver Qualification Files',
    desc: 'Complete DQ file management and document storage',
    price: 'Custom pricing',
  },
  {
    title: 'Return to Duty',
    desc: 'SAP referrals and return-to-duty testing coordination',
    price: 'Contact us',
  },
];

const complianceFeatures = [
  'Real-time driver compliance dashboard',
  'Automated expiration alerts (30/60/90 days)',
  'Medical card tracking and storage',
  'Drug test result management',
  'Downloadable compliance reports',
  'Driver self-service portal',
];

export default function Trucking() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-green-300 mb-4">
              <Truck className="w-5 h-5" />
              <span className="font-medium">For Trucking & Fleet Companies</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Stay DOT Compliant.<br />Keep Your Fleet Moving.
            </h1>
            <p className="text-xl text-green-200 mb-8">
              DOT physicals, drug testing, and complete driver qualification file management — 
              all in one place. Avoid violations, streamline onboarding, automate compliance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/driver-hub"
                className="px-6 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-green-50 flex items-center gap-2"
              >
                <FileCheck className="w-5 h-5" />
                Access Driver Hub
              </Link>
              <a
                href="tel:+17033614357"
                className="px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 border border-green-500 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call (703) 361-4357
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Banner */}
      <section className="bg-yellow-50 border-b border-yellow-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 text-yellow-800">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <div>
              <strong>DOT Compliance Alert:</strong> Expired medical cards, missed drug tests, and incomplete DQ files 
              can result in fines up to $16,000 per violation and driver out-of-service orders.
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">DOT Compliance Services</h2>
            <p className="text-gray-600">Everything you need to keep your drivers compliant</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-white border rounded-xl p-6 card-hover">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.desc}</p>
                <div className="text-green-600 font-semibold">{service.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Driver Hub */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-green-400 mb-4">
                <FileCheck className="w-5 h-5" />
                <span className="font-medium">Driver Compliance Portal</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">AltMed Driver Hub</h2>
              <p className="text-gray-300 mb-6">
                Never miss an expiration date again. Our Driver Hub gives you complete visibility 
                into your fleet's compliance status with automated alerts and easy document management.
              </p>
              <ul className="space-y-3 mb-6">
                {complianceFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/driver-hub"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
              >
                Login to Driver Hub <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="text-sm text-gray-400 mb-4">Fleet Dashboard Preview</div>
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Driver Compliance Status</span>
                    <span className="text-green-400 text-sm">92% Compliant</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-700 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">48</div>
                    <div className="text-xs text-gray-400">Total Drivers</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">44</div>
                    <div className="text-xs text-gray-400">Compliant</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-yellow-400">4</div>
                    <div className="text-xs text-gray-400">Action Needed</div>
                  </div>
                </div>
                <div className="bg-yellow-900/50 border border-yellow-700 rounded-lg p-3">
                  <div className="text-yellow-400 text-sm font-medium mb-1">⚠️ Upcoming Expirations</div>
                  <div className="text-gray-300 text-sm">3 medical cards expire in next 30 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fleet Pricing</h2>
            <p className="text-gray-600">Volume discounts for companies with 10+ drivers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Small Fleet',
                drivers: '1-10 drivers',
                price: '$75',
                per: 'per DOT physical',
                features: ['Same-day certificates', 'Drug testing available', 'Basic compliance tracking'],
              },
              {
                name: 'Medium Fleet',
                drivers: '11-50 drivers',
                price: '$65',
                per: 'per DOT physical',
                features: ['All Small Fleet features', 'Random testing pool', 'Dedicated account manager', 'Driver Hub access'],
                popular: true,
              },
              {
                name: 'Large Fleet',
                drivers: '51+ drivers',
                price: 'Custom',
                per: 'volume pricing',
                features: ['All Medium Fleet features', 'On-site services available', 'Priority scheduling', 'Custom reporting'],
              },
            ].map((plan, i) => (
              <div key={i} className={`bg-white rounded-xl p-6 border-2 ${plan.popular ? 'border-green-500 ring-2 ring-green-100' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.drivers}</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm ml-1">{plan.per}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="tel:+17033614357"
                  className={`block w-full text-center px-4 py-2 rounded-lg font-medium ${
                    plan.popular 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Simplify DOT Compliance?</h2>
          <p className="text-green-200 mb-8">
            Join hundreds of trucking companies who trust AltMed for their DOT compliance needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/driver-hub"
              className="px-6 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-green-50 flex items-center gap-2"
            >
              <FileCheck className="w-5 h-5" />
              Access Driver Hub
            </Link>
            <a
              href="tel:+17033614357"
              className="px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 border border-green-500"
            >
              Call (703) 361-4357
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
