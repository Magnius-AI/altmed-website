import { Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, FileText, Clock } from 'lucide-react';

export default function DrugTesting() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 mb-4">
            <FileText className="w-5 h-5" />
            <span className="font-medium">DOT Regulations</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">DOT Drug Testing Requirements</h1>
          <p className="text-xl text-blue-200 max-w-2xl">
            Complete guide to FMCSA drug testing requirements under 49 CFR Part 40
          </p>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-8 bg-blue-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Random Testing Rate', value: '50% Annual' },
              { label: 'Test Panel', value: '5-Drug DOT' },
              { label: 'Lab Certification', value: 'SAMHSA Required' },
              { label: 'MRO Review', value: 'Mandatory' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-blue-600">{item.value}</div>
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
              {/* When Testing Required */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">When Drug Testing is Required</h2>
                <div className="space-y-4">
                  <div className="bg-white border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-blue-600">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Pre-Employment</h3>
                        <p className="text-sm text-gray-600">
                          Required before a driver operates a CMV for the first time. Must be conducted after 
                          a conditional offer of employment. Driver cannot perform safety-sensitive functions 
                          until receiving a negative test result.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-blue-600">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Random Testing</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Minimum 50% of average number of driver positions must be tested annually. 
                          Selection must be truly random and unpredictable.
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• No advance notice to drivers</li>
                          <li>• Tests spread reasonably throughout year</li>
                          <li>• Driver must proceed immediately to collection site</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Post-Accident</h3>
                        <p className="text-sm text-gray-600 mb-2">Required when:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Fatal accident (test all drivers)</li>
                          <li>• Citation issued + injury requiring medical treatment away from scene</li>
                          <li>• Citation issued + vehicle towed from scene</li>
                        </ul>
                        <p className="text-xs text-orange-600 mt-2">
                          <Clock className="inline w-3 h-3 mr-1" />
                          Must test within 8 hours (alcohol) or 32 hours (drugs) if possible
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-red-600">!</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Reasonable Suspicion</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          When supervisor trained in detection observes behavior or appearance indicating drug use.
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Must be based on specific, contemporaneous observations</li>
                          <li>• Supervisor must document observations in writing</li>
                          <li>• Test must be conducted as soon as possible</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-yellow-600">R</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Return-to-Duty</h3>
                        <p className="text-sm text-gray-600">
                          After a driver violates drug/alcohol regulations, they must complete SAP evaluation 
                          and treatment, then pass a return-to-duty test before resuming safety-sensitive functions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Follow-Up Testing</h3>
                        <p className="text-sm text-gray-600">
                          After return-to-duty, minimum of 6 unannounced tests during first 12 months. 
                          SAP may require follow-up for up to 5 years.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5-Panel Test */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">DOT 5-Panel Drug Test</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-4">
                    All DOT drug tests use a standardized 5-panel test. Testing for any other substances 
                    (beyond these five) is not permitted under DOT regulations.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { 
                        drug: 'Marijuana (THC)', 
                        cutoff: '50 ng/mL (screen) / 15 ng/mL (confirm)',
                        detection: '1-30 days depending on use'
                      },
                      { 
                        drug: 'Cocaine', 
                        cutoff: '150 ng/mL (screen) / 100 ng/mL (confirm)',
                        detection: '2-4 days'
                      },
                      { 
                        drug: 'Amphetamines', 
                        cutoff: '500 ng/mL (screen) / 250 ng/mL (confirm)',
                        detection: '1-3 days',
                        note: 'Includes methamphetamine, MDMA (ecstasy)'
                      },
                      { 
                        drug: 'Opioids', 
                        cutoff: 'Varies by substance',
                        detection: '1-3 days',
                        note: 'Codeine, morphine, heroin, oxycodone, hydrocodone'
                      },
                      { 
                        drug: 'Phencyclidine (PCP)', 
                        cutoff: '25 ng/mL (screen) / 25 ng/mL (confirm)',
                        detection: '7-14 days'
                      },
                    ].map((item, i) => (
                      <div key={i} className="bg-white rounded-lg p-4 border">
                        <div className="font-semibold text-gray-900 mb-1">{i + 1}. {item.drug}</div>
                        <div className="text-xs text-gray-600">Cutoff: {item.cutoff}</div>
                        <div className="text-xs text-gray-600">Detection: {item.detection}</div>
                        {item.note && <div className="text-xs text-blue-600 mt-1">({item.note})</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Collection Process */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Collection Process</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">1. Chain of Custody</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Federal CCF (Custody and Control Form) required</li>
                      <li>• Driver provides photo ID</li>
                      <li>• Split specimen collected (Bottle A & Bottle B)</li>
                      <li>• Driver initials specimens and seals</li>
                      <li>• Donor and collector sign CCF</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">2. Collection Site Requirements</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Must be private and secure</li>
                      <li>• Water source disabled or bluing agent added</li>
                      <li>• Minimum 45mL specimen required</li>
                      <li>• Temperature must be 90-100°F within 4 minutes</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">3. Laboratory Analysis</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Only SAMHSA-certified labs may test</li>
                      <li>• Initial immunoassay screening</li>
                      <li>• Positive screens confirmed by GC/MS</li>
                      <li>• Results sent to MRO, not employer</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">4. MRO Review</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Licensed physician reviews all results</li>
                      <li>• Contacts driver for positive/adulterated/substituted results</li>
                      <li>• Reviews legitimate medical explanations</li>
                      <li>• Makes final determination (positive/negative)</li>
                      <li>• Reports result to employer</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Consequences */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-red-900 mb-4">
                  <AlertTriangle className="inline w-6 h-6 mr-2" />
                  Consequences of Positive Test or Refusal
                </h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>Immediate removal from safety-sensitive functions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>Required SAP (Substance Abuse Professional) evaluation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>Complete treatment program recommended by SAP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>Pass return-to-duty test</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>Subject to follow-up testing (minimum 6 tests in 12 months)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>Violation stays on record for 3 years minimum</span>
                  </li>
                </ul>
                <p className="text-sm text-red-700 mt-4 font-medium">
                  Refusing to test is treated the same as a positive result.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white border rounded-xl p-6 sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-4">Drug Testing Services</h3>
                <p className="text-sm text-gray-600 mb-4">
                  SAMHSA-certified lab, MRO review included.
                </p>
                <div className="space-y-3 mb-6 text-sm">
                  <div>
                    <div className="text-gray-500">5-Panel DOT</div>
                    <div className="font-medium text-gray-900">$45</div>
                  </div>
                  <div>
                    <div className="text-gray-500">10-Panel DOT</div>
                    <div className="font-medium text-gray-900">$55</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Rapid Test</div>
                    <div className="font-medium text-gray-900">$35</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <a
                    href="tel:+17033614357"
                    className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-center"
                  >
                    Call (703) 361-4357
                  </a>
                </div>

                <hr className="my-6" />

                <h4 className="font-semibold text-gray-900 mb-3">Related Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/regulations/dot-physical" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      DOT Physical Requirements
                    </Link>
                  </li>
                  <li>
                    <Link to="/regulations/alcohol-testing" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Alcohol Testing Requirements
                    </Link>
                  </li>
                  <li>
                    <Link to="/trucking" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Random Testing Pool Setup
                    </Link>
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
