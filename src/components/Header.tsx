import React, { useState } from 'react';
import { User } from '../types';
import SikkimLogo from './SikkimLogo';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  notificationCount: number;
}

export default function Header({
  user,
  onLogout,
  activeNavTab,
  setActiveNavTab,
  notificationCount
}: HeaderProps) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);

  const navItems = user.isAdmin
    ? ['Directory', 'Training Calendar', 'Resources', 'Gallery', 'About ATI', 'Master Console']
    : ['Directory', 'Training Calendar', 'Resources', 'Gallery', 'About ATI'];

  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant h-20 fixed top-0 left-0 right-0 z-50 shadow-xs">
      <div className="flex justify-between items-center px-4 md:px-10 w-full max-w-7xl mx-auto h-full">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveNavTab('Directory')}>
          <div className="w-10 h-10 bg-transparent flex items-center justify-center overflow-hidden">
            <SikkimLogo className="w-10 h-10" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xs sm:text-sm md:text-base text-primary tracking-tight whitespace-nowrap leading-none flex items-center gap-1">
              Administrative Training Institute, Sikkim
            </span>
            <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black text-on-surface-variant uppercase tracking-widest leading-none mt-1">
              Government of Sikkim
            </span>
          </div>
        </div>

        {/* Desktop Navigation Link Tabs */}
        <nav className="hidden md:flex gap-6 h-full items-center">
          {navItems.map((tab) => {
            const isActive = activeNavTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveNavTab(tab)}
                className={`h-full px-3 flex items-center text-sm font-semibold border-b-2 hover:text-primary transition-colors cursor-pointer ${
                  isActive
                    ? 'border-primary text-primary font-bold'
                    : 'border-transparent text-on-surface-variant'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>

        {/* Global Toolbar */}
        <div className="flex items-center gap-2 md:gap-4 relative">
          
          {/* Notifications Icon Button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserDropdown(false);
                setShowHelpDropdown(false);
              }}
              className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors cursor-pointer text-[22px]"
            >
              notifications
            </button>
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-error text-on-error font-extrabold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-surface-container-lowest">
                {notificationCount}
              </span>
            )}

            {/* Notifications Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex justify-between items-center pb-2 border-b border-outline-variant mb-2">
                  <span className="font-bold text-xs text-primary uppercase tracking-wide">Notifications</span>
                  <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-bold">New</span>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  <div className="p-2 hover:bg-surface-container rounded-lg text-xs transition-colors cursor-pointer border-l-2 border-secondary">
                    <p className="font-bold text-on-surface">Interest Confirmed!</p>
                    <p className="text-on-surface-variant mt-1 leading-snug">Your Expression of Interest for the "Public Administration & Strategic Governance" module was submitted to the DoP.</p>
                    <p className="text-[9px] text-outline mt-1 font-mono">Just Now</p>
                  </div>
                  <div className="p-2 hover:bg-surface-container rounded-lg text-xs transition-colors cursor-pointer border-l-2 border-primary">
                    <p className="font-bold text-on-surface">New Course Uploaded</p>
                    <p className="text-on-surface-variant mt-1 leading-snug">Cyber-Security Protocol & Landslide Management modules are now open for winter enrollment.</p>
                    <p className="text-[9px] text-outline mt-1 font-mono">2 Hours Ago</p>
                  </div>
                  <div className="p-2 hover:bg-surface-container rounded-lg text-xs transition-colors cursor-pointer">
                    <p className="font-bold text-on-surface">NOC Checklist Available</p>
                    <p className="text-on-surface-variant mt-1 leading-snug">Check guidelines for the Non-Objection Certificate template on our resources tab.</p>
                    <p className="text-[9px] text-outline mt-1 font-mono">1 Day Ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Help Support Panel Toggle */}
          <div className="relative">
            <button
              onClick={() => {
                setShowHelpDropdown(!showHelpDropdown);
                setShowNotifications(false);
                setShowUserDropdown(false);
              }}
              className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors cursor-pointer text-[22px]"
            >
              help_outline
            </button>

            {showHelpDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="pb-2 border-b border-outline-variant mb-2">
                  <span className="font-bold text-xs text-primary uppercase tracking-wide">ATI Helpdesk Assistance</span>
                </div>
                <div className="text-xs text-on-surface-variant space-y-2">
                  <p className="leading-relaxed">Need help requesting a course or filling the SPMS details?</p>
                  <div className="bg-surface p-2.5 rounded border border-outline-variant space-y-1 text-[11px] font-mono font-medium">
                    <p>📧 support-ati@sikkim.gov.in</p>
                    <p>📞 +91-3592-202410 (Ext 113)</p>
                    <p>📍 Desk Cell, Ground Floor, ATI Complex</p>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveNavTab('About ATI');
                      setShowHelpDropdown(false);
                    }}
                    className="w-full text-center text-primary font-bold hover:underline block pt-2 text-[11px]"
                  >
                    View ATI Department Guidelines
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserDropdown(!showUserDropdown);
                setShowNotifications(false);
                setShowHelpDropdown(false);
              }}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-surface-container hover:bg-surface-container-high rounded-full transition-all border border-outline-variant cursor-pointer text-xs font-semibold text-primary"
            >
              <div className="w-6 h-6 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-[10px] overflow-hidden border border-outline">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.split(' ').map(p => p[0]).join('')
                )}
              </div>
              <span className="hidden sm:inline-block max-w-[110px] truncate">{user.name}</span>
              <span className="material-symbols-outlined text-[16px] text-outline leading-none">arrow_drop_down</span>
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
                {/* Profile attributes */}
                <div className="pb-3 border-b border-outline-variant mb-3">
                  <p className="font-bold text-on-surface text-sm">{user.name}</p>
                  <p className="text-[10px] font-bold text-on-surface-variant font-mono">{user.employeeId}</p>
                  <p className="text-xs text-secondary font-semibold mt-1">{user.designation}</p>
                  <p className="text-[11px] text-on-surface-variant italic mt-0.5">{user.department}</p>
                  {user.email && <p className="text-[10px] text-outline truncate mt-1">{user.email}</p>}
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      setActiveNavTab('Directory');
                      // Wait, we will support showing "My applications" if we trigger a click parameter
                      const event = new CustomEvent('show-my-applications');
                      window.dispatchEvent(event);
                    }}
                    className="w-full text-left font-medium text-xs text-on-surface-variant hover:bg-surface-container p-2 rounded transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    My Registrations / Applications
                  </button>

                  <button
                    onClick={onLogout}
                    className="w-full text-left font-bold text-xs text-error hover:bg-error-container p-2 rounded transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-error">logout</span>
                    Sign Out Security Sessions
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
