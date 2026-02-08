import { useState, useEffect } from 'react';
import { Save, Download, FileText, Camera } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';
import { generateRespiratorFitTestPDF } from '../../utils/pdfGenerator';

export default function RespiratorFitTest() {
  const [formData, setFormData] = useState({
    // Employee Information
    employeeName: '',
    employeeId: '',
    dateOfBirth: '',
    jobTitle: '',
    department: '',
    employer: '',
    
    // Respirator Information
    respiratorMake: '',
    respiratorModel: '',
    respiratorSize: '',
    
    // Test Information
    testDate: new Date().toISOString().split('T')[0],
    testMethod: '', // qualitative or quantitative
    testProtocol: '', // bitrex, saccharin, irritant-smoke, portacount
    fitFactor: '',
    
    // Test Exercises (all must pass)
    exercise1_normalBreathing: false,
    exercise2_deepBreathing: false,
    exercise3_headSideToSide: false,
    exercise4_headUpDown: false,
    exercise5_talking: false,
    exercise6_grimace: false,
    exercise7_bendingOver: false,
    exercise8_normalBreathing: false,
    
    // Result
    testResult: '', // pass or fail
    failureReason: '',
    
    // Photos
    photoData: null, // Base64 image data
    
    // Next Test Due
    nextTestDue: '',
    
    // Technician Information
    technicianName: '',
    technicianCertification: '',
    technicianSignature: null,
    technicianDate: new Date().toISOString().split('T')[0],
  });
  
  const [signatureRef, setSignatureRef] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  
  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('respiratorFitTest');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed);
      if (parsed.photoData) {
        setPhotoPreview(parsed.photoData);
      }
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('respiratorFitTest', JSON.stringify(formData));
  }, [formData]);
  
  // Auto-calculate next test date (1 year from test date)
  useEffect(() => {
    if (formData.testDate) {
      const testDate = new Date(formData.testDate);
      const nextYear = new Date(testDate);
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      updateField('nextTestDue', nextYear.toISOString().split('T')[0]);
    }
  }, [formData.testDate]);
  
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        updateField('photoData', base64);
        setPhotoPreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleExportPDF = () => {
    const data = { ...formData };
    if (signatureRef && !signatureRef.isEmpty()) {
      data.technicianSignature = signatureRef.toDataURL();
    }
    const doc = generateRespiratorFitTestPDF(data);
    doc.save(`Respirator-FitTest-${formData.employeeName || 'form'}.pdf`);
  };
  
  const allExercisesPassed = 
    formData.exercise1_normalBreathing &&
    formData.exercise2_deepBreathing &&
    formData.exercise3_headSideToSide &&
    formData.exercise4_headUpDown &&
    formData.exercise5_talking &&
    formData.exercise6_grimace &&
    formData.exercise7_bendingOver &&
    formData.exercise8_normalBreathing;
  
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
                Respirator Fit Test Record
              </h1>
              <p className="text-gray-600">OSHA 29 CFR 1910.134 Annual Fit Testing</p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>AltMed Medical Center</strong><br />
                8551 Rixlew Lane, Suite 140, Manassas, VA 20109<br />
                Phone: (703) 361-4357
              </p>
            </div>
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
        
        {/* Alert */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            <strong>For Clinic Use:</strong> This form documents respirator fit testing results. 
            Fit testing is required annually and whenever there is a change in respirator model/size or 
            significant facial changes (weight, dental work, etc.).
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Full legal name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => updateField('employeeId', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateField('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => updateField('jobTitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => updateField('department', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employer</label>
                <input
                  type="text"
                  value={formData.employer}
                  onChange={(e) => updateField('employer', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
          
          {/* Section 2: Respirator Information */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Section 2: Respirator Information</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Make/Manufacturer *</label>
                <input
                  type="text"
                  value={formData.respiratorMake}
                  onChange={(e) => updateField('respiratorMake', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 3M, Moldex"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model Number *</label>
                <input
                  type="text"
                  value={formData.respiratorModel}
                  onChange={(e) => updateField('respiratorModel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 8210, 2730N95"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size *</label>
                <select
                  value={formData.respiratorSize}
                  onChange={(e) => updateField('respiratorSize', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Universal">Universal</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Section 3: Test Information */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Section 3: Test Information</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Test Date *</label>
                <input
                  type="date"
                  value={formData.testDate}
                  onChange={(e) => updateField('testDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Next Test Due</label>
                <input
                  type="date"
                  value={formData.nextTestDue}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-calculated (1 year from test date)</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Test Method *</label>
                <select
                  value={formData.testMethod}
                  onChange={(e) => updateField('testMethod', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select method</option>
                  <option value="qualitative">Qualitative (Taste/Smell Test)</option>
                  <option value="quantitative">Quantitative (Machine Measurement)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Test Protocol *</label>
                <select
                  value={formData.testProtocol}
                  onChange={(e) => updateField('testProtocol', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select protocol</option>
                  <optgroup label="Qualitative">
                    <option value="bitrex">Bitrex (Bitter)</option>
                    <option value="saccharin">Saccharin (Sweet)</option>
                    <option value="irritant-smoke">Irritant Smoke</option>
                  </optgroup>
                  <optgroup label="Quantitative">
                    <option value="portacount">PortaCount</option>
                    <option value="cnp">Controlled Negative Pressure (CNP)</option>
                  </optgroup>
                </select>
              </div>
            </div>
            
            {formData.testMethod === 'quantitative' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fit Factor (Quantitative Tests Only)
                </label>
                <input
                  type="number"
                  value={formData.fitFactor}
                  onChange={(e) => updateField('fitFactor', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 150"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Required minimum: Half-face = 100, Full-face = 500
                </p>
              </div>
            )}
          </div>
          
          {/* Section 4: Test Exercises */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Section 4: Fit Test Exercises *</h2>
            <p className="text-sm text-gray-600 mb-4">
              Employee must successfully complete all exercises without breaking the respirator seal. 
              Check each exercise as passed.
            </p>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.exercise1_normalBreathing}
                  onChange={(e) => updateField('exercise1_normalBreathing', e.target.checked)}
                  className="w-5 h-5 text-green-600"
                />
                <div className="flex-grow">
                  <div className="font-medium text-gray-900">1. Normal Breathing</div>
                  <div className="text-sm text-gray-600">Breathe normally for 1 minute</div>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.exercise2_deepBreathing}
                  onChange={(e) => updateField('exercise2_deepBreathing', e.target.checked)}
                  className="w-5 h-5 text-green-600"
                />
                <div className="flex-grow">
                  <div className="font-medium text-gray-900">2. Deep Breathing</div>
                  <div className="text-sm text-gray-600">Take slow, deep breaths for 1 minute</div>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.exercise3_headSideToSide}
                  onChange={(e) => updateField('exercise3_headSideToSide', e.target.checked)}
                  className="w-5 h-5 text-green-600"
                />
                <div className="flex-grow">
                  <div className="font-medium text-gray-900">3. Head Side to Side</div>
                  <div className="text-sm text-gray-600">Turn head slowly from side to side</div>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.exercise4_headUpDown}
                  onChange={(e) => updateField('exercise4_headUpDown', e.target.checked)}
                  className="w-5 h-5 text-green-600"
                />
                <div className="flex-grow">
                  <div className="font-medium text-gray-900">4. Head Up and Down</div>
                  <div className="text-sm text-gray-600">Move head slowly up and down</div>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.exercise5_talking}
                  onChange={(e) => updateField('exercise5_talking', e.target.checked)}
                  className="w-5 h-5 text-green-600"
                />
                <div className="flex-grow">
                  <div className="font-medium text-gray-900">5. Talking</div>
                  <div className="text-sm text-gray-600">Talk out loud or read passage aloud</div>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.exercise6_grimace}
                  onChange={(e) => updateField('exercise6_grimace', e.target.checked)}
                  className="w-5 h-5 text-green-600"
                />
                <div className="flex-grow">
                  <div className="font-medium text-gray-900">6. Grimace</div>
                  <div className="text-sm text-gray-600">Make facial expressions (smile, frown)</div>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.exercise7_bendingOver}
                  onChange={(e) => updateField('exercise7_bendingOver', e.target.checked)}
                  className="w-5 h-5 text-green-600"
                />
                <div className="flex-grow">
                  <div className="font-medium text-gray-900">7. Bending Over</div>
                  <div className="text-sm text-gray-600">Bend at waist, touch toes</div>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.exercise8_normalBreathing}
                  onChange={(e) => updateField('exercise8_normalBreathing', e.target.checked)}
                  className="w-5 h-5 text-green-600"
                />
                <div className="flex-grow">
                  <div className="font-medium text-gray-900">8. Normal Breathing (Final)</div>
                  <div className="text-sm text-gray-600">Return to normal breathing</div>
                </div>
              </label>
            </div>
            
            {allExercisesPassed && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800">
                  ✅ All exercises completed successfully
                </p>
              </div>
            )}
          </div>
          
          {/* Section 5: Test Result */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Section 5: Test Result *</h2>
            
            <div className="space-y-3 mb-4">
              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                style={{ borderColor: formData.testResult === 'pass' ? '#10b981' : '#d1d5db' }}>
                <input
                  type="radio"
                  name="testResult"
                  value="pass"
                  checked={formData.testResult === 'pass'}
                  onChange={(e) => updateField('testResult', e.target.value)}
                  className="mt-1 w-5 h-5 text-green-600"
                />
                <div>
                  <div className="font-medium text-gray-900">✅ PASS</div>
                  <div className="text-sm text-gray-600">
                    Employee successfully completed all exercises with proper seal
                  </div>
                </div>
              </label>
              
              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                style={{ borderColor: formData.testResult === 'fail' ? '#ef4444' : '#d1d5db' }}>
                <input
                  type="radio"
                  name="testResult"
                  value="fail"
                  checked={formData.testResult === 'fail'}
                  onChange={(e) => updateField('testResult', e.target.value)}
                  className="mt-1 w-5 h-5 text-red-600"
                />
                <div>
                  <div className="font-medium text-gray-900">❌ FAIL</div>
                  <div className="text-sm text-gray-600">
                    Seal was broken or employee detected test agent
                  </div>
                </div>
              </label>
            </div>
            
            {formData.testResult === 'fail' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Failure *</label>
                <textarea
                  value={formData.failureReason}
                  onChange={(e) => updateField('failureReason', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Detected bitter taste during talking exercise; recommend trying different size/model..."
                />
              </div>
            )}
          </div>
          
          {/* Section 6: Photo Documentation */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Section 6: Photo Documentation</h2>
            <p className="text-sm text-gray-600 mb-4">
              Upload a photo of the employee wearing the fitted respirator (optional but recommended).
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block">
                  <div className="flex items-center justify-center w-full h-48 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-green-400 focus:outline-none">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Respirator fit" className="max-h-full" />
                    ) : (
                      <div className="flex flex-col items-center space-y-2">
                        <Camera className="w-8 h-8 text-gray-400" />
                        <span className="font-medium text-gray-600">
                          Click to upload photo
                        </span>
                        <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                
                {photoPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      updateField('photoData', null);
                      setPhotoPreview(null);
                    }}
                    className="mt-2 text-sm text-red-600 hover:text-red-700"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Section 7: Technician Certification */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Section 7: Technician Certification</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Technician Name *</label>
                <input
                  type="text"
                  value={formData.technicianName}
                  onChange={(e) => updateField('technicianName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certification / Training *
                </label>
                <input
                  type="text"
                  value={formData.technicianCertification}
                  onChange={(e) => updateField('technicianCertification', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., OSHA Fit Test Certified"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  value={formData.technicianDate}
                  onChange={(e) => updateField('technicianDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Technician Signature *</label>
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
                I certify that I am trained in proper fit testing procedures and that I have conducted this fit test 
                in accordance with OSHA 29 CFR 1910.134 requirements. The results documented above are accurate.
              </p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleExportPDF}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export as PDF
            </button>
            
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Clear all form data? This cannot be undone.')) {
                  localStorage.removeItem('respiratorFitTest');
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
