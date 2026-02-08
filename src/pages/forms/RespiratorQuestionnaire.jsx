import { useState, useEffect } from 'react';
import { Save, Download, FileText } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';
import { generateRespiratorQuestionnairePDF } from '../../utils/pdfGenerator';

export default function RespiratorQuestionnaire() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    jobTitle: '',
    phone: '',
    email: '',
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '',
    q7: '', q8: '', q9: '', q10: '', q11: '', q12: '',
    signature: null,
    date: new Date().toISOString().split('T')[0],
  });
  
  const [signatureRef, setSignatureRef] = useState(null);
  
  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('respiratorQuestionnaire');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('respiratorQuestionnaire', JSON.stringify(formData));
  }, [formData]);
  
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleExportPDF = () => {
    const data = { ...formData };
    if (signatureRef && !signatureRef.isEmpty()) {
      data.signature = signatureRef.toDataURL();
    }
    const doc = generateRespiratorQuestionnairePDF(data);
    doc.save(`Respirator-Questionnaire-${formData.name || 'form'}.pdf`);
  };
  
  const questions = [
    { id: 'q1', text: 'Do you currently smoke tobacco, or have you smoked tobacco in the last month?' },
    { id: 'q2', text: 'Have you ever had any of the following conditions: asthma, lung disease, emphysema?' },
    { id: 'q3', text: 'Do you currently have any of the following: breathing or lung problems?' },
    { id: 'q4', text: 'Have you ever had heart trouble, heart attack, or stroke?' },
    { id: 'q5', text: 'Do you currently have high blood pressure or take medicine for blood pressure?' },
    { id: 'q6', text: 'Have you ever had a seizure or epilepsy?' },
    { id: 'q7', text: 'Have you ever had diabetes?' },
    { id: 'q8', text: 'Have you ever had allergic reactions that interfere with breathing?' },
    { id: 'q9', text: 'Have you ever had claustrophobia or difficulty wearing a respirator?' },
    { id: 'q10', text: 'Have you ever had vision problems that interfere with your work?' },
    { id: 'q11', text: 'Have you ever had hearing problems?' },
    { id: 'q12', text: 'Have you ever had any back or joint problems?' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <img src="/altmed-logo.png" alt="AltMed Medical Center" className="h-16" />
            </div>
            <div className="flex-grow">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Respirator Medical Evaluation Questionnaire
              </h1>
              <p className="text-gray-600">OSHA Appendix C to §1910.134</p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>AltMed Medical Center</strong><br />
                8551 Rixlew Lane, Suite 140, Manassas, VA 20109<br />
                Phone: (703) 361-4357
              </p>
            </div>
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
        
        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Personal Info */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Part A: Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateField('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (inches)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => updateField('height', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (lbs)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => updateField('weight', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => updateField('jobTitle', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
          
          {/* Medical Questions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Part B: Medical Questionnaire</h2>
            <div className="space-y-6">
              {questions.map((q, i) => (
                <div key={q.id} className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    {i + 1}. {q.text}
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={q.id}
                        value="Yes"
                        checked={formData[q.id] === 'Yes'}
                        onChange={(e) => updateField(q.id, e.target.value)}
                        className="text-primary-600"
                      />
                      <span className="text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={q.id}
                        value="No"
                        checked={formData[q.id] === 'No'}
                        onChange={(e) => updateField(q.id, e.target.value)}
                        className="text-primary-600"
                      />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                  </div>
                  {formData[q.id] === 'Yes' && (
                    <div className="mt-3">
                      <label className="block text-xs text-gray-600 mb-1">Please provide details:</label>
                      <textarea
                        value={formData[`${q.id}_details`] || ''}
                        onChange={(e) => updateField(`${q.id}_details`, e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                        rows={2}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Signature */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Employee Certification</h2>
            <p className="text-sm text-gray-600 mb-4">
              I certify that the information provided above is true and accurate to the best of my knowledge.
            </p>
            <div className="border rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sign below:</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg bg-white">
                <SignatureCanvas
                  ref={(ref) => setSignatureRef(ref)}
                  canvasProps={{
                    className: 'w-full h-40'
                  }}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => signatureRef?.clear()}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear
                </button>
                <p className="text-xs text-gray-500">Date: {formData.date}</p>
              </div>
            </div>
          </div>
          
          {/* Submit */}
          <div className="flex justify-between items-center pt-6 border-t">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Save className="w-4 h-4" />
              <span>Auto-saved</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (confirm('Clear all form data?')) {
                    localStorage.removeItem('respiratorQuestionnaire');
                    window.location.reload();
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Clear Form
              </button>
              <button
                onClick={handleExportPDF}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
