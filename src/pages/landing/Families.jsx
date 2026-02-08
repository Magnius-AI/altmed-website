import { Link } from 'react-router-dom';
import { 
  Heart, CheckCircle, Clock, Users, Stethoscope, Scale,
  Calendar, Phone, Shield, Syringe
} from 'lucide-react';

const services = [
  {
    icon: Stethoscope,
    title: 'Primary Care',
    desc: 'Annual physicals, chronic disease management, and preventive care for the whole family.',
    href: '/services/primary-care',
  },
  {
    icon: Clock,
    title: 'Walk-In Care',
    desc: 'Same-day visits for minor injuries, illnesses, and when you can\'t wait for an appointment.',
    href: '/services/urgent-care',
  },
  {
    icon: Scale,
    title: 'Weight Management',
    desc: 'Physician-supervised programs including Semaglutide and personalized nutrition plans.',
    href: '/services/weight-loss',
  },
  {
    icon: Syringe,
    title: 'Vaccinations',
    desc: 'Flu shots, COVID vaccines, school physicals, and travel immunizations.',
    href: '/services/vaccinations',
  },
];

const reasons = [
  {
    title: 'Easy Access',
    desc: 'Walk-ins welcome. Same-day appointments available.',
  },
  {
    title: 'Affordable',
    desc: 'Competitive self-pay rates. Most insurance accepted.',
  },
  {
    title: 'Family-Friendly',
    desc: 'Care for all ages, from kids to grandparents.',
  },
  {
    title: 'Same-Day Visits',
    desc: 'No more waiting weeks for an appointment.',
  },
];

export default function Families() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-orange-100 mb-4">
              <Heart className="w-5 h-5" />
              <span className="font-medium">For Families & Individuals</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Healthcare That Fits<br />Your Family's Life
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              From routine checkups to urgent care visits, we provide compassionate, 
              convenient healthcare for you and your loved ones.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.patientfusion.com/doctor/jerry-lee-md-phd-08966"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-orange-700 rounded-lg font-semibold hover:bg-orange-50 flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </a>
              <a
                href="tel:+17033614357"
                className="px-6 py-3 bg-orange-700 text-white rounded-lg font-semibold hover:bg-orange-800 border border-orange-400 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call (703) 361-4357
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Healthcare Made Simple</h2>
            <p className="text-gray-600">The care you need, when you need it</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border text-center card-hover">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-gray-600 text-sm">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Services for Your Family</h2>
            <p className="text-gray-600">Comprehensive care under one roof</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <Link
                key={i}
                to={service.href}
                className="bg-white border rounded-xl p-6 card-hover group flex gap-4"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 transition-colors">
                  <service.icon className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Weight Loss Spotlight */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-green-600 mb-4">
                <Scale className="w-5 h-5" />
                <span className="font-medium">Popular Service</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Medical Weight Loss That Works
              </h2>
              <p className="text-gray-600 mb-6">
                Struggling to lose weight on your own? Our physician-supervised program combines 
                FDA-approved medications like Semaglutide (Wegovy/Ozempic) with personalized 
                nutrition coaching.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Lose 15-20% of your body weight',
                  'Weekly injections with medical supervision',
                  'No crash diets or extreme exercise',
                  'Covered by some insurance plans',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/services/weight-loss"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
              >
                Learn About Weight Loss →
              </Link>
            </div>
            <div className="bg-white rounded-xl p-6 border">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">45 lbs</div>
                <div className="text-gray-600">Average weight loss in our program</div>
              </div>
              <blockquote className="text-gray-600 italic border-l-4 border-green-500 pl-4">
                "The difference was having medical supervision and realistic nutrition counseling 
                that worked with my busy schedule as a working mom."
                <footer className="mt-2 text-sm text-gray-500 not-italic">— Sarah, Manassas</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-900 rounded-2xl p-8 lg:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Visit Us in Manassas</h2>
                <p className="text-gray-300 mb-6">
                  Conveniently located with free parking. Walk-ins welcome during business hours.
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 text-sm">Address</div>
                    <div>8551 Rixlew Lane, Suite 140, Manassas, VA 20109</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Phone</div>
                    <a href="tel:+17033614357" className="hover:text-orange-300">(703) 361-4357</a>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Text for Appointments</div>
                    <a href="sms:+17033483535" className="hover:text-orange-300">(703) 348-3535</a>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Hours</div>
                    <div>Monday - Friday: 8:00 AM - 6:00 PM</div>
                    <div>Saturday: 9:00 AM - 2:00 PM</div>
                    <div>Sunday: Closed</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <a
                  href="https://www.patientfusion.com/doctor/jerry-lee-md-phd-08966"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 text-center mb-4"
                >
                  Book Your Appointment Online
                </a>
                <p className="text-center text-gray-400 text-sm">
                  New patients welcome. Most insurance accepted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
