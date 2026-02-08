import { Link } from 'react-router-dom';
import { Award, GraduationCap, Heart, Users, MapPin, Calendar } from 'lucide-react';

const team = [
  {
    name: 'Dr. Gerald K. Lee, M.D., Ph.D.',
    role: 'Medical Director',
    credentials: [
      'Board Certified - Obesity Medicine',
      'Board Certified - Addiction Medicine',
      'Board Certified - Pain Management',
      'M.D. - The Chicago Medical School',
      'Ph.D. - Biostatistics, Ohio State University',
      'Masters - Epidemiology, Harvard University',
    ],
    bio: 'Over two decades of experience in family practice, occupational health, and evidence-based medicine.',
  },
  {
    name: 'Simon Choi, FNP-BC',
    role: 'Family Nurse Practitioner',
    credentials: ['Board Certified Family Nurse Practitioner'],
    bio: 'Dedicated to providing compassionate, comprehensive care for patients of all ages.',
  },
  {
    name: 'Garima Pokhrel, DNP, FNP-C',
    role: 'Family Nurse Practitioner',
    credentials: ['Doctor of Nursing Practice', 'Certified Family Nurse Practitioner'],
    bio: 'Committed to patient-centered care with expertise in chronic disease management.',
  },
];

const values = [
  {
    icon: Heart,
    title: 'Patient-Centered Care',
    desc: 'We listen first. Every treatment plan is tailored to your unique needs and goals.',
  },
  {
    icon: Award,
    title: 'Clinical Excellence',
    desc: 'Board-certified providers using evidence-based medicine and latest treatment protocols.',
  },
  {
    icon: Users,
    title: 'Community Focus',
    desc: 'Proudly serving Manassas and Northern Virginia families and businesses since 2005.',
  },
  {
    icon: GraduationCap,
    title: 'Continuous Learning',
    desc: 'Our team stays current with the latest medical advances and certifications.',
  },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About AltMed Medical Center</h1>
          <p className="text-xl text-primary-200 max-w-2xl">
            Trusted healthcare for individuals, families, and businesses in Northern Virginia, 
            Washington D.C., and Maryland.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At AltMed Medical Center, we are committed to delivering trusted, high-quality 
                healthcare services backed by the expertise of respected professionals in American medicine.
              </p>
              <p className="text-gray-600 mb-4">
                We place patient health, safety, and well-being at the heart of everything we do. 
                From walk-in urgent care to comprehensive corporate health programs, we provide 
                medical care that fits your real life.
              </p>
              <p className="text-gray-600">
                Our approach combines medical excellence with a deep understanding of workplace wellness, 
                empowering both individuals and organizations to thrive.
              </p>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                {values.map((value, i) => (
                  <div key={i} className="bg-white rounded-xl p-4">
                    <value.icon className="w-8 h-8 text-primary-600 mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Provide</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Accurate Clinical Testing', desc: 'Reliable tests with fast turnaround times and exceptional customer care.' },
              { title: 'Expert Medical Guidance', desc: 'Professional, evidence-based information on medications and treatments.' },
              { title: 'Modern Therapeutic Care', desc: 'Innovative treatment methods for smooth, patient-centered care.' },
              { title: 'Cost-Effective Services', desc: 'Affordable, value-driven solutions delivered with professionalism.' },
              { title: 'Occupational Health Expertise', desc: 'Proactive management of workplace injuries with prompt interventions.' },
              { title: 'Workplace Health Collaboration', desc: 'Partnering with employees and employers to address health concerns.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Medical Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-xl border p-6">
                <div className="w-20 h-20 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">
                    {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-1">{member.name}</h3>
                <p className="text-primary-600 text-center mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <ul className="space-y-1">
                  {member.credentials.map((cred, j) => (
                    <li key={j} className="text-xs text-gray-500 flex items-start gap-1">
                      <span className="text-primary-600">•</span> {cred}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Locations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { city: 'Manassas, VA', address: '8551 Rixlew Lane, Suite 140', phone: '(703) 361-4357', primary: true },
              { city: 'Waldorf, MD', address: 'Coming Soon', phone: '(301) 868-2760' },
              { city: 'Front Royal, VA', address: 'Coming Soon', phone: '(540) 636-9100' },
            ].map((loc, i) => (
              <div key={i} className={`rounded-xl p-6 ${loc.primary ? 'bg-primary-600 text-white' : 'bg-white border'}`}>
                <MapPin className={`w-8 h-8 mb-3 ${loc.primary ? 'text-white' : 'text-primary-600'}`} />
                <h3 className={`text-xl font-semibold mb-2 ${loc.primary ? 'text-white' : 'text-gray-900'}`}>
                  {loc.city}
                </h3>
                <p className={loc.primary ? 'text-primary-100' : 'text-gray-600'}>{loc.address}</p>
                <a 
                  href={`tel:${loc.phone.replace(/\D/g, '')}`} 
                  className={`font-medium mt-2 block ${loc.primary ? 'text-white' : 'text-primary-600'}`}
                >
                  {loc.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the AltMed Difference?</h2>
          <p className="text-primary-200 mb-8">
            Schedule an appointment today or learn more about our corporate health services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
              to="/contact"
              className="px-6 py-3 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 border border-primary-600"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
