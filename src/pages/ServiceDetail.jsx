import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Phone, ArrowRight } from 'lucide-react';

const serviceData = {
  'primary-care': {
    title: 'Primary Care',
    subtitle: 'Your Partner in Long-Term Health',
    description: 'Comprehensive healthcare for your whole family. We get to know you and your health patterns, not just your current symptoms.',
    features: [
      'Annual wellness exams',
      'Chronic disease management (diabetes, hypertension)',
      'Preventive screenings',
      'Immunizations',
      'Health education and counseling',
      'Referrals to specialists when needed',
    ],
    cta: 'Schedule Your Visit',
  },
  'urgent-care': {
    title: 'Walk-In / Urgent Care',
    subtitle: 'Same-Day Care When You Need It Most',
    description: 'No appointment needed. We handle health situations that can\'t wait for a regular appointment — from minor injuries to sudden illnesses.',
    features: [
      'Walk-ins welcome',
      'Minor injuries and illnesses',
      'Infections and flu symptoms',
      'Sprains and strains',
      'Lab work and testing',
      'No ER wait times',
    ],
    cta: 'Walk In Today',
  },
  'weight-loss': {
    title: 'Medical Weight Loss',
    subtitle: 'Physician-Supervised Programs That Work',
    description: 'We look at your whole health picture, not just hand you a generic diet plan. Our medical weight loss service includes FDA-approved medications with personalized coaching.',
    features: [
      'Semaglutide (Wegovy/Ozempic) injections',
      'Tirzepatide (Mounjaro) injections',
      'B12 and lipotropic injections',
      'Body composition analysis',
      'Hormone optimization',
      'One-on-one medical coaching',
    ],
    cta: 'Start Your Journey',
  },
  'dot-physical': {
    title: 'DOT Physicals',
    subtitle: 'Fast, Certified CDL Medical Exams',
    description: 'FMCSA-certified examiners provide DOT physicals with same-day certificates. Walk-ins welcome, competitive pricing, no surprise fees.',
    features: [
      'FMCSA National Registry certified',
      'Same-day medical certificates',
      'Walk-ins welcome',
      'Vision and hearing tests',
      'Blood pressure monitoring',
      'Complete FMCSA-compliant exam',
    ],
    cta: 'Get Your DOT Physical',
  },
  'occupational-health': {
    title: 'Occupational Health',
    subtitle: 'Keeping Your Workforce Healthy & Productive',
    description: 'Comprehensive workplace health services including pre-employment exams, worker\'s compensation care, and return-to-work evaluations.',
    features: [
      'Pre-employment physicals',
      'Worker\'s compensation treatment',
      'Return-to-work evaluations',
      'Injury care and management',
      'Fitness-for-duty exams',
      'OSHA compliance support',
    ],
    cta: 'Contact for Business Rates',
  },
  'drug-testing': {
    title: 'Drug & Alcohol Testing',
    subtitle: 'DOT and Non-DOT Testing Services',
    description: 'Professional drug and alcohol testing with confidential results. We handle pre-employment, random, post-accident, and reasonable suspicion testing.',
    features: [
      '5-panel and 10-panel drug tests',
      'DOT drug testing',
      'Breath alcohol testing',
      'Random testing pool management',
      'MRO (Medical Review Officer) services',
      'Quick turnaround results',
    ],
    cta: 'Schedule Testing',
  },
  'corporate-wellness': {
    title: 'Corporate Wellness',
    subtitle: 'Health Programs for Your Workforce',
    description: 'Our wellness programs focus on sustainable changes that add up to better health. Includes screenings, vaccinations, and chronic disease prevention.',
    features: [
      'Health risk assessments',
      'Biometric screenings',
      'Flu shot clinics',
      'Health education seminars',
      'Chronic disease prevention',
      'On-site services available',
    ],
    cta: 'Request a Quote',
  },
  'vaccinations': {
    title: 'Vaccinations & Immunizations',
    subtitle: 'Protect Yourself and Your Family',
    description: 'Stay protected with essential immunizations. We offer flu shots, COVID vaccines, travel vaccines, and routine immunizations for all ages.',
    features: [
      'Flu shots',
      'COVID-19 vaccines',
      'Tetanus and Tdap',
      'Hepatitis A & B',
      'Travel vaccinations',
      'School and sports physicals',
    ],
    cta: 'Get Vaccinated',
  },
};

export default function ServiceDetail() {
  const { serviceSlug } = useParams();
  const service = serviceData[serviceSlug];

  if (!service) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
        <Link to="/services" className="text-primary-600 font-medium">
          View All Services
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/services" className="text-primary-300 hover:text-white mb-4 inline-flex items-center gap-1">
            ← Back to Services
          </Link>
          <h1 className="text-4xl font-bold mb-2">{service.title}</h1>
          <p className="text-xl text-primary-200">{service.subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <p className="text-xl text-gray-600 mb-8">{service.description}</p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="bg-gray-50 rounded-xl p-6 mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Get Started?</h3>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.patientfusion.com/doctor/jerry-lee-md-phd-08966"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 flex items-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    {service.cta}
                  </a>
                  <a
                    href="tel:+17033614357"
                    className="px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 border flex items-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call (703) 361-4357
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white border rounded-xl p-6 sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Contact</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-gray-500">Phone</div>
                    <a href="tel:+17033614357" className="text-primary-600 font-medium">(703) 361-4357</a>
                  </div>
                  <div>
                    <div className="text-gray-500">Text</div>
                    <a href="sms:+17033483535" className="text-primary-600 font-medium">(703) 348-3535</a>
                  </div>
                  <div>
                    <div className="text-gray-500">Address</div>
                    <div className="text-gray-700">8551 Rixlew Lane, Suite 140<br />Manassas, VA 20109</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Hours</div>
                    <div className="text-gray-700">Mon-Fri: 8am-6pm<br />Sat: 9am-2pm</div>
                  </div>
                </div>

                <hr className="my-6" />

                <h3 className="font-semibold text-gray-900 mb-4">Other Services</h3>
                <ul className="space-y-2">
                  {Object.entries(serviceData)
                    .filter(([slug]) => slug !== serviceSlug)
                    .slice(0, 4)
                    .map(([slug, data]) => (
                      <li key={slug}>
                        <Link
                          to={`/services/${slug}`}
                          className="text-gray-600 hover:text-primary-600 flex items-center gap-1"
                        >
                          <ArrowRight className="w-4 h-4" />
                          {data.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
