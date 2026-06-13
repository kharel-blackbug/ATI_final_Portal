import React, { useState } from 'react';
import { User, Course, Application, CustomRequest, CompletedTraining } from '../types';
import { DEPARTMENTS } from '../data';
import { 
  UserCheck, 
  FileCheck, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  FileText, 
  ListRestart,
  Sliders,
  Send,
  Sparkles
} from 'lucide-react';

interface MasterAdminConsoleProps {
  user: User;
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  customRequests: CustomRequest[];
  setCustomRequests: React.Dispatch<React.SetStateAction<CustomRequest[]>>;
  completedTrainings: CompletedTraining[];
  setCompletedTrainings: React.Dispatch<React.SetStateAction<CompletedTraining[]>>;
}

export default function MasterAdminConsole({
  user,
  courses,
  setCourses,
  applications,
  setApplications,
  customRequests,
  setCustomRequests,
  completedTrainings,
  setCompletedTrainings
}: MasterAdminConsoleProps) {
  // Tabs inside admin console
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'applications' | 'proposals' | 'add_course' | 'completed_trainings'>('applications');
  
  // Custom Course Form State
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState('Governance');
  const [newCourseDuration, setNewCourseDuration] = useState('2 Weeks');
  const [newCourseFaculty, setNewCourseFaculty] = useState('');
  const [newCourseFacultyTitle, setNewCourseFacultyTitle] = useState('Technical Advisor, ATI');
  const [newCourseDeadline, setNewCourseDeadline] = useState('December 20, 2026');
  const [newCoursePrereq, setNewCoursePrereq] = useState('Minimum 2 years of State service.');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Completed Trainings Gallery Form State
  const [compTitle, setCompTitle] = useState('');
  const [compDate, setCompDate] = useState('April 2026');
  const [compDetails, setCompDetails] = useState('');
  const [compImage, setCompImage] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&h=400');
  const [compParticipants, setCompParticipants] = useState(40);
  const [compDuration, setCompDuration] = useState('1 Week');
  const [compDept, setCompDept] = useState('IT & Digital Technology');
  const [compTagsStr, setCompTagsStr] = useState('E-Governance, Digital, GIS');
  const [compSuccessMsg, setCompSuccessMsg] = useState('');

  // Local static lists for simulated officer registration audit log if empty
  const defaultLogs: Application[] = [
    { id: 'APP-884912', courseId: 'ethics-digital-governance', courseTitle: 'Ethics in Digital Governance', fullName: 'Shri Pintso Bhutia', employeeId: 'SK-20340-RD', designation: 'Joint Secretary', department: 'Rural Development', phone: '9434051023', statement: 'Interested in digital standard ethics for village councils.', submittedAt: '12 June 2026', status: 'Pending Review' },
    { id: 'APP-902461', courseId: 'civil-services-rules', courseTitle: 'Sikkim Civil Services Conduct Rules', fullName: 'Smt. Pempa Lhamu', employeeId: 'SK-10492-FD', designation: 'Treasury Officer', department: 'Finance Department', phone: '9845012390', statement: 'Need training on newly codified asset reporting codes.', submittedAt: '11 June 2026', status: 'Approved' },
    { id: 'APP-310574', courseId: 'disaster-resilience-hills', courseTitle: 'Disaster Resilience & Landslide Risk', fullName: 'Shri Sonam Lhandup', employeeId: 'SK-10023-HD', designation: 'Sub-Divisional Magistrate', department: 'Home Department', phone: '9903450231', statement: 'Urgent landslide protocols for low latitude river valleys.', submittedAt: '10 June 2026', status: 'Requires NOC' }
  ];

  // Merge loaded apps with default prefilled review log to demonstrate rich administrative activity
  const displayApps = applications.length > 0 
    ? [...applications, ...defaultLogs.filter(d => !applications.some(a => a.id === d.id))]
    : defaultLogs;

  const handleUpdateStatus = (appId: string, nextStatus: 'Approved' | 'Requires NOC' | 'Pending Review') => {
    // Check if it's a persistent application
    const isLocal = applications.some(a => a.id === appId);
    if (isLocal) {
      const updated = applications.map(app => 
        app.id === appId ? { ...app, status: nextStatus } : app
      );
      setApplications(updated);
      localStorage.setItem('ati_sikkim_applications', JSON.stringify(updated));
    } else {
      // Simulate state updates for default logs as well!
      alert(`Status for registry ${appId} successfully updated to "${nextStatus}".`);
    }
  };

  const handleReviewProposal = (proposalId: string, nextStatus: 'Submitted' | 'Under Review') => {
    const updated = customRequests.map(req => 
      req.id === proposalId ? { ...req, status: nextStatus } : req
    );
    setCustomRequests(updated);
    localStorage.setItem('ati_sikkim_custom_requests', JSON.stringify(updated));
    alert(`Department Proposal ${proposalId} set to "${nextStatus}" status.`);
  };

  const handleConvertProposalToCourse = (proposal: CustomRequest) => {
    // Auto design course parameters from the submitted department request!
    const newCourse: Course = {
      id: `course-${Math.floor(1000 + Math.random() * 9000)}`,
      title: proposal.trainingTopic,
      category: proposal.department.includes('Finance') ? 'Finance' : 'Governance',
      badges: ['Custom Proposal', 'Department Sponsoring'],
      description: proposal.description,
      duration: '1 Week (Specialized Session)',
      faculty: 'State Empanelled Expert',
      facultyTitle: `Syllabus curated for ${proposal.department}`,
      deadline: 'December 15, 2026',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP_zwG7SbkPJvEhMXfugLq5r1cJuk0-Dd0kbanw4lp-FQLtNo9Dxug9pn8mJkxcBuVY3uuSloUqgWqPTBC27cl0ed0kGY7TUy9Q1JvYFW_cFl2A06bASlvAIXaKReqCleymk3ouu6Kqlyg7DDao6GlMqYNKU9noAAfCjPR_KMdKyVKsBkiKEe4IBzk0jNpZx7weD5uRVw6sPhjZoFR34bV4ctrBJqS4u7vVz2y7rZlvIsuVmD_yW_K',
      prerequisites: 'Mandatory for all officers sponsored by ' + proposal.department
    };

    const updatedCourses = [newCourse, ...courses];
    setCourses(updatedCourses);
    localStorage.setItem('ati_sikkim_courses', JSON.stringify(updatedCourses));

    // Remove or set proposal status as Reviewed
    const updatedReqs = customRequests.map(req => 
      req.id === proposal.id ? { ...req, status: 'Under Review' as const } : req
    );
    setCustomRequests(updatedReqs);
    localStorage.setItem('ati_sikkim_custom_requests', JSON.stringify(updatedReqs));

    alert(`Successfully compiled custom Syllabus! Course titled "${proposal.trainingTopic}" has been published and injected into the permanent Academic Directory catalog.`);
  };

  const handleCreateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle || !newCourseFaculty || !newCourseDesc) {
      alert('Please fill out all required fields to register the training module.');
      return;
    }

    const newCreatedCourse: Course = {
      id: `custom-course-${Date.now()}`,
      title: newCourseTitle,
      category: newCourseCategory,
      badges: ['Newly Published', 'ATI Custom'],
      description: newCourseDesc,
      prerequisites: newCoursePrereq,
      duration: newCourseDuration,
      faculty: newCourseFaculty,
      facultyTitle: newCourseFacultyTitle,
      deadline: newCourseDeadline,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2y3l_vItPdkg-FScL9nWYrQRWHwKk_Z7-FDSQu5Boq3tWH1Uh1M5qjrW7DKrllWRiMZO30O2P2cKD1c_euL7dgJLmhk3VxjEx419DHYcQ5iX7H4pRWZ2G0A-pkpcjup7H3HNzatCihbEMQvV4yguNPGd0ZgBDu99Bcp9I55rtQOny5lj57xihkJ63DdBg3ls06oUpVmo-eqWWBQHeqrehms23osDt8gIV80vw63odE7_kv_QdAnGF',
      location: 'ATI Academic Annex Hall'
    };

    const updated = [newCreatedCourse, ...courses];
    setCourses(updated);
    localStorage.setItem('ati_sikkim_courses', JSON.stringify(updated));

    setSuccessMsg('Successfully Published! The custom course has been added immediately to the central catalog.');
    
    // Clear form
    setNewCourseTitle('');
    setNewCourseFaculty('');
    setNewCourseDesc('');
    
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <main className="pt-24 pb-16 px-4 md:px-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Banner */}
      <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100/10 rounded-full blur-3xl -z-10" />
        <div className="space-y-1.5 z-10 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold bg-[#002540] text-white px-2.5 py-0.5 rounded-full tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Master Executive Area
            </span>
            <span className="text-[10px] uppercase font-bold bg-slate-100 text-slate-705 border border-slate-200 px-2.5 py-0.5 rounded-full">
              Full Administrator Session
            </span>
          </div>
          <h1 className="font-heading text-xl md:text-2xl font-bold text-slate-900">
            Administrative Training Institute Control Desk
          </h1>
          <p className="text-xs text-slate-650 leading-relaxed">
            Welcome, <strong>{user.name}</strong>. Here you can review civil program application registries, approve/audit stat submissions, inspect bespoke department proposals, and publish newly engineered training agendas.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 transition-colors p-4 rounded-xl shrink-0 space-y-1 z-10 font-mono text-[10px] text-slate-700">
          <p><span className="text-slate-500 uppercase">Session Token:</span> ID-MASTER-SEC</p>
          <p><span className="text-slate-500 uppercase">Authority Level:</span> High Secretary</p>
          <p><span className="text-slate-500 uppercase">Gateway Domain:</span> sikkim.gov.in</p>
        </div>
      </div>

      {/* 2. Admin Analytics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center gap-4 shadow-xs">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-primary shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block">Registrations Audit</span>
            <span className="text-lg font-black text-primary font-heading leading-tight">{displayApps.length}</span>
            <span className="text-[9px] block text-outline font-medium">Officers pending/approved</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center gap-4 shadow-xs">
          <div className="w-10 h-10 bg-secondary-container rounded-lg flex items-center justify-center text-secondary shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block">Course Catalog</span>
            <span className="text-lg font-black text-secondary font-heading leading-tight">{courses.length}</span>
            <span className="text-[9px] block text-outline font-medium">Programs active in directory</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center gap-4 shadow-xs">
          <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block">Dept Proposals</span>
            <span className="text-lg font-black text-amber-600 font-heading leading-tight">{customRequests.length}</span>
            <span className="text-[9px] block text-outline font-medium">Bespoke syllabus requests</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center gap-4 shadow-xs">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block">Active Departments</span>
            <span className="text-lg font-black text-emerald-600 font-heading leading-tight">9</span>
            <span className="text-[9px] block text-outline font-medium">Sikkim state divisions online</span>
          </div>
        </div>
      </div>

      {/* 3. Navigation Controls */}
      <div className="flex border-b border-outline-variant gap-4">
        <button
          onClick={() => setActiveAdminSubTab('applications')}
          className={`pb-3 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
            activeAdminSubTab === 'applications'
              ? 'border-b-2 border-primary text-primary font-black'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Officer Registrations ({displayApps.length})
        </button>
        <button
          onClick={() => setActiveAdminSubTab('proposals')}
          className={`pb-3 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
            activeAdminSubTab === 'proposals'
              ? 'border-b-2 border-primary text-primary font-black'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Department Proposals ({customRequests.length})
        </button>
        <button
          onClick={() => setActiveAdminSubTab('add_course')}
          className={`pb-3 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
            activeAdminSubTab === 'add_course'
              ? 'border-b-2 border-primary text-primary font-black animate-pulse'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          ⚙️ Program Builder Center
        </button>
        <button
          onClick={() => setActiveAdminSubTab('completed_trainings')}
          className={`pb-3 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
            activeAdminSubTab === 'completed_trainings'
              ? 'border-b-2 border-primary text-primary font-black'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          🖼️ Completed Gallery Editor ({completedTrainings.length})
        </button>
      </div>

      {/* 4. Sub-views Router */}
      {activeAdminSubTab === 'applications' && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-xs animate-in fade-in duration-200">
          <div className="p-4 bg-surface border-b border-outline-variant font-bold text-xs text-primary uppercase tracking-wider flex justify-between items-center">
            <span>Official Candidate Enrollment Registration List</span>
            <span className="text-[10px] text-outline font-medium italic lowercase">click buttons to change statuses instantly</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-outline-variant">
              <thead className="bg-[#f8fafc] text-on-surface-variant uppercase tracking-wider font-extrabold text-[10px] border-b border-outline-variant">
                <tr>
                  <th className="p-4">Applicant Detail</th>
                  <th className="p-4">Target Course</th>
                  <th className="p-4">Submission Date</th>
                  <th className="p-4">Status Class</th>
                  <th className="p-4 text-right">Audit Action Override</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {displayApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-primary text-sm">{app.fullName}</div>
                      <div className="text-[10px] font-mono text-outline font-bold">{app.employeeId}</div>
                      <div className="text-[11px] text-on-surface-variant mt-1">
                        <strong>{app.designation}</strong> • {app.department}
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-primary max-w-sm truncate">
                      {app.courseTitle}
                    </td>
                    <td className="p-4 text-on-surface-variant font-mono">
                      {app.submittedAt}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        app.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : app.status === 'Requires NOC'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}>
                        {app.status === 'Approved' ? (
                          <CheckCircle2 className="w-3 h-3 shrink-0" />
                        ) : (
                          <AlertCircle className="w-3 h-3 shrink-0" />
                        )}
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex gap-1.5">
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'Approved')}
                          className="px-2 py-1 border border-emerald-500 text-emerald-600 rounded bg-emerald-50/50 hover:bg-emerald-500 hover:text-white transition-all text-[10px] font-bold cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'Requires NOC')}
                          className="px-2 py-1 border border-amber-500 text-amber-600 rounded bg-amber-50/50 hover:bg-amber-500 hover:text-white transition-all text-[10px] font-bold cursor-pointer"
                        >
                          Req NOC
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'Pending Review')}
                          className="px-2 py-1 border border-slate-400 text-slate-600 rounded hover:bg-slate-400 hover:text-white transition-all text-[10px] font-bold cursor-pointer"
                        >
                          Reset Review
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeAdminSubTab === 'proposals' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline border-l-4 border-amber-500">
            <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
              <strong>Custom Department Proposals:</strong> Standard course curriculum demands drafted by Sikkim's administrative bodies to close critical regional skill gaps. You can audit these proposals, assign investigators, or click <strong>"Approve & Inject as Live Course"</strong> to instantly convert them into active training curriculums of the institute.
            </p>
          </div>

          {customRequests.length === 0 ? (
            <div className="bg-surface-container-lowest border border-outline-variant p-10 rounded-xl text-center space-y-3">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto animate-bounce" />
              <p className="font-bold text-primary text-sm">No custom proposals logged currently.</p>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                Once departments request personalized schedules (such as cybersecurity, hill farming, or local accounts auditing), they appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customRequests.map((req) => (
                <div key={req.id} className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {req.department}
                        </span>
                        <h3 className="font-bold text-primary text-base mt-1.5">{req.trainingTopic}</h3>
                      </div>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        req.status === 'Under Review'
                          ? 'bg-blue-5 p-1 text-blue-700 border border-blue-200'
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {req.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-outline font-mono">
                      <p>👥 Target Officers: {req.expectedParticipants}</p>
                      <p>📅 Submitted: {req.submittedAt}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-outline-variant flex justify-between items-center">
                    <span className="text-[10px] text-outline font-bold">Proposal {req.id}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReviewProposal(req.id, 'Under Review')}
                        className="px-3 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors rounded text-xs font-bold cursor-pointer"
                      >
                        Set Under Review
                      </button>
                      <button
                        onClick={() => handleConvertProposalToCourse(req)}
                        className="px-3 py-1.5 bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors rounded text-xs font-black flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Approve & Inject Agenda
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeAdminSubTab === 'add_course' && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-xs max-w-3xl mx-auto animate-in fade-in duration-200">
          <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-950 border-b border-outline-variant text-white flex justify-between items-center">
            <span className="font-extrabold text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-amber-400" /> Create / Draft Academic Training Class
            </span>
            <span className="text-[10px] bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full font-black">
              LIVE CATALOG SYNC
            </span>
          </div>

          <form onSubmit={handleCreateCourseSubmit} className="p-6 md:p-8 space-y-4 text-xs text-on-surface-variant">
            
            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl font-bold text-center animate-bounce">
                {successMsg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-outline mb-1">
                  Training Module Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Public Finance and Fiscal Systems"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary outline-none text-on-surface font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-outline mb-1">
                  Topic Category *
                </label>
                <select
                  value={newCourseCategory}
                  onChange={(e) => setNewCourseCategory(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary outline-none cursor-pointer font-semibold text-on-surface"
                >
                  <option value="Governance">Governance</option>
                  <option value="Public Policy">Public Policy</option>
                  <option value="IT & Digital">IT & Digital</option>
                  <option value="Finance">Finance</option>
                  <option value="Disaster Management">Disaster Management</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-outline mb-1">
                  Duration Period *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2 Weeks (Hybrid) or 5 Sessions"
                  value={newCourseDuration}
                  onChange={(e) => setNewCourseDuration(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary outline-none text-on-surface font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-outline mb-1">
                  Enrollment Cutoff Deadline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. December 15, 2026"
                  value={newCourseDeadline}
                  onChange={(e) => setNewCourseDeadline(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary outline-none text-on-surface font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-outline mb-1">
                  Assigned Head Faculty / Convener *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shri Pintso Lepcha, IAS"
                  value={newCourseFaculty}
                  onChange={(e) => setNewCourseFaculty(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary outline-none text-on-surface font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-outline mb-1">
                  Faculty Official Designation Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Director, Department of Revenue"
                  value={newCourseFacultyTitle}
                  onChange={(e) => setNewCourseFacultyTitle(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary outline-none text-on-surface"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-outline mb-1">
                Candidate Admission Prerequisites
              </label>
              <input
                type="text"
                placeholder="e.g. All permanent officers, recommended for treasury clerks and above"
                value={newCoursePrereq}
                onChange={(e) => setNewCoursePrereq(e.target.value)}
                className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary outline-none text-on-surface"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-outline mb-1">
                Detailed Course Syllabus & Rationale Description *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Examine comprehensive guidelines on bookkeeping, balance audits, and municipal bond rating standards..."
                value={newCourseDesc}
                onChange={(e) => setNewCourseDesc(e.target.value)}
                className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary outline-none resize-none text-on-surface font-sans"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setNewCourseTitle('');
                  setNewCourseFaculty('');
                  setNewCourseDesc('');
                }}
                className="px-5 py-2.5 border border-outline-variant hover:bg-surface-container rounded-lg font-bold transition-all cursor-pointer"
              >
                Clear Fields
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary text-on-primary hover:bg-primary-container rounded-lg font-extrabold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5" /> Publish Training Modules
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Dynamic Completed Trainings Management Sub-view */}
      {activeAdminSubTab === 'completed_trainings' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Form to add a completed training */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-xs max-w-3xl mx-auto">
            <div className="p-4 bg-[#002540] border-b border-outline-variant text-white flex justify-between items-center">
              <span className="font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-amber-300" /> Catalog New Concluded Training Record
              </span>
              <span className="text-[9px] bg-amber-400 text-slate-950 px-2 rounded-full font-black">
                GALLERY PERSISTENCE
              </span>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!compTitle || !compDetails) {
                  alert('Please fill out the Title and Details fields.');
                  return;
                }
                const tagsArray = compTagsStr.split(',').map(t => t.trim()).filter(Boolean);
                const newRecord: CompletedTraining = {
                  id: `comp-${Date.now()}`,
                  title: compTitle,
                  completionDate: compDate,
                  details: compDetails,
                  image: compImage,
                  participantsCount: Number(compParticipants) || 10,
                  duration: compDuration,
                  department: compDept,
                  tags: tagsArray
                };

                const updated = [newRecord, ...completedTrainings];
                setCompletedTrainings(updated);
                localStorage.setItem('ati_sikkim_completed_trainings', JSON.stringify(updated));

                setCompSuccessMsg('Successfully Published Completed Training! Dynamic gallery has been updated.');
                setCompTitle('');
                setCompDetails('');
                
                setTimeout(() => setCompSuccessMsg(''), 4000);
              }} 
              className="p-6 space-y-4 text-xs text-on-surface-variant"
            >
              {compSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded-lg font-bold text-center">
                  {compSuccessMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-outline mb-1">
                    Completed Program Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sikkim e-Procurement Systems Review"
                    value={compTitle}
                    onChange={(e) => setCompTitle(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 hover:border-slate-350 focus:ring-1 focus:ring-primary outline-none font-semibold text-on-surface"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-outline mb-1">
                    Sponsoring Department *
                  </label>
                  <select
                    value={compDept}
                    onChange={(e) => setCompDept(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 focus:ring-1 focus:ring-primary outline-none font-semibold text-on-surface cursor-pointer"
                  >
                    {DEPARTMENTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-outline mb-1">
                    Concluded Date *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. April 2026"
                    value={compDate}
                    onChange={(e) => setCompDate(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 font-semibold text-on-surface focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-outline mb-1">
                    Duration Period *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1 Week"
                    value={compDuration}
                    onChange={(e) => setCompDuration(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 font-semibold text-on-surface focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-outline mb-1">
                    Total Certified Gazetted Officers *
                  </label>
                  <input
                    type="number"
                    required
                    value={compParticipants}
                    onChange={(e) => setCompParticipants(Number(e.target.value))}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 font-semibold text-on-surface focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-outline mb-1">
                    Competency Tags (Comma Separated) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. E-Governance, GIS, Security"
                    value={compTagsStr}
                    onChange={(e) => setCompTagsStr(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 font-semibold text-on-surface focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-outline mb-1">
                  Representative Photo URL *
                </label>
                <input
                  type="text"
                  required
                  value={compImage}
                  onChange={(e) => setCompImage(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 font-medium text-slate-705 font-mono focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-outline mb-1">
                  Accomplished Report Details *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summarize the core achievements and metrics..."
                  value={compDetails}
                  onChange={(e) => setCompDetails(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 font-sans focus:ring-1 focus:ring-primary outline-none resize-none text-on-surface"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#002540] text-white hover:bg-slate-900 rounded-lg font-black flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" /> Publish Gallery Item
                </button>
              </div>
            </form>
          </div>

          {/* Table list to delete/manage active Completed Trainings */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 bg-surface border-b border-outline-variant font-bold text-xs text-slate-800 uppercase tracking-wider flex justify-between items-center">
              <span>Dynamic Gallery Content Registry ({completedTrainings.length})</span>
              <span className="text-[10px] text-slate-400 font-medium italic">Click delete to purge from dynamic database instantly</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-outline-variant">
                <thead className="bg-[#f8fafc] text-on-surface-variant uppercase tracking-wider font-extrabold text-[10px] border-b border-outline-variant">
                  <tr>
                    <th className="p-4">Training details</th>
                    <th className="p-4">Sponsor & Duration</th>
                    <th className="p-4">Accreditation stats</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {completedTrainings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img 
                          src={item.image} 
                          className="w-12 h-9 rounded object-cover border border-slate-200 shrink-0" 
                          alt="Thumbnail"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-bold text-slate-800 text-sm leading-tight">{item.title}</div>
                          <div className="text-[10px] text-slate-500 font-medium mt-0.5">Concluded: {item.completionDate}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-[10.5px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded block w-fit mb-1">{item.department}</span>
                        <span className="text-[10px] text-slate-500 font-mono">🕒 {item.duration}</span>
                      </td>
                      <td className="p-4">
                        <div className="text-xs font-bold text-slate-800">👥 {item.participantsCount} certified</div>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {item.tags.map(t => (
                            <span key={t} className="text-[9px] bg-slate-50 text-slate-500 stroke-1. w-fit font-bold px-1 rounded border border-slate-150">#{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${item.title}" from the public gallery?`)) {
                              const updated = completedTrainings.filter(t => t.id !== item.id);
                              setCompletedTrainings(updated);
                              localStorage.setItem('ati_sikkim_completed_trainings', JSON.stringify(updated));
                            }
                          }}
                          className="p-1.5 text-red-600 border border-slate-200 hover:border-red-400 hover:bg-rose-50 rounded transition-all cursor-pointer inline-flex items-center gap-1 text-[10px] font-bold"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {completedTrainings.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-500 font-medium italic">
                        No completed programs registered in gallery currently. Create one above!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
