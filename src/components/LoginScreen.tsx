import React, { useState } from 'react';
import { User } from '../types';
import { DEPARTMENTS } from '../data';
import ThreeCanvas from './ThreeCanvas';
import SikkimLogo from './SikkimLogo';

interface LoginScreenProps {
  onLoginSuccess: (user: User) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [activeLoginTab, setActiveLoginTab] = useState<'officer' | 'master'>('officer');
  
  // Officer state
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [phone, setPhone] = useState('');
  
  // Master state
  const [masterId, setMasterId] = useState('ADMIN-MASTER-001');
  const [masterSecurityKey, setMasterSecurityKey] = useState('Sikkim@ATI#2026');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [supportMessage, setSupportMessage] = useState<string | null>(null);
  const [accessReqSuccess, setAccessReqSuccess] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);

  // New Department request state
  const [reqDept, setReqDept] = useState('');
  const [reqOfficialName, setReqOfficialName] = useState('');
  const [reqOfficialEmail, setReqOfficialEmail] = useState('');
  const [reqJustification, setReqJustification] = useState('');

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate active Google Workspace Authentication flow
    setTimeout(() => {
      onLoginSuccess({
        name: 'Tenzing Namgyal',
        employeeId: 'SK-10452-AD',
        designation: 'Under Secretary',
        department: 'IT & Digital Technology',
        phone: '9876543210',
        isLoggedIn: true,
        email: 'tenzing.namgyal@sikkim.gov.in',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120' // premium avatar
      });
      setIsLoading(false);
    }, 1200);
  };

  const handleEmployeeLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empId || !password) {
      setError('Please provide correct employee credentials.');
      return;
    }
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      onLoginSuccess({
        name: fullName || 'Karma Gyatso',
        employeeId: empId.toUpperCase(),
        designation: designation || 'Assistant Director',
        department: department || 'Finance Department',
        phone: phone || '9632587410',
        isLoggedIn: true,
        email: `${(fullName || 'karma_gyatso').toLowerCase().replace(/\s+/g, '.')}@sikkim.gov.in`
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleMasterLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterId !== 'ADMIN-MASTER-001' || masterSecurityKey !== 'Sikkim@ATI#2026') {
      setError('Security violation: invalid Master Administrative security token credentials.');
      return;
    }
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      onLoginSuccess({
        name: 'Dr. Rajesh Tshering, IAS',
        employeeId: 'ADMIN-MASTER-001',
        designation: 'Director & Executive Chairman',
        department: 'Administration Headquarters Office',
        phone: '03592-202410',
        isLoggedIn: true,
        email: 'director-ati@sikkim.gov.in',
        avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120&h=120',
        isAdmin: true
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleAccessRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqDept || !reqOfficialName || !reqOfficialEmail) {
      alert('Please fill out all mandatory fields for requesting department activation.');
      return;
    }
    setAccessReqSuccess(true);
    setTimeout(() => {
      setShowAccessModal(false);
      setAccessReqSuccess(false);
      setReqDept('');
      setReqOfficialName('');
      setReqOfficialEmail('');
      setReqJustification('');
      alert('Access request compiled and dispatched to the State IT Cell. Review usually completes in 1-2 business days.');
    }, 2000);
  };

  return (
    <div className="min-h-screen py-12 px-4 flex flex-col justify-center items-center relative overflow-hidden bg-[#fafbfc] font-sans">
      
      {/* Immersive 3D Terrain Wave Background */}
      <ThreeCanvas />

      <main className="w-full max-w-[440px] z-10 transition-all duration-300">
        
        {/* Crisp Light Institutional Portal Card */}
        <div id="login-card" className="login-card bg-white border border-slate-200 p-8 rounded-2xl shadow-sm text-slate-800">
          
          {/* Header State Seal & Branding */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="mb-4 w-20 h-20 hover:scale-105 transition-all duration-300 relative flex items-center justify-center bg-slate-50 rounded-full p-2 border border-slate-100">
              <SikkimLogo className="w-16 h-16 relative z-10" isDark={false} />
            </div>
            <h1 className="font-heading text-lg font-bold tracking-tight text-slate-900">
              Administrative Training Institute
            </h1>
            <p className="text-[10px] font-bold tracking-widest text-[#002540] uppercase mt-1">
              Government of Sikkim
            </p>
          </div>

          {/* Secure Navigation Tabs to demonstrate the Master Login */}
          <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-lg border border-slate-200 mb-6 gap-1">
            <button
              onClick={() => {
                setActiveLoginTab('officer');
                setError('');
              }}
              className={`py-2 px-3 text-xs font-bold rounded-md transition-all cursor-pointer ${
                activeLoginTab === 'officer'
                  ? 'bg-white text-slate-900 border border-slate-200/50 shadow-xs'
                  : 'text-slate-500 hover:text-slate-850'
              }`}
            >
              Officers Portal
            </button>
            <button
              onClick={() => {
                setActiveLoginTab('master');
                setError('');
              }}
              className={`py-2 px-3 text-xs font-bold rounded-md transition-all cursor-pointer ${
                activeLoginTab === 'master'
                  ? 'bg-[#002540] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-850'
              }`}
            >
              🔑 Master Login
            </button>
          </div>

          {/* Context Alert box */}
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg mb-6 border-l-2 border-[#002540]">
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
              {activeLoginTab === 'officer' 
                ? 'Authorized access is restricted to Sikkim State Service Government Officials only. Select your sign in method below.'
                : 'Central Administration Master Session. Demonstration credentials pre-loaded for Director audits.'}
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-3">
              <div className="w-8 h-8 border-2 border-[#002540] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-bold tracking-wider text-slate-800 uppercase">Verifying Key Credentials...</p>
              <p className="text-[10px] text-slate-500 font-medium">Consulting Secure Central Registry State Database.</p>
            </div>
          ) : activeLoginTab === 'officer' ? (
            /* Officers standard views */
            !showEmployeeForm ? (
              <div className="space-y-4">
                <button
                  id="google-signin-btn"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-800 font-semibold py-3 px-6 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-xs text-sm"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Sign in with Google Workspace
                </button>

                <div className="flex items-center gap-2 py-1">
                  <div className="h-[1px] w-full bg-slate-200"></div>
                  <span className="text-[9px] font-bold tracking-widest text-slate-400 shrink-0 uppercase">OR</span>
                  <div className="h-[1px] w-full bg-slate-200"></div>
                </div>

                <button
                  id="employee-form-toggle"
                  onClick={() => setShowEmployeeForm(true)}
                  className="block w-full text-center bg-slate-50 border border-slate-200 text-[#002540] font-bold py-3 px-6 rounded-xl hover:bg-slate-100 transition-all duration-200 cursor-pointer text-sm"
                >
                  Login with Employee ID
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmployeeLoginSubmit} className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold text-[#002540]">Statutory Employee Access</span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEmployeeForm(false);
                      setError('');
                    }}
                    className="text-[10px] text-slate-500 font-bold hover:text-slate-900 transition-colors"
                  >
                    ← Google Auth
                  </button>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-2.5 rounded-lg text-[11px] leading-snug">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Employee ID *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SK-10452-AD"
                      value={empId}
                      onChange={(e) => setEmpId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-805 placeholder-slate-400 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      System Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-805 placeholder-slate-400 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div className="pt-2">
                    <span className="text-[9px] text-slate-400 font-black tracking-wider block mb-1">PREFILL PROFILE (OPTIONAL)</span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-[10px] text-slate-805 placeholder-slate-400 focus:outline-none focus:border-slate-400"
                      />
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-[10px] text-slate-700 focus:outline-none focus:border-slate-400 cursor-pointer"
                      >
                        <option value="">Department</option>
                        {DEPARTMENTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#002540] text-white py-3 rounded-xl hover:bg-[#001c31] font-bold text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer mt-4"
                >
                  Access Portal
                </button>
              </form>
            )
          ) : (
            /* Master admin forms view */
            <form onSubmit={handleMasterLoginSubmit} className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-[#002540] uppercase tracking-wider">Master Command Bypass</span>
                <span className="text-[9px] font-black text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Verified Link</span>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-2.5 rounded-lg text-[11px] leading-snug">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">
                      Master Administrator Token ID
                    </label>
                    <span className="text-[9px] text-slate-500 font-mono">Preloaded</span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="ADMIN-MASTER-001"
                    value={masterId}
                    onChange={(e) => setMasterId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono text-[#002540] focus:outline-none focus:border-slate-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">
                      Superuser Security Key Passcode
                    </label>
                    <span className="text-[9px] text-slate-500 font-mono">Demonstration Config</span>
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="Sikkim@ATI#2026"
                    value={masterSecurityKey}
                    onChange={(e) => setMasterSecurityKey(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono text-[#002540] focus:outline-none focus:border-slate-400"
                  />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-[10px] text-slate-650 leading-normal space-y-1">
                <p>💡 **Simulation Guide:** Clicking below will bypass ordinary officer registration limits and load the full-suite **ATI Training Administration Command Desk**.</p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#002540] text-white py-3 rounded-xl hover:bg-[#001c31] font-bold text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer mt-4"
              >
                Sign In As Master Admin
              </button>
            </form>
          )}

          {/* Links for Department Request / Support */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
            <button
              onClick={() => setShowAccessModal(true)}
              className="flex items-center gap-2 text-[11px] text-slate-600 hover:text-[#002540] transition-colors text-left font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-slate-500">lan</span>
              Request Access for New Department
            </button>

            <button
              onClick={() => {
                setSupportMessage(
                  supportMessage
                    ? null
                    : 'IT Support Helpline: +91-3592-202410. Email: support-ati@sikkim.gov.in. State Secretariat, IT Cell, Block C.'
                );
              }}
              className="flex items-center gap-2 text-[11px] text-slate-600 hover:text-[#002540] transition-colors text-left font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-slate-500">help_outline</span>
              Trouble logging in? Contact State IT Cell
            </button>

            {supportMessage && (
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-[10.5px] text-slate-600 italic font-medium leading-relaxed border-l-2 border-[#002540]">
                {supportMessage}
              </div>
            )}
          </div>
        </div>

        {/* Footer info block */}
        <footer className="mt-8 text-center px-4">
          <p className="text-[10px] text-slate-400 mb-2 font-bold tracking-tight">
            © 2026 Administrative Training Institute, Sikkim
          </p>
          <div className="flex justify-center gap-4 text-[10px] font-bold text-slate-400">
            <a href="#privacy" className="hover:text-slate-600">Privacy Directives</a>
            <span className="text-slate-300">•</span>
            <a href="https://sikkim.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600">
              Sikkim.gov.in
            </a>
          </div>
        </footer>
      </main>

      {/* Access Modal overlay */}
      {showAccessModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl animate-in fade-in zoom-in duration-200 text-slate-800">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <span className="font-bold text-[#002540] text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-600 text-sm">lan</span>
                Department Activation Registry
              </span>
              <button
                onClick={() => setShowAccessModal(false)}
                className="text-slate-400 hover:text-slate-800 text-xs font-bold p-1 block cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAccessRequestSubmit} className="space-y-4">
              <p className="text-[11px] text-slate-600 leading-relaxed">
                If your governmental department is not yet activated on the permanent ATI program registry, please complete this authorization request for review.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase text-slate-500 mb-1">
                    Department Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Department of Environment & Climate"
                    value={reqDept}
                    onChange={(e) => setReqDept(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-805 focus:outline-none focus:border-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] font-bold uppercase text-slate-500 mb-1">
                      Applicant Officer *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shri L. P. Gyatso"
                      value={reqOfficialName}
                      onChange={(e) => setReqOfficialName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-805 focus:outline-none focus:border-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase text-slate-500 mb-1">
                      Official Gov Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="lp.gyatso@sikkim.gov.in"
                      value={reqOfficialEmail}
                      onChange={(e) => setReqOfficialEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-805 focus:outline-none focus:border-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase text-slate-500 mb-1">
                    Justification Summary
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detail which upcoming courses your officials intend to register for..."
                    value={reqJustification}
                    onChange={(e) => setReqJustification(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-805 focus:outline-none focus:border-slate-400 resize-none font-sans"
                    maxLength={200}
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAccessModal(false)}
                  className="px-4 py-2 text-xs border border-slate-250 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={accessReqSuccess}
                  className="px-4 py-2 text-xs bg-[#002540] text-white rounded-lg hover:bg-[#001c31] font-bold flex items-center gap-1 cursor-pointer"
                >
                  {accessReqSuccess ? 'Submitting...' : 'Send Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
