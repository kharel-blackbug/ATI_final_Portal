import React, { useState, useEffect } from 'react';
import { User, Course, Application, CustomRequest, CompletedTraining } from './types';
import { INITIAL_COURSES, INITIAL_COMPLETED_TRAININGS } from './data';
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import DirectoryView from './components/DirectoryView';
import DetailsView from './components/DetailsView';
import ExpressionOfInterest from './components/ExpressionOfInterest';
import ProposeTrainingDialog from './components/ProposeTrainingDialog';
import SettingsSupportView from './components/SettingsSupportView';
import MasterAdminConsole from './components/MasterAdminConsole';
import GalleryView from './components/GalleryView';

export default function App() {
  // Session Authentication state pre-check
  const [user, setUser] = useState<User | null>(null);

  // Core Directory and submission registries
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>('Directory');

  // Multi-screen layout state
  const [isEoiFormActive, setIsEoiFormActive] = useState(false);

  // Persistent state storage for Applications, custom curiculums and timers
  const [applications, setApplications] = useState<Application[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>([]);
  const [completedTrainings, setCompletedTrainings] = useState<CompletedTraining[]>(INITIAL_COMPLETED_TRAININGS);
  const [notificationCount, setNotificationCount] = useState(2);

  // Dialog & Configuration overlay triggers
  const [showProposeModal, setShowProposeModal] = useState(false);
  const [showCustomRequestModal, setShowCustomRequestModal] = useState(false);
  const [activeSettingsOrSupport, setActiveSettingsOrSupport] = useState<'settings' | 'support' | null>(null);

  // New Custom request modal specific fields
  const [customTopic, setCustomTopic] = useState('');
  const [customDept, setCustomDept] = useState('');
  const [customParticipants, setCustomParticipants] = useState(15);
  const [customDescription, setCustomDescription] = useState('');
  const [reqModalSuccess, setReqModalSuccess] = useState(false);

  // Load persistence states on initial mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ati_sikkim_user');
    const savedApps = localStorage.getItem('ati_sikkim_applications');
    const savedRequests = localStorage.getItem('ati_sikkim_custom_requests');
    const savedCompleted = localStorage.getItem('ati_sikkim_completed_trainings');

    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.isLoggedIn) {
          setUser(parsed);
        }
      } catch (e) {
        // ignore
      }
    }

    if (savedApps) {
      try {
        setApplications(JSON.parse(savedApps));
      } catch (e) {
        // ignore
      }
    }

    if (savedRequests) {
      try {
        setCustomRequests(JSON.parse(savedRequests));
      } catch (e) {
        // ignore
      }
    }

    if (savedCompleted) {
      try {
        setCompletedTrainings(JSON.parse(savedCompleted));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Save changes to localStorage on updates
  const handleLoginSuccess = (profile: User) => {
    setUser(profile);
    localStorage.setItem('ati_sikkim_user', JSON.stringify(profile));
    setNotificationCount(2); // reset notification counters
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('ati_sikkim_user');
    setSelectedCourseId(null);
    setIsEoiFormActive(false);
    setActiveTab('Directory');
  };

  const handleNavigateToDetails = (courseId: string) => {
    setSelectedCourseId(courseId);
    setIsEoiFormActive(false);
  };

  // Expression of Interest Submission integration
  const handleSubmissionEOI = (newEoi: Omit<Application, 'id' | 'submittedAt'>) => {
    const application: Application = {
      ...newEoi,
      id: `APP-${Math.floor(100000 + Math.random() * 900000)}`,
      submittedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updatedApps = [application, ...applications];
    setApplications(updatedApps);
    localStorage.setItem('ati_sikkim_applications', JSON.stringify(updatedApps));
    
    // Increase notifications count
    setNotificationCount((n) => n + 1);
  };

  // Suggesting physical innovative custom curriculum proposal
  const handleProposeCurriculum = (proposal: {
    title: string;
    department: string;
    rationale: string;
    expectedOfficers: number;
    skillsTargeted: string;
  }) => {
    const customReq: CustomRequest = {
      id: `CRQ-${Math.floor(100000 + Math.random() * 900000)}`,
      trainingTopic: proposal.title,
      department: proposal.department,
      expectedParticipants: proposal.expectedOfficers,
      description: proposal.rationale,
      submittedAt: new Date().toLocaleDateString('en-IN'),
      status: 'Submitted'
    };

    const updatedReqs = [customReq, ...customRequests];
    setCustomRequests(updatedReqs);
    localStorage.setItem('ati_sikkim_custom_requests', JSON.stringify(updatedReqs));
  };

  // Special Card: custom department requests
  const handleCustomRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic || !customDept || !customDescription) {
      alert('Please fill out all mandatory fields for requesting custom training.');
      return;
    }

    setReqModalSuccess(true);
    setTimeout(() => {
      const customReq: CustomRequest = {
        id: `CRQ-${Math.floor(100000 + Math.random() * 900000)}`,
        trainingTopic: customTopic,
        department: customDept,
        expectedParticipants: customParticipants,
        description: customDescription,
        submittedAt: new Date().toLocaleDateString('en-IN'),
        status: 'Submitted'
      };

      const updatedReqs = [customReq, ...customRequests];
      setCustomRequests(updatedReqs);
      localStorage.setItem('ati_sikkim_custom_requests', JSON.stringify(updatedReqs));

      // Reset fields
      setCustomTopic('');
      setCustomDept('');
      setCustomParticipants(15);
      setCustomDescription('');
      setReqModalSuccess(false);
      setShowCustomRequestModal(false);

      alert('Custom Department Training request successfully compiled and sent to Director Office audit.');
    }, 1500);
  };

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || null;
  const userHasAppliedForSelected = selectedCourseId
    ? applications.some((app) => app.courseId === selectedCourseId)
    : false;

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-sans">
      
      {/* 1. Gate authentication block */}
      {!user ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          {/* Top navigation Header */}
          <Header
            user={user}
            onLogout={handleLogout}
            activeNavTab={activeTab}
            setActiveNavTab={(tab) => {
              setActiveTab(tab);
              // close detail view upon tab transition
              setSelectedCourseId(null);
              setIsEoiFormActive(false);
            }}
            notificationCount={notificationCount}
          />

          {/* Tab Screen Content Router */}
          <div className="flex-1">
            
            {/* Nav DIRECTORY TAB (Contains sub-views Details & EOI) */}
            {activeTab === 'Directory' && (
              <>
                {isEoiFormActive && selectedCourse ? (
                  <ExpressionOfInterest
                    course={selectedCourse}
                    user={user}
                    onGoBack={() => setIsEoiFormActive(false)}
                    onSubmitEOI={handleSubmissionEOI}
                  />
                ) : selectedCourse ? (
                  <DetailsView
                    course={selectedCourse}
                    onGoBack={() => setSelectedCourseId(null)}
                    onInterested={() => setIsEoiFormActive(true)}
                    hasApplied={userHasAppliedForSelected}
                  />
                ) : (
                  <DirectoryView
                    courses={courses}
                    user={user}
                    onViewDetails={handleNavigateToDetails}
                    onOpenProposeModal={() => setShowProposeModal(true)}
                    onOpenCustomRequest={() => setShowCustomRequestModal(true)}
                    applications={applications}
                    onOpenSettings={() => setActiveSettingsOrSupport('settings')}
                    onOpenSupport={() => setActiveSettingsOrSupport('support')}
                  />
                )}
              </>
            )}

            {/* Nav TRAINING CALENDAR TAB */}
            {activeTab === 'Training Calendar' && (
              <main className="pt-24 pb-16 px-4 md:px-10 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
                <div className="border-l-4 border-primary pl-6 py-1">
                  <h1 className="font-sans text-xl md:text-2xl font-extrabold text-primary mb-2">Administrative Training Institute Academic Calendar</h1>
                  <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed">
                    View upcoming gazetted schedules, enrollment cutoffs, and session start metrics. Click any agenda program to view core parameters.
                  </p>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                  <div className="p-5 font-bold text-xs uppercase tracking-wider bg-surface border-b border-outline-variant text-primary flex justify-between items-center">
                    <span>Fall Semester Cutoffs</span>
                    <span className="text-[10px] bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-bold">2026</span>
                  </div>
                  <div className="divide-y divide-outline-variant">
                    {courses.map((course) => (
                      <div key={course.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-surface-container transition-colors">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black uppercase text-secondary tracking-widest">{course.category}</span>
                          <h4 className="font-bold text-sm text-primary">{course.title}</h4>
                          <p className="text-xs text-on-surface-variant">{course.duration} • Led by {course.faculty}</p>
                        </div>
                        <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-start pt-3 sm:pt-0 border-t sm:border-t-0 border-outline-variant">
                          <div className="text-left sm:text-right">
                            <span className="text-[9px] block text-on-surface-variant uppercase tracking-wider font-bold">Deadline</span>
                            <span className="text-xs text-error font-extrabold italic font-sans">{course.deadline}</span>
                          </div>
                          <button
                            onClick={() => {
                              setActiveTab('Directory');
                              setSelectedCourseId(course.id);
                              setIsEoiFormActive(false);
                            }}
                            className="bg-primary text-on-primary px-4 py-2 rounded text-xs font-bold hover:bg-primary-container"
                          >
                            Browse
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </main>
            )}

            {/* Nav RESOURCES TAB */}
            {activeTab === 'Resources' && (
              <main className="pt-24 pb-16 px-4 md:px-10 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
                <div className="border-l-4 border-primary pl-6 py-1">
                  <h1 className="font-sans text-xl md:text-2xl font-extrabold text-primary mb-2">Governmental Documentation Library</h1>
                  <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed">
                    Download framework spreadsheets, template files, and circular booklets. Civil Service requirements enforce compliance audits.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Resource Card 1 */}
                  <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl space-y-4 shadow-xs relative overflow-hidden">
                    <span className="absolute top-4 right-4 text-outline material-symbols-outlined text-[36px]">picture_as_pdf</span>
                    <span className="text-[9px] font-extrabold uppercase text-secondary tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Official Template</span>
                    <h3 className="font-bold text-primary font-sans text-sm">Non-Objection Certificate (NOC) Template</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Statutory template required to register for courses above 2-weeks duration. Must be authenticated with sign and seal of head of department.
                    </p>
                    <button
                      onClick={() => alert('Simulating PDF Template Download: ati_noc_form_v2.pdf')}
                      className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors rounded text-xs font-bold flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px] leading-none">download</span>
                      Download NOC PDF (180 KB)
                    </button>
                  </div>

                  {/* Resource Card 2 */}
                  <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl space-y-4 shadow-xs relative overflow-hidden">
                    <span className="absolute top-4 right-4 text-outline material-symbols-outlined text-[36px]">description</span>
                    <span className="text-[9px] font-extrabold uppercase text-secondary tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Conduct Manual</span>
                    <h3 className="font-bold text-primary font-sans text-sm">Sikkim Civil Services Conduct Code Book</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Detailed booklet containing standard guidelines, immovable asset filing parameters, social media code mandates and disciplinary systems.
                    </p>
                    <button
                      onClick={() => alert('Simulating PDF Manual Download: sikkim_civil_services_conduct_rules.pdf')}
                      className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors rounded text-xs font-bold flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px] leading-none">download</span>
                      Download Rules PDF (1.4 MB)
                    </button>
                  </div>

                  {/* Resource Card 3 */}
                  <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl space-y-4 shadow-xs relative overflow-hidden">
                    <span className="absolute top-4 right-4 text-outline material-symbols-outlined text-[36px]">lan</span>
                    <span className="text-[9px] font-extrabold uppercase text-secondary tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">State Strategy</span>
                    <h3 className="font-bold text-primary font-sans text-sm">Sikkim E-Governance Master Blueprint</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Strategic roadmap formulated by the Department of IT Cell detailing standard micro-services alignment across high-altitude regions.
                    </p>
                    <button
                      onClick={() => alert('Simulating Document Download: e_governance_blueprint.pdf')}
                      className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors rounded text-xs font-bold flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px] leading-none">download</span>
                      Download Blueprint PDF (940 KB)
                    </button>
                  </div>

                  {/* Resource Card 4 */}
                  <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl space-y-4 shadow-xs relative overflow-hidden flex flex-col justify-center text-center items-center">
                    <span className="material-symbols-outlined text-primary text-[44px]">verified_user</span>
                    <h3 className="font-bold text-primary font-sans text-sm mt-3">SPMS Account Credential Synchronizer</h3>
                    <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                      Synchronize your local profile data with central pay registry databases to prevent certificate blocking.
                    </p>
                    <button
                      onClick={() => alert('Synchronization complete: Certified Token validated against SPMS index.')}
                      className="px-5 py-2.5 bg-primary text-on-primary hover:bg-primary-container rounded text-xs font-bold mt-2"
                    >
                      Synchronize Profile Now
                    </button>
                  </div>
                </div>
              </main>
            )}

            {/* Nav GALLERY TAB */}
            {activeTab === 'Gallery' && (
              <GalleryView
                completedTrainings={completedTrainings}
                user={user}
                onNavigateToConsole={() => {
                  setActiveTab('Master Console');
                }}
              />
            )}

            {/* Nav ABOUT ATI TAB */}
            {activeTab === 'About ATI' && (
              <main className="pt-24 pb-16 px-4 md:px-10 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
                <div className="border-l-4 border-primary pl-6 py-1">
                  <h1 className="font-sans text-xl md:text-2xl font-extrabold text-primary mb-2">About Administrative Training Institute, Sikkim</h1>
                  <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed">
                    Discover our long history of empowering regional government leadership through specialized training programs.
                  </p>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant p-6 md:p-8 rounded-xl space-y-6 shadow-xs leading-relaxed font-sans text-xs text-on-surface-variant text-left">
                  
                  <div className="space-y-2">
                    <h3 className="font-bold text-primary text-sm">Institutional Mandate</h3>
                    <p>
                      The Administrative Training Institute (ATI), Sikkim, serves as the apex human resource asset for the Government of Sikkim. Functioning under the Department of Personnel, the institute leads comprehensive capacity audits, organizes foundational courses for newly inducted state civil servants, and guides senior managers in specialized fields such as public finance, legal rules and technological transformation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-outline-variant">
                    <div className="space-y-1">
                      <p className="font-bold text-primary">Academic Campus Coordinates</p>
                      <p>📍 ATI Complex, Upper Syari, Gangtok, East Sikkim – 737101</p>
                      <p>📧 director-ati@sikkim.gov.in</p>
                      <p>📞 +91-3592-202410 (Director Office)</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-primary">Key Academic Leadership</p>
                      <p><strong>Director:</strong> Dr. Rajesh Tshering, IAS</p>
                      <p><strong>Joint Director:</strong> Shri Tshering Namgyal Bhutia, SCS</p>
                      <p><strong>State Coordinator Cell:</strong> Smt. Pranaya Rai, Department of Personnel Office</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-outline-variant space-y-2 text-center text-outline">
                    <p>© 2026 Administrative Training Institute (ATI) Sikkim, Department of Personnel, Sikkim Government. All Rights Reserved.</p>
                  </div>

                </div>
              </main>
            )}

            {/* Nav MASTER CONSOLE TAB */}
            {activeTab === 'Master Console' && user.isAdmin && (
              <MasterAdminConsole
                user={user}
                courses={courses}
                setCourses={setCourses}
                applications={applications}
                setApplications={setApplications}
                customRequests={customRequests}
                setCustomRequests={setCustomRequests}
                completedTrainings={completedTrainings}
                setCompletedTrainings={setCompletedTrainings}
              />
            )}

          </div>

          {/* Sponsoring custom proposed training layout modal */}
          {showProposeModal && (
            <ProposeTrainingDialog
              onClose={() => setShowProposeModal(false)}
              onSubmitProposal={(prop) => {
                handleProposeCurriculum(prop);
                setShowProposeModal(false);
                alert(`New Course Proposal logged: "${prop.title}" sponsoring by ${prop.department}. We will review the custom training.`);
              }}
            />
          )}

          {/* Sponsoring "Request Custom Training" card modal */}
          {showCustomRequestModal && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
              <div className="bg-surface-container-lowest border border-outline rounded-xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center pb-3 border-b border-outline-variant mb-4">
                  <span className="font-bold text-primary text-base flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary">add_road</span>
                    Request Custom Training
                  </span>
                  <button
                    onClick={() => setShowCustomRequestModal(false)}
                    className="text-on-surface-variant hover:text-primary text-sm font-bold block p-1"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCustomRequestSubmit} className="space-y-4 text-xs text-on-surface-variant">
                  <p className="leading-relaxed">
                    Fill out the department operational gaps to request specialized training schedules from the Director of ATI.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-outline mb-1">
                        Sponsoring Department *
                      </label>
                      <select
                        required
                        value={customDept}
                        onChange={(e) => setCustomDept(e.target.value)}
                        className="w-full bg-surface border border-outline-variant rounded p-2 text-xs text-on-surface outline-none cursor-pointer"
                      >
                        <option value="">Select Department</option>
                        {['Finance Department', 'IT & Digital Technology', 'Home Department', 'Tourism', 'Education', 'Environment & Forests'].map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-outline mb-1">
                        Proposed Training Topic / Gaps *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. GST Accounting or High-altitude disaster systems"
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                        className="w-full bg-surface border border-outline-variant rounded p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-outline mb-1">
                        Expected Participant Count *
                      </label>
                      <input
                        type="number"
                        min={10}
                        max={80}
                        required
                        value={customParticipants}
                        onChange={(e) => setCustomParticipants(parseInt(e.target.value) || 15)}
                        className="w-full bg-surface border border-outline-variant rounded p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-outline mb-1">
                        Topic Rationale & Motivation *
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Provide details about why this training is urgently required inside your specified sector..."
                        value={customDescription}
                        onChange={(e) => setCustomDescription(e.target.value)}
                        className="w-full bg-surface border border-outline-variant rounded p-2 text-xs focus:ring-1 focus:ring-primary outline-none resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCustomRequestModal(false)}
                      className="px-4 py-2 border border-outline-variant rounded hover:bg-surface-container font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={reqModalSuccess}
                      className="px-4 py-2 bg-primary text-on-primary rounded hover:bg-primary-container font-bold"
                    >
                      {reqModalSuccess ? 'Sending...' : 'Send Request'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Settings or Support View panel overlay */}
          {activeSettingsOrSupport && (
            <SettingsSupportView
              type={activeSettingsOrSupport}
              onClose={() => setActiveSettingsOrSupport(null)}
              user={user}
            />
          )}

          {/* Compact bottom global footer */}
          <footer className="w-full py-8 px-4 md:px-10 bg-surface-container-highest border-t border-outline-variant flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto mt-auto relative z-20">
            <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
              <span className="text-[11px] font-bold uppercase tracking-widest text-secondary mb-1">
                Administrative Training Institute
              </span>
              <p className="text-xs text-on-surface leading-normal text-center md:text-left">
                © 2026 Administrative Training Institute, Government of Sikkim. All Rights Reserved.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs text-on-surface-variant">
              <a href="#privacy" onClick={() => alert('Compliance check: Administrative Training Institute privacy directives enforce complete security on credentials.')} className="hover:text-primary transition-opacity font-medium">Privacy Policy</a>
              <span className="text-outline-variant">•</span>
              <a href="#terms" onClick={() => alert('By accessing the ATI portal, you acknowledge compliance with the Sikkim Civil Services code.')} className="hover:text-primary transition-opacity font-medium">Terms of Service</a>
              <span className="text-outline-variant">•</span>
              <button onClick={() => setActiveSettingsOrSupport('support')} className="hover:text-primary transition-opacity font-semibold">Contact IT Cell</button>
              <span className="text-outline-variant">•</span>
              <a href="https://sikkim.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-opacity font-medium">Sikkim.gov.in</a>
            </div>
          </footer>
        </>
      )}

    </div>
  );
}
