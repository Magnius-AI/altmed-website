import { Link } from 'react-router-dom';
import { CheckCircle, AlertCircle, FileText, Calendar, Download } from 'lucide-react';

export default function DOTPhysical() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-green-300 mb-4">
            <FileText className="w-5 h-5" />
            <span className="font-medium">DOT Regulations</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">DOT Physical Requirements</h1>
          <p className="text-xl text-green-200 max-w-2xl">
            Complete guide to FMCSA medical examination requirements under 49 CFR 391.41
          </p>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-8 bg-green-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Standard Validity', value: '2 Years' },
              { label: 'Vision Required', value: '20/40 Each Eye' },
              { label: 'Blood Pressure', value: '<140/90' },
              { label: 'Hearing Test', value: 'Required' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-green-600">{item.value}</div>
                <div className="text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* What to Bring */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What to Bring</h2>
                <ul className="space-y-3">
                  {[
                    'Valid driver\'s license or CDL',
                    'List of current medications (including over-the-counter)',
                    'Medical history (surgeries, hospitalizations, chronic conditions)',
                    'Glasses or contact lenses if worn while driving',
                    'Hearing aid if used',
                    'CPAP machine documentation if you have sleep apnea',
                    'Most recent medical records if you have diabetes, heart conditions, or seizures',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What's Included */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Physical Exam Includes</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: 'Vision Test', desc: '20/40 or better in each eye with or without correction' },
                    { title: 'Hearing Test', desc: 'Whisper test or audiometry - must hear forced whisper at 5 feet' },
                    { title: 'Blood Pressure', desc: 'Below 140/90 for 2-year certificate' },
                    { title: 'Urinalysis', desc: 'For diabetes and kidney function (NOT a drug test)' },
                    { title: 'Physical Examination', desc: 'Check of all body systems - heart, lungs, spine, etc.' },
                    { title: 'Medical History Review', desc: 'Discussion of health conditions and medications' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white border rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificate Validity */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  <Calendar className="inline w-6 h-6 mr-2 text-green-600" />
                  Medical Certificate Validity
                </h2>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="font-semibold text-green-900 mb-1">✅ 2 Years (Most Common)</div>
                    <div className="text-sm text-gray-700">
                      If you meet all health standards without restrictions or conditions requiring monitoring.
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="font-semibold text-yellow-900 mb-1">⚠️ 1 Year</div>
                    <div className="text-sm text-gray-700">
                      If you have controlled conditions like high blood pressure (140-159 systolic or 90-99 diastolic), 
                      diabetes managed with medication, or other conditions requiring annual monitoring.
                    </div>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="font-semibold text-orange-900 mb-1">⏱️ 3-6 Months (Temporary)</div>
                    <div className="text-sm text-gray-700">
                      If you have conditions being monitored or treated. Common for new diabetes diagnosis, 
                      borderline blood pressure, or recovery from surgery.
                    </div>
                  </div>
                </div>
              </div>

              {/* Disqualifying Conditions */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  <AlertCircle className="inline w-6 h-6 mr-2 text-red-600" />
                  Potentially Disqualifying Conditions
                </h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Note:</strong> Many conditions can be managed with treatment. 
                    Disqualification is not always permanent. Consult with our certified medical examiner.
                  </p>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {[
                      'Uncontrolled diabetes (A1C > 10)',
                      'Vision worse than 20/40 in either eye',
                      'Hearing loss that fails whisper test',
                      'Epilepsy or seizure disorder',
                      'Loss of limb (may qualify with waiver)',
                      'Insulin-dependent diabetes (requires waiver)',
                      'Heart attack in last 2 months',
                      'Uncontrolled high blood pressure (>180/110)',
                      'Current substance abuse',
                      'Mental illness affecting safe driving',
                      'Spinal injury affecting mobility',
                      'Sleep apnea (untreated)',
                    ].map((condition, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-red-500">•</span>
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Waivers */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Medical Waivers Available</h3>
                <p className="text-gray-700 mb-3">
                  The FMCSA offers exemption programs for certain conditions including:
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Vision deficiency (one eye, color blindness)</li>
                  <li>• Insulin-treated diabetes mellitus</li>
                  <li>• Seizure disorders (with documented control)</li>
                  <li>• Hearing deficiency</li>
                  <li>• Limb deficiency</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  We can help guide you through the exemption process if you don't initially qualify.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white border rounded-xl p-6 sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-4">Schedule Your DOT Physical</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Walk-ins welcome. Same-day certificates available.
                </p>
                <div className="space-y-3 mb-6 text-sm">
                  <div>
                    <div className="text-gray-500">Cost</div>
                    <div className="font-medium text-gray-900">$85</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Duration</div>
                    <div className="font-medium text-gray-900">30-45 minutes</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Certificate</div>
                    <div className="font-medium text-gray-900">Same day (if you pass)</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <a
                    href="https://www.patientfusion.com/doctor/jerry-lee-md-phd-08966"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 text-center"
                  >
                    Book Appointment
                  </a>
                  <a
                    href="tel:+17033614357"
                    className="block w-full px-4 py-2 bg-white text-gray-700 border rounded-lg font-medium hover:bg-gray-50 text-center"
                  >
                    Call (703) 361-4357
                  </a>
                </div>

                <hr className="my-6" />

                <h4 className="font-semibold text-gray-900 mb-3">Related Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/regulations/drug-testing" className="text-sm text-green-600 hover:underline flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      DOT Drug Testing Requirements
                    </Link>
                  </li>
                  <li>
                    <Link to="/regulations/alcohol-testing" className="text-sm text-green-600 hover:underline flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Alcohol Testing Requirements
                    </Link>
                  </li>
                  <li>
                    <Link to="/trucking" className="text-sm text-green-600 hover:underline flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Full DOT Compliance Services
                    </Link>
                  </li>
                  <li>
                    <a 
                      href="https://www.fmcsa.dot.gov/national-registry-certified-medical-examiners"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-600 hover:underline flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      FMCSA National Registry
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
