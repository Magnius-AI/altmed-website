import jsPDF from 'jspdf';
import 'jspdf-autotable';

// AltMed Medical Center Logo
const LOGO_PATH = '/altmed-logo.png';

export const generateRespiratorQuestionnairePDF = (formData) => {
  const doc = new jsPDF();
  
  // Header with logo
  doc.addImage(LOGO_PATH, 'PNG', 10, 10, 40, 20);
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text('AltMed Medical Center', 45, 20);
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('8551 Rixlew Lane, Suite 140, Manassas, VA 20109', 45, 27);
  doc.text('Phone: (703) 361-4357', 45, 32);
  
  // Title
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('RESPIRATOR MEDICAL EVALUATION QUESTIONNAIRE', 105, 45, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('OSHA Appendix C to §1910.134', 105, 51, { align: 'center' });
  
  // Personal Information
  let yPos = 60;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('PART A: Personal Information', 10, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Name: ${formData.name || ''}`, 10, yPos);
  yPos += 6;
  doc.text(`Date of Birth: ${formData.dateOfBirth || ''}`, 10, yPos);
  doc.text(`Height: ${formData.height || ''} in`, 110, yPos);
  doc.text(`Weight: ${formData.weight || ''} lbs`, 150, yPos);
  yPos += 6;
  doc.text(`Job Title: ${formData.jobTitle || ''}`, 10, yPos);
  yPos += 6;
  doc.text(`Phone: ${formData.phone || ''}`, 10, yPos);
  doc.text(`Email: ${formData.email || ''}`, 110, yPos);
  yPos += 10;
  
  // Medical Questions
  doc.setFont(undefined, 'bold');
  doc.text('PART B: Medical Questionnaire', 10, yPos);
  yPos += 8;
  doc.setFont(undefined, 'normal');
  
  const questions = [
    { q: '1. Do you currently smoke tobacco, or have you smoked tobacco in the last month?', key: 'q1' },
    { q: '2. Have you ever had any of the following conditions: asthma, lung disease, emphysema?', key: 'q2' },
    { q: '3. Do you currently have any of the following: breathing or lung problems?', key: 'q3' },
    { q: '4. Have you ever had heart trouble, heart attack, or stroke?', key: 'q4' },
    { q: '5. Do you currently have high blood pressure or take medicine for blood pressure?', key: 'q5' },
    { q: '6. Have you ever had a seizure or epilepsy?', key: 'q6' },
    { q: '7. Have you ever had diabetes?', key: 'q7' },
    { q: '8. Have you ever had allergic reactions that interfere with breathing?', key: 'q8' },
    { q: '9. Have you ever had claustrophobia or difficulty wearing a respirator?', key: 'q9' },
    { q: '10. Have you ever had vision problems that interfere with your work?', key: 'q10' },
    { q: '11. Have you ever had hearing problems?', key: 'q11' },
    { q: '12. Have you ever had any back or joint problems?', key: 'q12' },
  ];
  
  questions.forEach((item) => {
    if (yPos > 260) {
      doc.addPage();
      yPos = 20;
    }
    const answer = formData[item.key] || 'Not answered';
    doc.text(item.q, 10, yPos, { maxWidth: 150 });
    doc.setFont(undefined, 'bold');
    doc.text(`${answer}`, 165, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 8;
    
    if (answer === 'Yes' && formData[`${item.key}_details`]) {
      doc.setFontSize(9);
      doc.text(`  Details: ${formData[`${item.key}_details`]}`, 10, yPos, { maxWidth: 180 });
      yPos += 6;
      doc.setFontSize(10);
    }
  });
  
  // Signature
  if (yPos > 240) {
    doc.addPage();
    yPos = 20;
  }
  yPos += 10;
  doc.setFont(undefined, 'bold');
  doc.text('EMPLOYEE CERTIFICATION', 10, yPos);
  yPos += 8;
  doc.setFont(undefined, 'normal');
  doc.text('I certify that the information provided above is true and accurate to the best of my knowledge.', 10, yPos, { maxWidth: 180 });
  yPos += 12;
  
  if (formData.signature) {
    doc.addImage(formData.signature, 'PNG', 10, yPos, 60, 20);
  }
  doc.line(10, yPos + 20, 80, yPos + 20);
  doc.text('Employee Signature', 10, yPos + 25);
  doc.line(120, yPos + 20, 170, yPos + 20);
  doc.text(`Date: ${formData.date || new Date().toLocaleDateString()}`, 120, yPos + 25);
  
  return doc;
};

export const generateRespiratorClearancePDF = (formData) => {
  const doc = new jsPDF();
  
  // Header with logo
  doc.addImage(LOGO_PATH, 'PNG', 10, 10, 40, 20);
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text('AltMed Medical Center', 45, 20);
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('8551 Rixlew Lane, Suite 140, Manassas, VA 20109', 45, 27);
  doc.text('Phone: (703) 361-4357', 45, 32);
  
  // Title
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('RESPIRATOR MEDICAL CLEARANCE FORM', 105, 45, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('Physician Review & Authorization', 105, 51, { align: 'center' });
  
  let yPos = 60;
  
  // Section 1: Employee Information
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Section 1: Employee Information', 10, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Name: ${formData.employeeName || ''}`, 10, yPos);
  doc.text(`Employee ID: ${formData.employeeId || ''}`, 110, yPos);
  yPos += 6;
  doc.text(`Date of Birth: ${formData.dateOfBirth || ''}`, 10, yPos);
  doc.text(`Job Title: ${formData.jobTitle || ''}`, 110, yPos);
  yPos += 6;
  doc.text(`Department: ${formData.department || ''}`, 10, yPos);
  doc.text(`Employer: ${formData.employer || ''}`, 110, yPos);
  yPos += 12;
  
  // Section 2: Medical Evaluation
  doc.setFont(undefined, 'bold');
  doc.text('Section 2: Medical Evaluation', 10, yPos);
  yPos += 8;
  doc.setFont(undefined, 'normal');
  doc.text(`Evaluation Date: ${formData.evaluationDate || ''}`, 10, yPos);
  yPos += 6;
  doc.text(`Questionnaire Reviewed: ${formData.questionnaireReviewed ? 'Yes' : 'No'}`, 10, yPos);
  yPos += 6;
  doc.text(`Physical Exam Performed: ${formData.examPerformed ? 'Yes' : 'No'}`, 10, yPos);
  yPos += 8;
  
  if (formData.medicalNotes) {
    doc.text('Medical Notes:', 10, yPos);
    yPos += 6;
    const lines = doc.splitTextToSize(formData.medicalNotes, 180);
    doc.text(lines, 10, yPos);
    yPos += lines.length * 6 + 6;
  }
  
  // Section 3: Clearance Decision
  doc.setFont(undefined, 'bold');
  doc.text('Section 3: Clearance Decision', 10, yPos);
  yPos += 8;
  
  const clearance = formData.clearanceStatus || 'Not specified';
  if (clearance === 'cleared') {
    doc.setTextColor(0, 128, 0);
    doc.text('✓ CLEARED for respirator use without restrictions', 10, yPos);
    doc.setTextColor(0, 0, 0);
  } else if (clearance === 'cleared-restrictions') {
    doc.setTextColor(200, 100, 0);
    doc.text('✓ CLEARED with restrictions:', 10, yPos);
    yPos += 6;
    doc.setFont(undefined, 'normal');
    const restrictionLines = doc.splitTextToSize(formData.restrictions || '', 170);
    doc.text(restrictionLines, 15, yPos);
    yPos += restrictionLines.length * 6;
    doc.setTextColor(0, 0, 0);
  } else if (clearance === 'not-cleared') {
    doc.setTextColor(255, 0, 0);
    doc.text('✗ NOT CLEARED (medical reasons)', 10, yPos);
    doc.setTextColor(0, 0, 0);
  }
  yPos += 10;
  
  // Section 4: Approved Respirator Types
  doc.setFont(undefined, 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Section 4: Approved Respirator Types', 10, yPos);
  yPos += 8;
  doc.setFont(undefined, 'normal');
  
  const types = [
    { key: 'n95', label: 'N95 / Filtering Facepiece' },
    { key: 'halfFace', label: 'Half-Face Respirator' },
    { key: 'fullFace', label: 'Full-Face Respirator' },
    { key: 'papr', label: 'PAPR' }
  ];
  
  types.forEach(({ key, label }) => {
    const checked = formData[key] ? '☑' : '☐';
    doc.text(`${checked} ${label}`, 10, yPos);
    yPos += 6;
  });
  
  if (formData.otherType) {
    doc.text(`☑ Other: ${formData.otherType}`, 10, yPos);
    yPos += 6;
  }
  yPos += 8;
  
  // Section 5: Re-evaluation
  if (formData.reEvaluationRequired) {
    doc.setFont(undefined, 'bold');
    doc.text('Section 5: Re-evaluation Required', 10, yPos);
    yPos += 8;
    doc.setFont(undefined, 'normal');
    doc.text(`Re-evaluation Date: ${formData.reEvaluationDate || ''}`, 10, yPos);
    yPos += 6;
    if (formData.reEvaluationReason) {
      doc.text('Reason:', 10, yPos);
      yPos += 6;
      const reasonLines = doc.splitTextToSize(formData.reEvaluationReason, 180);
      doc.text(reasonLines, 10, yPos);
      yPos += reasonLines.length * 6 + 6;
    }
  }
  
  // Physician Certification
  if (yPos > 220) {
    doc.addPage();
    yPos = 20;
  }
  
  yPos += 10;
  doc.setFont(undefined, 'bold');
  doc.text('Section 6: Physician Certification', 10, yPos);
  yPos += 8;
  doc.setFont(undefined, 'normal');
  
  if (formData.physicianSignature) {
    doc.addImage(formData.physicianSignature, 'PNG', 10, yPos, 60, 20);
  }
  doc.line(10, yPos + 20, 80, yPos + 20);
  doc.text('Physician Signature', 10, yPos + 25);
  doc.line(120, yPos + 20, 170, yPos + 20);
  doc.text(`Date: ${formData.physicianDate || new Date().toLocaleDateString()}`, 120, yPos + 25);
  
  yPos += 32;
  doc.text(`Physician Name: ${formData.physicianName || ''}`, 10, yPos);
  yPos += 6;
  doc.text(`Medical License #: ${formData.medicalLicense || ''}`, 10, yPos);
  
  return doc;
};

export const generateRespiratorFitTestPDF = (formData) => {
  const doc = new jsPDF();
  
  // Header with logo
  doc.addImage(LOGO_PATH, 'PNG', 10, 10, 40, 20);
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text('AltMed Medical Center', 45, 20);
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('8551 Rixlew Lane, Suite 140, Manassas, VA 20109', 45, 27);
  doc.text('Phone: (703) 361-4357', 45, 32);
  
  // Title
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('RESPIRATOR FIT TEST RECORD', 105, 45, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('OSHA 29 CFR 1910.134 Annual Fit Testing', 105, 51, { align: 'center' });
  
  let yPos = 60;
  
  // Section 1: Employee Information
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Section 1: Employee Information', 10, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Name: ${formData.employeeName || ''}`, 10, yPos);
  doc.text(`Employee ID: ${formData.employeeId || ''}`, 110, yPos);
  yPos += 6;
  doc.text(`Date of Birth: ${formData.dateOfBirth || ''}`, 10, yPos);
  doc.text(`Job Title: ${formData.jobTitle || ''}`, 110, yPos);
  yPos += 6;
  doc.text(`Department: ${formData.department || ''}`, 10, yPos);
  doc.text(`Employer: ${formData.employer || ''}`, 110, yPos);
  yPos += 12;
  
  // Section 2: Respirator Information
  doc.setFont(undefined, 'bold');
  doc.text('Section 2: Respirator Information', 10, yPos);
  yPos += 8;
  doc.setFont(undefined, 'normal');
  doc.text(`Make: ${formData.respiratorMake || ''}`, 10, yPos);
  yPos += 6;
  doc.text(`Model: ${formData.respiratorModel || ''}`, 10, yPos);
  doc.text(`Size: ${formData.respiratorSize || ''}`, 110, yPos);
  yPos += 12;
  
  // Section 3: Test Information
  doc.setFont(undefined, 'bold');
  doc.text('Section 3: Test Information', 10, yPos);
  yPos += 8;
  doc.setFont(undefined, 'normal');
  doc.text(`Test Date: ${formData.testDate || ''}`, 10, yPos);
  doc.text(`Next Test Due: ${formData.nextTestDue || ''}`, 110, yPos);
  yPos += 6;
  doc.text(`Test Method: ${formData.testMethod || ''}`, 10, yPos);
  yPos += 6;
  doc.text(`Test Protocol: ${formData.testProtocol || ''}`, 10, yPos);
  yPos += 6;
  
  if (formData.testMethod === 'quantitative' && formData.fitFactor) {
    doc.text(`Fit Factor: ${formData.fitFactor}`, 10, yPos);
    yPos += 6;
  }
  yPos += 8;
  
  // Section 4: Test Exercises
  doc.setFont(undefined, 'bold');
  doc.text('Section 4: Fit Test Exercises', 10, yPos);
  yPos += 8;
  doc.setFont(undefined, 'normal');
  
  const exercises = [
    { key: 'exercise1_normalBreathing', label: '1. Normal Breathing' },
    { key: 'exercise2_deepBreathing', label: '2. Deep Breathing' },
    { key: 'exercise3_headSideToSide', label: '3. Head Side to Side' },
    { key: 'exercise4_headUpDown', label: '4. Head Up and Down' },
    { key: 'exercise5_talking', label: '5. Talking' },
    { key: 'exercise6_grimace', label: '6. Grimace' },
    { key: 'exercise7_bendingOver', label: '7. Bending Over' },
    { key: 'exercise8_normalBreathing', label: '8. Normal Breathing (Final)' }
  ];
  
  exercises.forEach(({ key, label }) => {
    const passed = formData[key] ? '☑' : '☐';
    doc.text(`${passed} ${label}`, 10, yPos);
    yPos += 5;
  });
  yPos += 8;
  
  // Section 5: Test Result
  doc.setFont(undefined, 'bold');
  doc.text('Section 5: Test Result', 10, yPos);
  yPos += 8;
  
  const result = formData.testResult || 'Not recorded';
  if (result === 'pass') {
    doc.setTextColor(0, 128, 0);
    doc.setFontSize(14);
    doc.text('✓ PASS - Fit test successful', 10, yPos);
  } else if (result === 'fail') {
    doc.setTextColor(255, 0, 0);
    doc.setFontSize(14);
    doc.text('✗ FAIL - Fit test unsuccessful', 10, yPos);
  }
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  yPos += 10;
  
  if (formData.failureReason) {
    doc.setFont(undefined, 'normal');
    doc.text('Reason for Failure:', 10, yPos);
    yPos += 6;
    const reasonLines = doc.splitTextToSize(formData.failureReason, 180);
    doc.text(reasonLines, 10, yPos);
    yPos += reasonLines.length * 6 + 6;
  }
  
  // Photo
  if (formData.photoData) {
    if (yPos > 200) {
      doc.addPage();
      yPos = 20;
    }
    yPos += 10;
    doc.setFont(undefined, 'bold');
    doc.text('Photo Documentation:', 10, yPos);
    yPos += 8;
    try {
      doc.addImage(formData.photoData, 'JPEG', 10, yPos, 80, 60);
      yPos += 65;
    } catch (e) {
      doc.setFont(undefined, 'normal');
      doc.text('(Photo attached)', 10, yPos);
      yPos += 10;
    }
  }
  
  // Technician Certification
  if (yPos > 220) {
    doc.addPage();
    yPos = 20;
  }
  
  yPos += 10;
  doc.setFont(undefined, 'bold');
  doc.text('Section 7: Technician Certification', 10, yPos);
  yPos += 8;
  doc.setFont(undefined, 'normal');
  
  if (formData.technicianSignature) {
    doc.addImage(formData.technicianSignature, 'PNG', 10, yPos, 60, 20);
  }
  doc.line(10, yPos + 20, 80, yPos + 20);
  doc.text('Technician Signature', 10, yPos + 25);
  doc.line(120, yPos + 20, 170, yPos + 20);
  doc.text(`Date: ${formData.technicianDate || new Date().toLocaleDateString()}`, 120, yPos + 25);
  
  yPos += 32;
  doc.text(`Technician Name: ${formData.technicianName || ''}`, 10, yPos);
  yPos += 6;
  doc.text(`Certification: ${formData.technicianCertification || ''}`, 10, yPos);
  
  return doc;
};
