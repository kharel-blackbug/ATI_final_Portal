import React, { useState } from 'react';
import { Course, User, Application } from '../types';
import { DEPARTMENTS } from '../data';

interface ExpressionOfInterestProps {
  course: Course;
  user: User;
  onGoBack: () => void;
  onSubmitEOI: (application: Omit<Application, 'id' | 'submittedAt'>) => void;
}

export default function ExpressionOfInterest({
  course,
  user,
  onGoBack,
  onSubmitEOI
}: ExpressionOfInterestProps) {
  const [fullName, setFullName] = useState(user.name || '');
  const [empId, setEmpId] = useState(user.employeeId || '');
  const [designation, setDesignation] = useState(user.designation || '');
  const [department, setDepartment] = useState(user.department || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [statement, setStatement] = useState('');
  const [declared, setDeclared] = useState(false);
  
  // Interactive error & validation state
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Helper word counter
  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const wordCount = getWordCount(statement);
  const isWordCountInvalid = wordCount > 500;
  const isWordCountTooLow = wordCount < 150 && wordCount > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName || !empId || !designation || !department || !phone) {
      setFormError('Please complete all Professional Identity fields before submitting.');
      return;
    }

    if (!statement) {
      setFormError('Please enter your Statement of Interest.');
      return;
    }

    if (isWordCountInvalid) {
      setFormError('Your Statement of Interest exceeds the maximum 500-word limit. Please shorten it.');
      return;
    }

    if (wordCount < 150) {
      setFormError('Please provide at least 150 words in your Statement of Interest for a comprehensive evaluation.');
      return;
    }

    if (!declared) {
      setFormError('Please check the declaration statement indicating your inputted data is accurate.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate compilation & security submission to State Personnel Management System database
    setTimeout(() => {
      onSubmitEOI({
        courseId: course.id,
        courseTitle: course.title,
        fullName: fullName.trim(),
        employeeId: empId.trim().toUpperCase(),
        designation: designation.trim(),
        department,
        phone: phone.trim(),
        statement: statement.trim(),
        status: 'Pending Review' // Default state
      });
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  return (
    <div className="flex pt-20 min-h-screen">
      
      {/* Side navigation backup panel */}
      <aside className="w-64 bg-surface-container-low border-r border-outline-variant py-6 px-4 gap-4 sticky top-20 h-[calc(100vh-80px)] flex flex-col shrink-0">
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-primary hover:bg-surface-container-high rounded-lg cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Cancel Registration
        </button>
        <div className="h-[1px] bg-outline-variant my-2"></div>
        <div className="px-4 text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Subject Course</div>
        <div className="mx-4 p-3 bg-surface rounded-lg border border-outline-variant text-xs text-on-surface-variant font-bold">
          {course.title}
        </div>
      </aside>

      {/* Main EOI Content screen */}
      <main className="flex-1 bg-surface p-6 md:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          {/* Breadcrumbs matching Image 4 */}
          <nav className="flex items-center gap-1.5 mb-6 text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
            <button onClick={onGoBack} className="hover:text-primary cursor-pointer">Dashboard</button>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface-variant">Training Programs</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary">Expression of Interest</span>
          </nav>

          {/* Heading statement with Sikkim state style */}
          <div className="mb-8 border-l-4 border-primary pl-6 py-1">
            <h1 className="font-sans text-xl md:text-2xl font-extrabold text-primary mb-2">
              Expression of Interest: {course.title}
            </h1>
            <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed">
              Please provide your professional details to register your interest for the upcoming certification program. The Department of Personnel will review all compiled files.
            </p>
          </div>

          {isSuccess ? (
            /* Immersive Official Receipt block after compliance submission */
            <div className="bg-surface-container-lowest border-2 border-secondary p-8 rounded-xl shadow-lg relative overflow-hidden animate-in fade-in zoom-in duration-300">
              
              <div className="absolute top-0 right-0 bg-secondary text-on-secondary px-8 py-1 rotate-45 translate-x-6 translate-y-4 text-[9px] font-bold tracking-widest uppercase">
                Submitted
              </div>

              <div className="flex flex-col items-center text-center space-y-4 pb-6 border-b border-outline-variant mb-6">
                <span className="material-symbols-outlined text-secondary text-[48px] animate-bounce">check_circle</span>
                <div>
                  <h3 className="font-extrabold text-lg text-primary">Expression of Interest Certified</h3>
                  <p className="text-[10px] text-outline uppercase font-mono tracking-wider mt-1">Application Ref: ATI-{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
              </div>

              <div className="space-y-4 max-w-md mx-auto text-xs text-on-surface-variant">
                <p className="leading-relaxed text-center italic">
                  "Your submission has been securely committed to the Sikkim State Personnel Management System. Notification was dispatched to your Department Coordinator."
                </p>

                <div className="bg-surface p-4 rounded-lg border border-outline-variant space-y-2">
                  <p className="flex justify-between">
                    <span className="font-semibold text-outline">Subject Module:</span>
                    <span className="font-bold text-primary text-right max-w-[200px] truncate">{course.title}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold text-outline">Applicant Officer:</span>
                    <span className="font-bold text-on-surface">{fullName}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold text-outline">Employee ID No:</span>
                    <span className="font-mono font-bold text-on-surface">{empId.toUpperCase()}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold text-outline">Designation & Rank:</span>
                    <span className="font-bold text-on-surface">{designation}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold text-outline">Department Duty:</span>
                    <span className="font-bold text-on-surface text-right">{department}</span>
                  </p>
                </div>

                <div className="bg-secondary-container/30 text-on-secondary-container p-3.5 rounded border border-secondary text-xs leading-relaxed">
                  <strong>What happens next?</strong> ATI officials will audit pre-qualification requirements (e.g. minimum service duration). You will receive an email containing final enrollment authorization details.
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-6 mt-6 border-t border-outline-variant">
                <button
                  onClick={onGoBack}
                  className="px-6 py-2.5 bg-primary text-on-primary rounded font-bold text-xs hover:bg-primary-container cursor-pointer"
                >
                  Return to Catalogue
                </button>
              </div>

            </div>
          ) : (
            
            /* Two Column Grid layout matching Image 4 */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left Column: Instructions and Local campus image */}
              <div className="md:col-span-1 space-y-6">
                
                {/* Instructions card */}
                <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant space-y-4">
                  <h3 className="font-sans text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5 border-b border-outline-variant pb-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">info</span>
                    Instructions
                  </h3>
                  
                  <nav className="space-y-4 text-xs text-on-surface-variant font-sans">
                    <div className="flex gap-2 items-start">
                      <span className="text-primary font-bold">01</span>
                      <span className="leading-relaxed">Ensure your Employee ID matches the SPMS database exactly. Outdated tokens won't qualify.</span>
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="text-primary font-bold">02</span>
                      <span className="leading-relaxed">The 'Statement of Interest' should highlight how this course aligns with your current state role.</span>
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="text-primary font-bold">03</span>
                      <span className="leading-relaxed">An official Non-Objection Certificate (NOC) from your department head will be required if selected.</span>
                    </div>
                  </nav>
                </div>

                {/* Campus card photo */}
                <div className="relative h-48 rounded-xl overflow-hidden group border border-outline-variant bg-surface-container shadow-xs">
                  <img
                    alt="Training Center"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2y3l_vItPdkg-FScL9nWYrQRWHwKk_Z7-FDSQu5Boq3tWH1Uh1M5qjrW7DKrllWRiMZO30O2P2cKD1c_euL7dgJLmhk3VxjEx419DHYcQ5iX7H4pRWZ2G0A-pkpcjup7H3HNzatCihbEMQvV4yguNPGd0ZgBDu99Bcp9I55rtQOny5lj57xihkJ63DdBg3ls06oUpVmo-eqWWBQHeqrehms23osDt8gIV80vw63odE7_kv_QdAnGF"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-3">
                    <span className="text-on-primary font-sans text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-on-primary text-[14px]">school</span>
                      ATI Main Campus, Gangtok
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Form panel */}
              <div className="md:col-span-2">
                <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant shadow-xs space-y-6">
                  
                  {formError && (
                    <div className="p-3 bg-error-container text-on-error-container border border-error rounded text-xs font-semibold leading-relaxed">
                      ⚠️ {formError}
                    </div>
                  )}

                  {/* Section A: Professional Identity */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-outline-variant">
                      <span className="material-symbols-outlined text-primary text-[20px]">person</span>
                      <h2 className="font-sans text-xs font-bold uppercase text-primary tracking-wider">Professional Identity</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wide mb-1.5">
                          Full Name (As per Records) *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Tenzing Namgyal"
                          className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary outline-none focus:border-primary font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wide mb-1.5">
                          Employee ID *
                        </label>
                        <input
                          type="text"
                          required
                          value={empId}
                          placeholder="e.g. SK-10452-AD"
                          onChange={(e) => setEmpId(e.target.value)}
                          className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary outline-none focus:border-primary font-mono tracking-wide"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wide mb-1.5">
                          Designation *
                        </label>
                        <input
                          type="text"
                          required
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          placeholder="e.g. Under Secretary"
                          className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary outline-none focus:border-primary font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wide mb-1.5">
                          Department Duty *
                        </label>
                        <select
                          required
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary outline-none focus:border-primary font-sans cursor-pointer h-[38px]"
                        >
                          <option value="">Select Department</option>
                          {DEPARTMENTS.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wide mb-1.5">
                        Phone Number *
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3.5 rounded-l-lg border border-r-0 border-outline-variant bg-surface-container-high text-on-surface-variant text-xs font-bold font-mono">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="98765 43210"
                          className="flex-grow bg-surface border border-outline-variant rounded-r-lg p-2.5 text-xs focus:ring-1 focus:ring-primary outline-none focus:border-primary font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section B: Aspiration & Intent */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-outline-variant">
                      <span className="material-symbols-outlined text-primary text-[20px]">edit_note</span>
                      <h2 className="font-sans text-xs font-bold uppercase text-primary tracking-wider">Aspiration &amp; Intent</h2>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wide">
                          Statement of Interest (150 - 500 words) *
                        </label>
                        <span className={`text-[10px] font-bold ${
                          isWordCountInvalid ? 'text-error' : isWordCountTooLow ? 'text-tertiary-container' : 'text-outline'
                        }`}>
                          {wordCount} / 500 words
                        </span>
                      </div>

                      <textarea
                        rows={7}
                        required
                        value={statement}
                        onChange={(e) => setStatement(e.target.value)}
                        placeholder="Describe your current responsibilities and how this specific training will enhance your administrative capabilities..."
                        className="w-full bg-surface border border-outline-variant rounded-lg p-4 text-xs focus:ring-2 focus:ring-primary outline-none focus:border-primary font-sans resize-none leading-relaxed"
                      />
                      
                      <p className="text-[10px] text-on-surface-variant italic leading-normal">
                        * Please provide at least 150 words indicating practical case studies and department applications.
                      </p>
                    </div>
                  </div>

                  {/* Submission and legal compliance */}
                  <div className="pt-4 border-t border-outline-variant flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-start gap-2.5 text-left">
                      <input
                        type="checkbox"
                        id="form-declare"
                        className="w-4.5 h-4.5 text-primary border-outline-variant rounded focus:ring-primary cursor-pointer mt-0.5"
                        checked={declared}
                        onChange={(e) => setDeclared(e.target.checked)}
                      />
                      <label htmlFor="form-declare" className="text-[10px] text-on-surface-variant leading-tight select-none cursor-pointer">
                        I hereby declare that the information provided is true, matching the current SPMS registry database.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto bg-primary text-on-primary hover:bg-primary-container px-6 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
                          <span>Validating ID...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Interest</span>
                          <span className="material-symbols-outlined text-[16px] leading-none">send</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>

            </div>
          )}

        </div>
      </main>

    </div>
  );
}
