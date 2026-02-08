import { useState, useEffect } from 'react';
import { Save, Download, FileText } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';
import { generateRespiratorClearancePDF } from '../../utils/pdfGenerator';

export default function RespiratorClearance() {
  const [formData, setFormData] = useState({
    // Employee Information (auto-populated from questionnaire ideally)
    employeeName: '',
    employeeId: '',
    dateOfBirth: '',
    jobTitle: '',
    department: '',
    employer: '',
    
    // Medical Evaluation
    evaluationDate: new Date().toISOString().split('T')[0],
    examPerformed: false,
    questionnaireReviewed: true,
    
    // Clearance Decision
    clearanceStatus: '', // cleared, cleared-restrictions, not-cleared
    restrictions: '',
    
    // Respirator Types Approved
    n95: false,
    halfFace: false,
    fullFace: false,
    papr: false,
    otherType: '',
    
    // Medical Conditions / Notes
    medicalNotes: '',
    
    // Re-evaluation
    reEvaluationRequired: false,
    reEvaluationDate: '',
    reEvaluationReason: '',
    
    // Physician Information
    physicianName: '',
    medicalLicense: '',
    physicianSignature: null,
    physicianDate: new Date().toISOString().split('T')[0],
  });
  
  const [signatureRef, setSignatureRef] = useState(null);
  
  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('respiratorClearance');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('respiratorClearance', JSON.stringify(formData));
  }, [formData]);
  
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleExportPDF = () => {
    const data = { ...formData };
    if (signatureRef && !signatureRef.isEmpty()) {
      data.physicianSignature = signatureRef.toDataURL();
    }
    const doc = generateRespiratorClearancePDF(data);
    doc.save(`Respirator-Clearance-${formData.employeeName || 'form'}.pdf`);
  };
  
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
                Respirator Medical Clearance Form
              </h1>
              <p className="text-gray-600">Physician Review & Authorization</p>
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
        
        {/* Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            <strong>For Clinic Use:</strong> This form is completed by a physician after reviewing 
            the employee's Respirator Questionnaire and conducting any necessary medical examination.
          </p>
        </div>
        
        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          
          {/* Section 1: Employee Information */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Section 1: Employee Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name *</label>
                <input
                  type="text"
                  value={formData.employeeName}
                  onChange={(e) => updateField('employeeName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Full legal name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => updateField('employeeId', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateField('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => updateField('jobTitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => updateField('department', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employer</label>
                <input
                  type="text"
                  value={formData.employer}
                  onChange={(e) => updateField('employer', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
          
          {/* Section 2: Medical Evaluation */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Section 2: Medical Evaluation</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Evaluation Date *</label>
                <input
                  type="date"
                  value={formData.evaluationDate}
                  onChange={(e) => updateField('evaluationDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.questionnaireReviewed}
                  onChange={(e) => updateField('questionnaireReviewed', e.target.checked)}
                  className="w-5 h-5 text-primary-600"
                />
                <span className="text-sm text-gray-700">Respirator Questionnaire Reviewed</span>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.examPerformed}
                  onChange={(e) => updateField('examPerformed', e.target.checked)}
                  className="w-5 h-5 text-primary-600"
                />
                <span className="text-sm text-gray-700">Physical Examination Performed</span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical Notes / Findings</label>
              <textarea
                value={formData.medicalNotes}
                onChange={(e) => updateField('medicalNotes', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Document any relevant medical findings, conditions, or concerns..."
              />
            </div>
          </div>
          
          {/* Section 3: Clearance Decision */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Section 3: Clearance Decision *</h2>
            
            <div className="space-y-3 mb-4">
              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                style={{ borderColor: formData.clearanceStatus === 'cleared' ? '#2563eb' : '#d1d5db' }}>
                <input
                  type="radio"
                  name="clearanceStatus"
                  value="cleared"
                  checked={formData.clearanceStatus === 'cleared'}
                  onChange={(e) => updateField('clearanceStatus', e.target.value)}
                  className="mt-1 w-5 h-5 text-primary-600"
                />
                <div>
                  <div className="font-medium text-gray-900">Cleared for Respirator Use</div>
                  <div className="text-sm text-gray-600">No restrictions or limitations</div>
                </div>
              </label>
              
              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                style={{ borderColor: formData.clearanceStatus === 'cleared-restrictions' ? '#2563eb' : '#d1d5db' }}>
                <input
                  type="radio"
                  name="clearanceStatus"
                  value="cleared-restrictions"
                  checked={formData.clearanceStatus === 'cleared-restrictions'}
                  onChange={(e) => updateField('clearanceStatus', e.target.value)}
                  className="mt-1 w-5 h-5 text-primary-600"
                />
                <div>
                  <div className="font-medium text-gray-900">Cleared with Restrictions</div>
                  <div className="text-sm text-gray-600">May use respirator with specified limitations</div>
                </div>
              </label>
              
              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                style={{ borderColor: formData.clearanceStatus === 'not-cleared' ? '#dc2626' : '#d1d5db' }}>
                <input
                  type="radio"
                  name="clearanceStatus"
                  value="not-cleared"
                  checked={formData.clearanceStatus === 'not-cleared'}
                  onChange={(e) => updateField('clearanceStatus', e.target.value)}
                  className="mt-1 w-5 h-5 text-red-600"
                />
                <div>
                  <div className="font-medium text-gray-900">Not Cleared</div>
                  <div className="text-sm text-gray-600">Medical reasons prevent respirator use</div>
                </div>
              </label>
            </div>
            
            {formData.clearanceStatus === 'cleared-restrictions' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Restrictions / Limitations *</label>
                <textarea
                  value={formData.restrictions}
                  onChange={(e) => updateField('restrictions', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Specify any restrictions (e.g., time limits, specific respirator types, environmental conditions)..."
                />
              </div>
            )}
          </div>
          
          {/* Section 4: Approved Respirator Types */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Section 4: Approved Respirator Types</h2>
            <p className="text-sm text-gray-600 mb-4">Select all respirator types the employee is cleared to use:</p>
            
            <div className="space-y-3 mb-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.n95}
                  onChange={(e) => updateField('n95', e.target.checked)}
                  className="w-5 h-5 text-primary-600"
                />
                <span className="text-sm text-gray-700">N95 / Filtering Facepiece Respirator</span>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.halfFace}
                  onChange={(e) => updateField('halfFace', e.target.checked)}
                  className="w-5 h-5 text-primary-600"
                />
                <span className="text-sm text-gray-700">Half-Face Respirator (Elastomeric)</span>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.fullFace}
                  onChange={(e) => updateField('fullFace', e.target.checked)}
                  className="w-5 h-5 text-primary-600"
                />
                <span className="text-sm text-gray-700">Full-Face Respirator (Elastomeric)</span>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.papr}
                  onChange={(e) => updateField('papr', e.target.checked)}
                  className="w-5 h-5 text-primary-600"
                />
                <span className="text-sm text-gray-700">PAPR (Powered Air-Purifying Respirator)</span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Other Respirator Type</label>
              <input
                type="text"
                value={formData.otherType}
                onChange={(e) => updateField('otherType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Specify if not listed above..."
              />
            </div>
          </div>
          
          {/* Section 5: Re-evaluation */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Section 5: Re-evaluation Requirements</h2>
            
            <label className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={formData.reEvaluationRequired}
                onChange={(e) => updateField('reEvaluationRequired', e.target.checked)}
                className="w-5 h-5 text-primary-600"
              />
              <span className="text-sm font-medium text-gray-700">Re-evaluation Required</span>
            </label>
            
            {formData.reEvaluationRequired && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Re-evaluation Date</label>
                  <input
                    type="date"
                    value={formData.reEvaluationDate}
                    onChange={(e) => updateField('reEvaluationDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Re-evaluation</label>
                  <textarea
                    value={formData.reEvaluationReason}
                    onChange={(e) => updateField('reEvaluationReason', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="E.g., monitor medical condition, verify symptom resolution, annual review..."
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Section 6: Physician Certification */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Section 6: Physician Certification</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Physician Name *</label>
                <input
                  type="text"
                  value={formData.physicianName}
                  onChange={(e) => updateField('physicianName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Dr. Gerald K. Lee, M.D., Ph.D."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical License Number *</label>
                <input
                  type="text"
                  value={formData.medicalLicense}
                  onChange={(e) => updateField('medicalLicense', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  value={formData.physicianDate}
                  onChange={(e) => updateField('physicianDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Physician Signature *</label>
              <div className="border-2 border-gray-300 rounded-lg bg-white">
                <SignatureCanvas
                  ref={(ref) => setSignatureRef(ref)}
                  canvasProps={{
                    className: 'w-full h-40 cursor-crosshair',
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => signatureRef?.clear()}
                className="mt-2 text-sm text-gray-600 hover:text-gray-900"
              >
                Clear Signature
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">
                I certify that I have reviewed the employee's medical questionnaire and/or conducted a medical examination. 
                Based on this review, I have determined the employee's medical ability to use respiratory protective equipment 
                as indicated above.
              </p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleExportPDF}
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export as PDF
            </button>
            
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Clear all form data? This cannot be undone.')) {
                  localStorage.removeItem('respiratorClearance');
                  window.location.reload();
                }
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Clear Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
