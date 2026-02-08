import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Clock, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Services', 
    href: '/services',
    children: [
      { name: 'Primary Care', href: '/services/primary-care' },
      { name: 'Walk-In / Urgent Care', href: '/services/urgent-care' },
      { name: 'Weight Management', href: '/services/weight-loss' },
      { name: 'DOT Physicals', href: '/services/dot-physical' },
      { name: 'Occupational Health', href: '/services/occupational-health' },
      { name: 'Drug & Alcohol Testing', href: '/services/drug-testing' },
      { name: 'Corporate Wellness', href: '/services/corporate-wellness' },
    ]
  },
  { name: 'For Employers', href: '/corporate' },
  { name: 'Forms', href: '/forms' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-900 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a href="tel:+17033614357" className="flex items-center gap-1 hover:text-primary-200">
              <Phone className="w-4 h-4" />
              (703) 361-4357
            </a>
            <span className="hidden sm:flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              8551 Rixlew Lane, Suite 140, Manassas, VA
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Mon-Fri: 8am-6pm | Sat: 9am-2pm
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <span className="text-xl font-bold text-primary-900">AltMed</span>
              <span className="text-xs block text-gray-500">Medical Center</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.children ? (
                  <>
                    <button 
                      className="flex items-center gap-1 text-gray-700 hover:text-primary-600 font-medium"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div 
                      className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={`font-medium ${
                      location.pathname === item.href
                        ? 'text-primary-600'
                        : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/driver-hub"
              className="px-4 py-2 text-primary-600 border border-primary-600 rounded-lg font-medium hover:bg-primary-50"
            >
              Driver Hub Login
            </Link>
            <a
              href="https://www.patientfusion.com/doctor/jerry-lee-md-phd-08966"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <>
                    <div className="px-2 py-2 font-medium text-gray-700">{item.name}</div>
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="block px-4 py-2 text-gray-600 hover:bg-primary-50"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="block px-2 py-2 font-medium text-gray-700 hover:text-primary-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-2 px-2">
              <Link
                to="/driver-hub"
                className="w-full text-center px-4 py-2 text-primary-600 border border-primary-600 rounded-lg font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Driver Hub Login
              </Link>
              <a
                href="https://www.patientfusion.com/doctor/jerry-lee-md-phd-08966"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-4 py-2 bg-primary-600 text-white rounded-lg font-medium"
              >
                Book Appointment
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold">AltMed</span>
            </div>
            <p className="text-gray-400 text-sm">
              Trusted healthcare for individuals, families, and businesses in Northern Virginia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/corporate" className="hover:text-white">For Employers</Link></li>
              <li><Link to="/trucking" className="hover:text-white">CDL/DOT Services</Link></li>
              <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link to="/driver-hub" className="hover:text-white">Driver Hub</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/services/primary-care" className="hover:text-white">Primary Care</Link></li>
              <li><Link to="/services/urgent-care" className="hover:text-white">Walk-In Care</Link></li>
              <li><Link to="/services/weight-loss" className="hover:text-white">Weight Loss</Link></li>
              <li><Link to="/services/dot-physical" className="hover:text-white">DOT Physicals</Link></li>
              <li><Link to="/services/drug-testing" className="hover:text-white">Drug Testing</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                8551 Rixlew Lane, Suite 140<br />Manassas, VA 20109
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <a href="tel:+17033614357" className="hover:text-white">(703) 361-4357</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Mon-Fri: 8am-6pm
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} AltMed Medical Center. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            {' · '}
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            {' · '}
            <span>HIPAA Compliant</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
