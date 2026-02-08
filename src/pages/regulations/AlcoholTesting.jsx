import { Link } from 'react-router-dom';
import { AlertTriangle, FileText, Clock, Ban } from 'lucide-react';

export default function AlcoholTesting() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-900 via-orange-800 to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-orange-300 mb-4">
            <FileText className="w-5 h-5" />
            <span className="font-medium">DOT Regulations</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">DOT Alcohol Testing Requirements</h1>
          <p className="text-xl text-orange-200 max-w-2xl">
            Breath Alcohol Testing (BAT) requirements under 49 CFR Part 382
          </p>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-8 bg-orange-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Random Testing Rate', value: '10% Annual' },
              { label: 'Prohibition Level', value: '0.04% BAC' },
              { label: 'Removal Threshold', value: '0.02% BAC' },
              { label: 'Wait Time', value: '15 Minutes' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-orange-600">{item.value}</div>
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
              {/* BAC Limits */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  <Ban className="inline w-6 h-6 mr-2 text-red-600" />
                  Blood Alcohol Concentration (BAC) Limits
                </h2>
                <div className="space-y-4">
                  <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl font-bold text-red-600">0.04%</div>
                      <div>
                        <h3 className="font-semibold text-red-900 mb-2">Prohibition - DOT Violation</h3>
                        <p className="text-sm text-gray-700">
                          Drivers with BAC of 0.04% or higher are in violation of DOT regulations. 
                          This results in:
                        </p>
                        <ul className="text-sm text-gray-700 mt-2 space-y-1">
                          <li>• Immediate removal from safety-sensitive functions</li>
                          <li>• Required SAP evaluation and treatment</li>
                          <li>• Return-to-duty test required before resuming work</li>
                          <li>• Follow-up testing for 1-5 years</li>
                          <li>• Violation recorded for minimum 3 years</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl font-bold text-yellow-600">0.02-0.039%</div>
                      <div>
                        <h3 className="font-semibold text-yellow-900 mb-2">Removal from Duty</h3>
                        <p className="text-sm text-gray-700">
                          Driver must be removed from safety-sensitive functions for 24 hours minimum. 
                          Not a DOT violation, but:
                        </p>
                        <ul className="text-sm text-gray-700 mt-2 space-y-1">
                          <li>• Cannot perform safety-sensitive functions for at least 24 hours</li>
                          <li>• May be sent home or assigned non-driving duties</li>
                          <li>• No return-to-duty test required (unless company policy)</li>
                          <li>• Employer may have stricter policies</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-300 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl font-bold text-green-600">&lt;0.02%</div>
                      <div>
                        <h3 className="font-semibold text-green-900 mb-2">Below Detection Threshold</h3>
                        <p className="text-sm text-gray-700">
                          Considered a negative test. Driver may continue performing safety-sensitive functions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* When Testing Required */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">When Alcohol Testing is Required</h2>
                <div className="space-y-4">
                  <div className="bg-white border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Random Testing</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Minimum 10% of average number of driver positions must be tested annually.
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Selection must be unpredictable and unannounced</li>
                      <li>• Must be performed just before, during, or just after safety-sensitive functions</li>
                      <li>• Tests spread reasonably throughout year</li>
                    </ul>
                  </div>

                  <div className="bg-white border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Post-Accident</h3>
                    <p className="text-sm text-gray-600 mb-2">Required after:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Fatal accident (test all surviving drivers)</li>
                      <li>• Citation issued + injury requiring immediate medical treatment</li>
                      <li>• Citation issued + vehicle disabled/towed</li>
                    </ul>
                    <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Must test within 8 hours if possible (or document why not)
                    </p>
                  </div>

                  <div className="bg-white border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Reasonable Suspicion</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      When trained supervisor observes alcohol-related behavior or appearance.
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Based on specific, contemporaneous observations</li>
                      <li>• Test must be conducted just before, during, or just after duty</li>
                      <li>• If test not administered within 2 hours, document why</li>
                      <li>• If not tested within 8 hours, cease attempts and document</li>
                    </ul>
                  </div>

                  <div className="bg-white border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Return-to-Duty</h3>
                    <p className="text-sm text-gray-600">
                      Required after a driver violates alcohol regulations. Must complete SAP process 
                      and pass test before resuming safety-sensitive functions.
                    </p>
                  </div>

                  <div className="bg-white border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Follow-Up Testing</h3>
                    <p className="text-sm text-gray-600">
                      After return-to-duty, minimum of 6 unannounced tests in first 12 months. 
                      May continue up to 60 months as determined by SAP.
                    </p>
                  </div>
                </div>
              </div>

              {/* Testing Procedure */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Two-Step Testing Procedure</h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-900 mb-3">Step 1: Screening Test</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Conducted by trained Breath Alcohol Technician (BAT)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Uses DOT-approved Evidential Breath Testing (EBT) device</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Driver provides breath sample into device</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>If result is &lt;0.02%, test is complete (negative)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>If ≥0.02%, proceed to confirmation test</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h3 className="font-semibold text-orange-900 mb-3">Step 2: Confirmation Test (if screening ≥0.02%)</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600">•</span>
                        <span>
                          <strong>15-minute waiting period</strong> - Driver must wait under BAT observation
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600">•</span>
                        <span>No eating, drinking, smoking, or putting anything in mouth during wait</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600">•</span>
                        <span>New mouthpiece used for confirmation test</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600">•</span>
                        <span>Confirmation result is the final result</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600">•</span>
                        <span>Driver signs Alcohol Testing Form</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600">•</span>
                        <span>Copy provided to driver immediately</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* BAT Requirements */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Breath Alcohol Technician (BAT) Requirements</h2>
                <div className="bg-gray-50 border rounded-lg p-6">
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">✓</span>
                      <span>Must be trained in DOT alcohol testing procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">✓</span>
                      <span>Must proficiently operate EBT device</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">✓</span>
                      <span>Must complete quality assurance procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">✓</span>
                      <span>Cannot be tested employee's supervisor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">✓</span>
                      <span>Maintains confidentiality of test results</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* EBT Device */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Evidential Breath Testing (EBT) Device</h2>
                <div className="bg-gray-50 border rounded-lg p-6">
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">✓</span>
                      <span>Must be on NHTSA Conforming Products List</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">✓</span>
                      <span>Must print results (or store electronically and print)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">✓</span>
                      <span>Must assign unique sequential number to each test</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">✓</span>
                      <span>Must print name of manufacturer, device serial number</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">✓</span>
                      <span>Must distinguish screening from confirmation tests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">✓</span>
                      <span>Regular calibration and quality control checks required</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Prohibited Conduct */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-red-900 mb-4">
                  <AlertTriangle className="inline w-6 h-6 mr-2" />
                  Prohibited Conduct for Drivers
                </h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Use of alcohol while performing safety-sensitive functions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Use of alcohol within 4 hours of performing safety-sensitive functions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Reporting for duty or remaining on duty with BAC ≥ 0.04%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Use of alcohol for 8 hours after accident (or until tested)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Refusing to submit to a required test</span>
                  </li>
                </ul>
                <p className="text-sm text-red-700 mt-4 font-medium">
                  Violation of any of these prohibitions results in removal from duty and SAP process.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white border rounded-xl p-6 sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-4">Alcohol Testing Services</h3>
                <p className="text-sm text-gray-600 mb-4">
                  DOT-certified BAT technicians, EBT devices on NHTSA list.
                </p>
                <div className="space-y-3 mb-6 text-sm">
                  <div>
                    <div className="text-gray-500">Breath Alcohol Test</div>
                    <div className="font-medium text-gray-900">$35</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Duration</div>
                    <div className="font-medium text-gray-900">15-30 minutes</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Results</div>
                    <div className="font-medium text-gray-900">Immediate</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <a
                    href="tel:+17033614357"
                    className="block w-full px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 text-center"
                  >
                    Call (703) 361-4357
                  </a>
                </div>

                <hr className="my-6" />

                <h4 className="font-semibold text-gray-900 mb-3">Related Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/regulations/dot-physical" className="text-sm text-orange-600 hover:underline flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      DOT Physical Requirements
                    </Link>
                  </li>
                  <li>
                    <Link to="/regulations/drug-testing" className="text-sm text-orange-600 hover:underline flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Drug Testing Requirements
                    </Link>
                  </li>
                  <li>
                    <Link to="/trucking" className="text-sm text-orange-600 hover:underline flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Full DOT Compliance Services
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
