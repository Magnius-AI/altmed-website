import { Link } from 'react-router-dom';
import { 
  Stethoscope, Scale, Truck, Building2, Shield, Clock, 
  CheckCircle, ArrowRight, Star, Users, Calendar 
} from 'lucide-react';

const services = [
  { 
    icon: Stethoscope, 
    title: 'Primary Care', 
    desc: 'Comprehensive healthcare for your whole family',
    href: '/services/primary-care'
  },
  { 
    icon: Clock, 
    title: 'Walk-In / Urgent Care', 
    desc: 'Same-day care when you need it most',
    href: '/services/urgent-care'
  },
  { 
    icon: Scale, 
    title: 'Medical Weight Loss', 
    desc: 'Physician-supervised programs including Semaglutide',
    href: '/services/weight-loss'
  },
  { 
    icon: Truck, 
    title: 'DOT Physicals', 
    desc: 'Fast, certified CDL medical exams',
    href: '/services/dot-physical'
  },
  { 
    icon: Building2, 
    title: 'Occupational Health', 
    desc: 'Pre-employment, worker\'s comp, and more',
    href: '/services/occupational-health'
  },
  { 
    icon: Shield, 
    title: 'Drug & Alcohol Testing', 
    desc: 'DOT and non-DOT testing services',
    href: '/services/drug-testing'
  },
];

const audiences = [
  {
    title: 'For Employers & HR',
    desc: 'Reduce sick days, ensure compliance, and provide quality healthcare for your team.',
    href: '/corporate',
    cta: 'Learn More',
    color: 'bg-blue-50 border-blue-200'
  },
  {
    title: 'For Trucking Companies',
    desc: 'DOT physicals, drug testing, and complete driver qualification file management.',
    href: '/trucking',
    cta: 'DOT Services',
    color: 'bg-green-50 border-green-200'
  },
  {
    title: 'For Utilities & Fleets',
    desc: 'Non-CDL medical clearances, fitness-for-duty exams, and compliance tracking.',
    href: '/utilities',
    cta: 'Fleet Solutions',
    color: 'bg-purple-50 border-purple-200'
  },
  {
    title: 'For Families',
    desc: 'Primary care, walk-in visits, weight management, and preventive care.',
    href: '/families',
    cta: 'Family Care',
    color: 'bg-orange-50 border-orange-200'
  },
];

const stats = [
  { value: '20+', label: 'Years Experience' },
  { value: '10K+', label: 'Patients Served' },
  { value: '500+', label: 'Companies Trust Us' },
  { value: '4.8', label: 'Google Rating', icon: Star },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Healthcare That Works<br />For Your Life
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Walk-in care, DOT physicals, weight loss programs, and corporate health services — 
              all under one roof in Manassas, VA.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.patientfusion.com/doctor/jerry-lee-md-phd-08966"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-blue-50 flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </a>
              <Link
                to="/driver-hub"
                className="px-6 py-3 bg-primary-800 text-white rounded-lg font-semibold hover:bg-primary-900 flex items-center gap-2 border border-primary-500"
              >
                <Truck className="w-5 h-5" />
                Driver Hub Login
              </Link>
              <Link
                to="/corporate"
                className="px-6 py-3 bg-transparent text-white rounded-lg font-semibold hover:bg-white/10 flex items-center gap-2 border border-white/50"
              >
                <Building2 className="w-5 h-5" />
                Employer Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-gray-50 py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-primary-600 flex items-center justify-center gap-1">
                  {stat.value}
                  {stat.icon && <stat.icon className="w-6 h-6 text-yellow-500 fill-yellow-500" />}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From routine checkups to specialized occupational health, we provide comprehensive care for individuals and businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Link
                key={i}
                to={service.href}
                className="bg-white border rounded-xl p-6 card-hover group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                  <service.icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <span className="text-primary-600 font-medium flex items-center gap-1">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Sections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Serve</h2>
            <p className="text-gray-600">Tailored healthcare solutions for every need</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {audiences.map((aud, i) => (
              <Link
                key={i}
                to={aud.href}
                className={`${aud.color} border rounded-xl p-6 card-hover`}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{aud.title}</h3>
                <p className="text-gray-600 mb-4">{aud.desc}</p>
                <span className="text-primary-600 font-medium flex items-center gap-1">
                  {aud.cta} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Patients & Employers Trust AltMed
              </h2>
              <ul className="space-y-4">
                {[
                  'Board-certified providers with 20+ years experience',
                  'Same-day appointments and walk-in availability',
                  'DOT-certified medical examiners on staff',
                  'Bilingual staff (English & Spanish)',
                  'Corporate billing and account management',
                  'Convenient location with free parking',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="text-primary-600 font-semibold flex items-center gap-1"
                >
                  Learn more about us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Dr. Gerald K. Lee, M.D., Ph.D.</div>
                    <div className="text-sm text-gray-500">Medical Director</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Board certified in Obesity Medicine, Addiction Medicine, and Pain Management. 
                  Over two decades of experience in family practice and occupational health.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-primary-200 mb-8">
            Whether you need a quick visit or comprehensive corporate health services, we're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.patientfusion.com/doctor/jerry-lee-md-phd-08966"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-blue-50"
            >
              Schedule Appointment
            </a>
            <Link
              to="/corporate"
              className="px-6 py-3 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 border border-primary-600"
            >
              Request Employer Demo
            </Link>
            <a
              href="tel:+17033614357"
              className="px-6 py-3 bg-transparent text-white rounded-lg font-semibold hover:bg-white/10 border border-white/30"
            >
              Call (703) 361-4357
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
