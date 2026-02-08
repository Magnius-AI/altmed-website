import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Building2, User, Shield, Lock, ArrowRight, CheckCircle } from 'lucide-react';

const DRIVER_HUB_URL = 'http://localhost:5173'; // Update this when deployed

export default function DriverHubLogin() {
  const [loginType, setLoginType] = useState('company');

  return (
    <div className="min-h-[80vh] bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-green-400 mb-4">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Secure Portal</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">AltMed Driver Hub</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Access your driver compliance dashboard, track medical cards, manage documents, 
            and stay DOT compliant.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Login Form */}
            <div className="bg-white rounded-xl border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>

              {/* Login Type Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setLoginType('company')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition ${
                    loginType === 'company'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                  Company
                </button>
                <button
                  onClick={() => setLoginType('driver')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition ${
                    loginType === 'driver'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  Driver
                </button>
              </div>

              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder={loginType === 'company' ? 'admin@yourcompany.com' : 'driver@email.com'}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-center justify-between mb-6">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600" />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-primary-600 hover:underline">Forgot password?</a>
                </div>

                <a
                  href={DRIVER_HUB_URL}
                  className="block w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 text-center"
                >
                  Sign In to Driver Hub
                </a>
              </form>

              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{' '}
                  <Link to="/corporate" className="text-primary-600 font-medium hover:underline">
                    Contact us for access
                  </Link>
                </p>
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {loginType === 'company' ? 'For Companies' : 'For Drivers'}
              </h2>

              {loginType === 'company' ? (
                <ul className="space-y-4">
                  {[
                    { title: 'Fleet Dashboard', desc: 'See all your drivers\' compliance status at a glance' },
                    { title: 'Expiration Alerts', desc: 'Get notified 30/60/90 days before medical cards expire' },
                    { title: 'Document Management', desc: 'Store and access all driver qualification files' },
                    { title: 'Compliance Reports', desc: 'Download reports for DOT audits and inspections' },
                    { title: 'Add New Drivers', desc: 'Easily onboard new drivers to your fleet' },
                    { title: 'Billing & Invoices', desc: 'View service history and manage payments' },
                  ].map((feature, i) => (
                    <li key={i} className="flex gap-4 bg-white rounded-lg p-4 border">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900">{feature.title}</div>
                        <div className="text-sm text-gray-600">{feature.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-4">
                  {[
                    { title: 'Medical Card Status', desc: 'View your current DOT medical certificate status' },
                    { title: 'Expiration Reminders', desc: 'Get notified when your card is about to expire' },
                    { title: 'Schedule Appointments', desc: 'Book your DOT physical or drug test online' },
                    { title: 'View Documents', desc: 'Access your medical certificates and test results' },
                    { title: 'Upload Documents', desc: 'Submit required documents to your employer' },
                    { title: 'Message Center', desc: 'Communicate with your company and the clinic' },
                  ].map((feature, i) => (
                    <li key={i} className="flex gap-4 bg-white rounded-lg p-4 border">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900">{feature.title}</div>
                        <div className="text-sm text-gray-600">{feature.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 bg-gray-900 rounded-xl p-6 text-white">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <Lock className="w-5 h-5" />
                  <span className="font-medium">Secure & HIPAA Compliant</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Driver Hub uses bank-level encryption to protect your data. All medical information 
                  is stored in compliance with HIPAA regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Not a customer CTA */}
      <section className="py-12 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Not Using Driver Hub Yet?</h2>
          <p className="text-primary-200 mb-6">
            See how AltMed can help your trucking company stay DOT compliant with less hassle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/trucking"
              className="px-6 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-blue-50 flex items-center gap-2"
            >
              Learn About DOT Services <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/corporate"
              className="px-6 py-3 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 border border-primary-500"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
