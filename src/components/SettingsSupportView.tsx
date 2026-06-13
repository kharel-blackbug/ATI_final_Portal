import React from 'react';
import { User } from '../types';

interface SettingsSupportViewProps {
  type: 'settings' | 'support';
  onClose: () => void;
  user: User;
}

export default function SettingsSupportView({
  type,
  onClose,
  user
}: SettingsSupportViewProps) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest border border-outline rounded-xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        
        <div className="flex justify-between items-center pb-3 border-b border-outline-variant mb-4">
          <span className="font-extrabold text-primary text-md flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              {type === 'settings' ? 'settings' : 'contact_support'}
            </span>
            {type === 'settings' ? 'System Configurations & Account' : 'Administrative Training Institute Help & Support Desk'}
          </span>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary p-1 text-sm font-bold block"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5 text-xs text-on-surface-variant max-h-[440px] overflow-y-auto pr-1">
          {type === 'settings' ? (
            /* Settings View contents */
            <div className="space-y-4">
              <div className="bg-surface p-4 rounded-lg border border-outline-variant space-y-2">
                <p className="font-bold text-primary mb-1">Authenticated Account Profile</p>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <p><strong className="text-outline uppercase text-[9px] block">Officer Name</strong> {user.name}</p>
                  <p><strong className="text-outline uppercase text-[9px] block">Employee Token ID</strong> <span className="font-mono">{user.employeeId}</span></p>
                  <p className="col-span-2"><strong className="text-outline uppercase text-[9px] block">State Department</strong> {user.department}</p>
                  <p><strong className="text-outline uppercase text-[9px] block font-sans">Official Rank</strong> {user.designation}</p>
                  <p><strong className="text-outline uppercase text-[9px] block">Contact Duty Line</strong> +91 {user.phone}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-primary text-xs">Simulated e-Governance Database Compliance</p>
                <p className="leading-relaxed">
                  Compliance validation tools match the State Personnel Management System (SPMS) registry automatically. 
                </p>
                
                <div className="bg-secondary-container/20 text-on-secondary-container border border-secondary p-3 rounded text-[11px] space-y-1">
                  <p className="flex justify-between font-semibold">
                    <span>SPMS Account Status:</span>
                    <span className="font-bold">● ACTIVE & REGISTERED</span>
                  </p>
                  <p className="flex justify-between text-[10px]">
                    <span>Last Automated Synchronization:</span>
                    <span>Just Now</span>
                  </p>
                  <p className="flex justify-between text-[10px]">
                    <span>Security Domain Boundary:</span>
                    <span>sikkim.gov.in (Workspace)</span>
                  </p>
                </div>
              </div>

              <div className="border-t border-outline-variant pt-3 space-y-2">
                <h4 className="font-bold text-primary">State Security Guidelines</h4>
                <p className="leading-relaxed">
                  Under the freshly codified Sikkim Civil Services (Conduct) Rules, all registration activities are tracked. You might be asked to present physical copies of your Non-Objection Certificates (NOC) at the start of your training session.
                </p>
              </div>

            </div>
          ) : (
            /* Support assistance contents */
            <div className="space-y-4 font-sans leading-relaxed">
              <div className="space-y-1">
                <p className="font-bold text-primary">Need Assistance Registering?</p>
                <p>The Administrative Training Institute (ATI) support team is ready to assist civil servants navigating pre-qualification audits, NOC filings, and custom schedule requests.</p>
              </div>

              <div className="p-4 bg-surface rounded-xl border border-outline-variant space-y-2.5 text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">mail</span>
                  <span>support-ati@sikkim.gov.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">call</span>
                  <span>+91-3592-202410 (Ext: 113 Cell Desk)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                  <span>State Secretariat Complex, Block C, Room 14</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <p className="font-bold text-primary">Admission Prerequisites Checklist:</p>
                <ol className="list-decimal list-inside space-y-1 text-[11px]">
                  <li>Verify that your Employee ID matches your official government pay records.</li>
                  <li>Draft a customized 150-500 words <strong>Statement of Interest</strong> that outlines the strategic goals of your department.</li>
                  <li>Formulate a department head signed <strong>Non-Objection Certificate (NOC)</strong> and keep it ready for physical submission during registration desk verification.</li>
                  <li>Check state notification updates periodically regarding schedule modifications.</li>
                </ol>
              </div>

              <div className="bg-primary-fixed/20 p-3 rounded border border-outline-variant text-[11px] text-[#001d34]">
                <strong>Technical Support Duty Hours:</strong> Monday through Saturday (Except Gazetted Government Holidays) – 10:00 AM to 4:30 PM.
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 mt-4 border-t border-outline-variant flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-primary text-on-primary hover:bg-primary-container rounded font-bold text-xs uppercase tracking-wider cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
}
