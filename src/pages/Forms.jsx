import { Link } from 'react-router-dom';
import { FileText, Download, Edit, ExternalLink } from 'lucide-react';

const forms = {
  'Occupational Health': [
    { 
      name: 'Medical Exam Form (Police & Fire Fighters)', 
      url: 'https://altmedfirst.com/forms/Medical Exam Form 2018 forms.pdf',
      type: 'pdf'
    },
    { 
      name: 'New Patient Registration', 
      url: 'https://form.jotform.com/240354059307049',
      type: 'online'
    },
  ],
  'DOT Medical Clearance': [
    { 
      name: 'CMV Driver Medication Form (MCSA-5895)', 
      url: 'https://altmedfirst.com/forms/medical_clearance/MCSA-5895 Form 4-10-2020 508.pdf',
      type: 'pdf'
    },
    { 
      name: 'Vision Evaluation Report (MCSA-5871)', 
      url: 'https://altmedfirst.com/forms/medical_clearance/Vision Evaluation Report Form MCSA-5871_0.pdf',
      type: 'pdf'
    },
    { 
      name: 'Return to Duty / Work DOT Clearance', 
      url: 'https://altmedfirst.com/forms/medical_clearance/Return to Duty _ Work DOT Clearance Form.pdf',
      type: 'pdf'
    },
    { 
      name: 'Cardiac DOT Clearance', 
      url: 'https://altmedfirst.com/forms/medical_clearance/Cardiac DOT Clearance Form .pdf',
      type: 'pdf'
    },
    { 
      name: 'Medical DOT Clearance', 
      url: 'https://altmedfirst.com/forms/medical_clearance/Medical DOT Clearance Form.pdf',
      type: 'pdf'
    },
    { 
      name: 'Non-Insulin-Treated Diabetes DOT Clearance', 
      url: 'https://altmedfirst.com/forms/medical_clearance/Non-Insulin-Treated Diabetes DOT Clearance Form.pdf',
      type: 'pdf'
    },
    { 
      name: 'Insulin-Treated Diabetes Assessment (MCSA-5870)', 
      url: 'https://altmedfirst.com/forms/medical_clearance/Insulin-Treated Diabetes Mellitus Assessment Form MCSA-5870.pdf',
      type: 'pdf'
    },
    { 
      name: 'Hypertension DOT Clearance', 
      url: 'https://altmedfirst.com/forms/medical_clearance/Hypertension DOT Clearance Form.pdf',
      type: 'pdf'
    },
    { 
      name: 'Obstructive Sleep Apnea DOT Clearance', 
      url: 'https://altmedfirst.com/forms/medical_clearance/Obstructive Sleep Apnea DOT Clearance Form.pdf',
      type: 'pdf'
    },
  ],
  'Respirator Medical Evaluation': [
    { 
      name: 'Respirator Questionnaire (OSHA Appendix C)', 
      url: '/forms/respirator-questionnaire',
      type: 'digital',
      description: 'Digital form with PDF export - complete online'
    },
    { 
      name: 'Respirator Medical Clearance', 
      url: '/forms/respirator-clearance',
      type: 'digital',
      description: 'Completed by physician after evaluation'
    },
    { 
      name: 'Respirator Fit Test Record', 
      url: '/forms/respirator-fit-test',
      type: 'digital',
      description: 'Annual fit testing documentation'
    },
  ],
  'Addiction Management': [
    { 
      name: 'Suboxone New Patient Form', 
      url: 'https://form.jotform.com/230454861250148',
      type: 'online'
    },
    { 
      name: 'Suboxone Follow-Up', 
      url: 'https://form.jotform.com/230443970780054',
      type: 'online'
    },
  ],
  'Weight Loss Program': [
    { 
      name: 'New Patient Weight Loss Intake', 
      url: 'https://form.jotform.com/232264741654053',
      type: 'online'
    },
  ],
  'Wellness Programs': [
    { 
      name: 'IV Nutritional Therapy (Consent)', 
      url: 'https://form.jotform.com/240225387175053',
      type: 'online'
    },
    { 
      name: 'Testosterone Therapy (Consent)', 
      url: 'https://form.jotform.com/240244624960454',
      type: 'online'
    },
    { 
      name: 'Pain Management Follow-Up', 
      url: 'https://form.jotform.com/233404638270049',
      type: 'online'
    },
  ],
  'Medical Records & Authorization': [
    { 
      name: 'Company Authorization Form', 
      url: 'https://altmedfirst.com/forms/Company Authorization Form New.pdf',
      type: 'pdf'
    },
    { 
      name: 'Medical Records Request', 
      url: 'https://form.jotform.com/240274473187056',
      type: 'online'
    },
  ],
};

const getIcon = (type) => {
  switch (type) {
    case 'digital':
      return <Edit className="w-5 h-5 text-primary-600" />;
    case 'online':
      return <ExternalLink className="w-5 h-5 text-blue-600" />;
    case 'pdf':
    default:
      return <Download className="w-5 h-5 text-gray-600" />;
  }
};

const getTypeLabel = (type) => {
  switch (type) {
    case 'digital':
      return <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">Digital Form</span>;
    case 'online':
      return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Online Form</span>;
    case 'pdf':
    default:
      return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">PDF Download</span>;
  }
};

export default function Forms() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Patient Forms</h1>
          <p className="text-xl text-primary-200 max-w-2xl">
            Download or complete required forms before your visit to save time
          </p>
        </div>
      </section>

      {/* Forms */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-12">
            {Object.entries(forms).map(([category, categoryForms]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryForms.map((form, i) => (
                    <div key={i} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getIcon(form.type)}
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-medium text-gray-900 text-sm leading-tight">
                              {form.name}
                            </h3>
                            {getTypeLabel(form.type)}
                          </div>
                          {form.description && (
                            <p className="text-xs text-gray-500 mb-3">{form.description}</p>
                          )}
                          {form.type === 'digital' ? (
                            <Link
                              to={form.url}
                              className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                            >
                              Complete Form →
                            </Link>
                          ) : (
                            <a
                              href={form.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                            >
                              {form.type === 'pdf' ? 'Download PDF' : 'Open Form'} →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <FileText className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help with Forms?</h3>
                <p className="text-gray-700 mb-4">
                  If you have questions about which forms to complete or need assistance, 
                  our staff is happy to help.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:+17033614357"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Call (703) 361-4357
                  </a>
                  <Link
                    to="/contact"
                    className="px-4 py-2 bg-white text-gray-700 border rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
