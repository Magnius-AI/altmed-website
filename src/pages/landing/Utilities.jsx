import { Link } from 'react-router-dom';
import { 
  Zap, CheckCircle, Shield, Building2, FileCheck, Clipboard,
  Calendar, Phone, ArrowRight, HardHat, Car
} from 'lucide-react';

const industries = [
  { icon: Zap, name: 'Electric Utilities' },
  { icon: Zap, name: 'Gas Utilities' },
  { icon: Building2, name: 'Telecom' },
  { icon: HardHat, name: 'Construction' },
  { icon: Car, name: 'Municipal Fleets' },
  { icon: Building2, name: 'Government Contractors' },
];

const services = [
  {
    title: 'Non-DOT Medical Clearance',
    desc: 'Fitness-for-duty exams for employees operating company vehicles',
  },
  {
    title: 'Periodic Medical Exams',
    desc: 'Annual or bi-annual health assessments per company policy',
  },
  {
    title: 'Drug & Alcohol Testing',
    desc: 'Non-DOT panels, random testing, post-accident, reasonable suspicion',
  },
  {
    title: 'Physical Abilities Testing',
    desc: 'Job-specific functional capacity evaluations',
  },
  {
    title: 'Respirator Fit Testing',
    desc: 'OSHA-compliant respirator medical clearance',
  },
  {
    title: 'Compliance Tracking',
    desc: 'Centralized dashboard for all employee medical clearances',
  },
];

const benefits = [
  {
    title: 'OSHA Compliance',
    desc: 'Meet all workplace safety medical requirements',
  },
  {
    title: 'Reduced Liability',
    desc: 'Document fitness-for-duty to protect your company',
  },
  {
    title: 'Centralized Tracking',
    desc: 'One dashboard for all employee medical status',
  },
  {
    title: 'Fast Turnaround',
    desc: 'Same-day results for most exams and tests',
  },
];

export default function Utilities() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-purple-300 mb-4">
              <Zap className="w-5 h-5" />
              <span className="font-medium">For Utilities & Company Vehicle Fleets</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Non-CDL Medical Compliance<br />Made Simple
            </h1>
            <p className="text-xl text-purple-200 mb-8">
              Medical clearances, fitness-for-duty exams, and drug testing for employees 
              operating company vehicles — without the complexity of DOT regulations.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-white text-purple-700 rounded-lg font-semibold hover:bg-purple-50 flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Request Quote
              </a>
              <a
                href="tel:+17033614357"
                className="px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 border border-purple-500 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call (703) 361-4357
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-gray-600">Trusted by companies across industries</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {industries.map((industry, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-700">
                <industry.icon className="w-5 h-5 text-purple-600" />
                <span>{industry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Utilities Choose AltMed</h2>
            <p className="text-gray-600">Compliance and liability protection for your workforce</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-white border rounded-xl p-6 text-center card-hover">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Comprehensive Non-DOT Services
              </h2>
              <p className="text-gray-600 mb-6">
                Not all company vehicle operators need DOT physicals, but many companies require 
                medical clearances for insurance, safety, or policy reasons. We provide flexible 
                solutions tailored to your requirements.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 border">
                    <h3 className="font-medium text-gray-900 mb-1">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <Clipboard className="w-6 h-6 text-purple-600 inline mr-2" />
                Common Use Cases
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    title: 'Service Technicians',
                    desc: 'Electric, gas, and telecom field workers driving company vehicles',
                  },
                  {
                    title: 'Construction Crews',
                    desc: 'Equipment operators and crew leaders on job sites',
                  },
                  {
                    title: 'Municipal Employees',
                    desc: 'Parks, sanitation, and public works vehicle operators',
                  },
                  {
                    title: 'Delivery & Logistics',
                    desc: 'Non-CDL delivery drivers under 26,000 lbs GVWR',
                  },
                ].map((item, i) => (
                  <li key={i} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.desc}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Hub */}
      <section className="py-16 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-purple-300 mb-4">
                <FileCheck className="w-5 h-5" />
                <span className="font-medium">Compliance Portal</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Track All Employee Clearances</h2>
              <p className="text-purple-200 mb-6">
                Our Driver Hub works for non-DOT employees too. Track medical clearances, 
                drug test results, and expiration dates in one centralized dashboard.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Centralized employee medical records',
                  'Automated expiration reminders',
                  'Compliance reporting for audits',
                  'Employee self-service portal',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-purple-200">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/driver-hub"
                className="inline-flex items-center gap-2 text-purple-300 font-medium hover:text-white"
              >
                Learn about Driver Hub <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-purple-800 rounded-xl p-6">
              <div className="text-sm text-purple-300 mb-4">Compliance Dashboard Preview</div>
              <div className="space-y-3">
                {[
                  { name: 'Medical Clearances', status: '95%', color: 'bg-green-500' },
                  { name: 'Drug Tests Current', status: '100%', color: 'bg-green-500' },
                  { name: 'Respirator Fit Tests', status: '88%', color: 'bg-yellow-500' },
                ].map((item, i) => (
                  <div key={i} className="bg-purple-700 rounded-lg p-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.name}</span>
                      <span className="text-purple-300">{item.status}</span>
                    </div>
                    <div className="w-full bg-purple-900 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{width: item.status}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Request a Quote</h2>
            <p className="text-gray-600">
              Tell us about your fleet and we'll create a custom compliance program for your needs.
            </p>
          </div>
          <form className="bg-white border rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
                  <option>Electric Utility</option>
                  <option>Gas Utility</option>
                  <option>Telecom</option>
                  <option>Construction</option>
                  <option>Municipal / Government</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input type="tel" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
                  <option>1-25</option>
                  <option>26-100</option>
                  <option>101-500</option>
                  <option>500+</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Services Needed</label>
              <div className="grid md:grid-cols-2 gap-2">
                {['Medical Clearances', 'Drug Testing', 'Random Testing Pool', 'Respirator Fit Tests', 'Physical Abilities Testing', 'Compliance Tracking'].map((service, i) => (
                  <label key={i} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                    <span className="text-sm text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
              <textarea rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Tell us about your compliance requirements..."></textarea>
            </div>
            <button type="submit" className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
              Request Quote
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
