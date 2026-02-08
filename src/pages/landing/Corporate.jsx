import { Link } from 'react-router-dom';
import { 
  Building2, CheckCircle, Users, Shield, Clock, TrendingDown,
  Calendar, Phone, ArrowRight, FileCheck, Heart
} from 'lucide-react';

const benefits = [
  {
    icon: TrendingDown,
    title: 'Reduce Sick Days',
    desc: 'Proactive health programs decrease absenteeism by up to 25%',
  },
  {
    icon: Clock,
    title: 'Faster Care Access',
    desc: 'Same-day appointments mean employees spend less time away from work',
  },
  {
    icon: Heart,
    title: 'Family Coverage',
    desc: 'Comprehensive care for employees and their dependents',
  },
  {
    icon: Shield,
    title: 'Compliance Handled',
    desc: 'DOT, OSHA, and workplace safety requirements managed for you',
  },
];

const services = [
  'Pre-employment physicals',
  'Drug and alcohol testing (DOT & non-DOT)',
  'Worker\'s compensation management',
  'Return-to-work evaluations',
  'Annual wellness screenings',
  'Flu shot clinics',
  'DOT physicals for CDL drivers',
  'Random testing pool management',
];

export default function Corporate() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary-300 mb-4">
              <Building2 className="w-5 h-5" />
              <span className="font-medium">For Employers & HR Teams</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Healthcare That Works<br />For Your Business
            </h1>
            <p className="text-xl text-primary-200 mb-8">
              Reduce costs, ensure compliance, and keep your workforce healthy with AltMed's 
              comprehensive corporate health services.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#demo"
                className="px-6 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-blue-50 flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Request Demo
              </a>
              <a
                href="tel:+17033614357"
                className="px-6 py-3 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 border border-primary-500 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call (703) 361-4357
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Employers Choose AltMed</h2>
            <p className="text-gray-600">Trusted by 500+ businesses in Northern Virginia</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border card-hover">
                <benefit.icon className="w-10 h-10 text-primary-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Comprehensive Corporate Health Services
              </h2>
              <p className="text-gray-600 mb-6">
                From pre-employment screening to ongoing wellness programs, we provide everything 
                your business needs to maintain a healthy, compliant workforce.
              </p>
              <ul className="space-y-3">
                {services.map((service, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Corporate Benefits</h3>
              <ul className="space-y-4">
                {[
                  { title: 'Volume Pricing', desc: '10+ employees qualify for discounted rates' },
                  { title: 'Corporate Billing', desc: 'No employee out-of-pocket, billed directly to company' },
                  { title: 'Dedicated Account Manager', desc: 'Single point of contact for all your needs' },
                  { title: 'Flexible Scheduling', desc: 'Extended hours and walk-in availability' },
                  { title: 'Compliance Reporting', desc: 'Automated reports for DOT and regulatory requirements' },
                ].map((item, i) => (
                  <li key={i} className="bg-white rounded-lg p-4 border">
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.desc}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Hub CTA */}
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
                Our secure online portal gives you complete visibility into your drivers' compliance status. 
                Track medical cards, manage expirations, and stay DOT-compliant automatically.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  'Real-time compliance dashboard',
                  'Automated expiration alerts',
                  'Document storage and management',
                  'Driver self-service portal',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/driver-hub"
                className="inline-flex items-center gap-2 text-green-400 font-medium hover:text-green-300"
              >
                Access Driver Hub <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-400 mb-1">Company Dashboard Preview</div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">24</div>
                    <div className="text-xs text-gray-400">Active Drivers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">21</div>
                    <div className="text-xs text-gray-400">Compliant</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">3</div>
                    <div className="text-xs text-gray-400">Expiring Soon</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Get full access to your company dashboard when you sign up for corporate services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Form */}
      <section id="demo" className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Request a Demo</h2>
            <p className="text-gray-600">
              See how AltMed can streamline your corporate health program. We'll show you our services, 
              pricing, and Driver Hub portal.
            </p>
          </div>
          <form className="bg-white border rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input type="tel" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>1-10</option>
                  <option>11-50</option>
                  <option>51-100</option>
                  <option>100+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Services Interested In</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>All Corporate Services</option>
                  <option>DOT Compliance</option>
                  <option>Drug Testing</option>
                  <option>Wellness Programs</option>
                  <option>Worker's Comp</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
              <textarea rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Tell us about your needs..."></textarea>
            </div>
            <button type="submit" className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700">
              Request Demo
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
