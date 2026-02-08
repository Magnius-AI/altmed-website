import { Link } from 'react-router-dom';
import { 
  Stethoscope, Clock, Scale, Truck, Building2, Shield, 
  Syringe, Heart, ArrowRight, CheckCircle
} from 'lucide-react';

const services = [
  {
    slug: 'primary-care',
    icon: Stethoscope,
    title: 'Primary Care',
    shortDesc: 'Comprehensive healthcare for your whole family',
    features: ['Annual physicals', 'Chronic disease management', 'Preventive care', 'Health screenings'],
    color: 'bg-blue-50 border-blue-200',
  },
  {
    slug: 'urgent-care',
    icon: Clock,
    title: 'Walk-In / Urgent Care',
    shortDesc: 'Same-day care for non-emergency medical needs',
    features: ['No appointment needed', 'Minor injuries', 'Illnesses', 'Lab work'],
    color: 'bg-red-50 border-red-200',
  },
  {
    slug: 'weight-loss',
    icon: Scale,
    title: 'Medical Weight Loss',
    shortDesc: 'Physician-supervised weight management programs',
    features: ['Semaglutide (Wegovy/Ozempic)', 'Tirzepatide (Mounjaro)', 'B12 injections', 'Nutrition counseling'],
    color: 'bg-green-50 border-green-200',
  },
  {
    slug: 'dot-physical',
    icon: Truck,
    title: 'DOT Physicals',
    shortDesc: 'Fast, certified CDL medical examinations',
    features: ['FMCSA certified examiners', 'Same-day certificates', 'Walk-ins welcome', 'Competitive pricing'],
    color: 'bg-yellow-50 border-yellow-200',
  },
  {
    slug: 'occupational-health',
    icon: Building2,
    title: 'Occupational Health',
    shortDesc: 'Comprehensive workplace health services',
    features: ['Pre-employment exams', 'Worker\'s compensation', 'Return-to-work evaluations', 'Injury care'],
    color: 'bg-purple-50 border-purple-200',
  },
  {
    slug: 'drug-testing',
    icon: Shield,
    title: 'Drug & Alcohol Testing',
    shortDesc: 'DOT and non-DOT testing services',
    features: ['5 & 10 panel tests', 'Breath alcohol', 'Random testing pools', 'MRO services'],
    color: 'bg-orange-50 border-orange-200',
  },
  {
    slug: 'corporate-wellness',
    icon: Heart,
    title: 'Corporate Wellness',
    shortDesc: 'Health programs for your workforce',
    features: ['Health screenings', 'Flu shots', 'Wellness programs', 'On-site services'],
    color: 'bg-pink-50 border-pink-200',
  },
  {
    slug: 'vaccinations',
    icon: Syringe,
    title: 'Vaccinations',
    shortDesc: 'Immunizations for all ages',
    features: ['Flu shots', 'COVID vaccines', 'Travel vaccines', 'School physicals'],
    color: 'bg-cyan-50 border-cyan-200',
  },
];

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-primary-200 max-w-2xl">
            From routine checkups to specialized occupational health, we provide comprehensive 
            care for individuals, families, and businesses.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className={`${service.color} border rounded-xl p-6 card-hover group`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <service.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.shortDesc}</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-primary-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Business Services CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-primary-900 rounded-2xl p-8 lg:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Corporate & Employer Services</h2>
                <p className="text-primary-200 mb-6">
                  Looking for comprehensive health services for your business? We offer volume pricing, 
                  corporate billing, and dedicated account management.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'DOT compliance for trucking fleets',
                    'Pre-employment and random drug testing',
                    'On-site health screenings',
                    'Worker\'s compensation management',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-primary-100">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                <Link
                  to="/corporate"
                  className="px-6 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-blue-50 text-center"
                >
                  Employer Solutions
                </Link>
                <Link
                  to="/trucking"
                  className="px-6 py-3 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 border border-primary-500 text-center"
                >
                  Trucking & Fleet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
