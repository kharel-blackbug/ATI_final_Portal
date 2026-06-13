import React, { useState } from 'react';
import { DEPARTMENTS } from '../data';

interface ProposeTrainingDialogProps {
  onClose: () => void;
  onSubmitProposal: (proposal: {
    title: string;
    department: string;
    rationale: string;
    expectedOfficers: number;
    skillsTargeted: string;
  }) => void;
}

export default function ProposeTrainingDialog({
  onClose,
  onSubmitProposal
}: ProposeTrainingDialogProps) {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [rationale, setRationale] = useState('');
  const [expectedOfficers, setExpectedOfficers] = useState(15);
  const [skillsTargeted, setSkillsTargeted] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !department || !rationale) {
      alert('Please fill in the mandatory fields (Topic name, Department and Key Rationale)');
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      onSubmitProposal({
        title,
        department,
        rationale,
        expectedOfficers,
        skillsTargeted
      });
      setSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest border border-outline rounded-xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        
        <div className="flex justify-between items-center pb-3 border-b border-outline-variant mb-4">
          <span className="font-extrabold text-primary text-md flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">edit_square</span>
            Propose Innovative Custom Training
          </span>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary p-1 text-sm font-bold block"
          >
            ✕
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center text-center py-10 space-y-3">
            <span className="material-symbols-outlined text-secondary text-[48px] animate-bounce">check_circle</span>
            <h3 className="font-bold text-primary text-base">Proposal Dispatched Successfully</h3>
            <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
              Your customized curriculum request was logged in our state audit engine.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs text-on-surface-variant">
            <p className="leading-relaxed">
              Define the curriculum you wish to propose for administrative validation. Proposing helps coordinate specialized schedules corresponding to ministerial updates.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-outline mb-1">
                  Proposed Curriculum Topic Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hydro-Power Risk Coordination & Eco-Tourism Policy"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-outline mb-1">
                    Sponsoring Department *
                  </label>
                  <select
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded p-2 text-xs text-on-surface-variant outline-none cursor-pointer"
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-outline mb-1">
                    Expected Participant Officers
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={100}
                    value={expectedOfficers}
                    onChange={(e) => setExpectedOfficers(parseInt(e.target.value) || 15)}
                    className="w-full bg-surface border border-outline-variant rounded p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-outline mb-1">
                  Technical Skills & Methods Targeted
                </label>
                <input
                  type="text"
                  placeholder="e.g. Landslide planning, budget frameworks, coordination"
                  value={skillsTargeted}
                  onChange={(e) => setSkillsTargeted(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-outline mb-1">
                  Key Rationale & Policy Motivation *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail the urgent performance gaps this curriculum is designed to solve in state administration..."
                  value={rationale}
                  onChange={(e) => setRationale(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded p-2 text-xs focus:ring-1 focus:ring-primary outline-none resize-none"
                  maxLength={400}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-outline-variant flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-outline-variant rounded hover:bg-surface-container cursor-pointer font-bold text-[10px] uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-primary text-on-primary hover:bg-primary-container rounded font-bold text-[10px] uppercase tracking-wider cursor-pointer"
              >
                Submit Proposal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
