// src/components/NavBar.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Globe, Info, CalendarIcon, MapIcon, BarChart3, Menu, X } from 'lucide-react';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on click outside or Escape key
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (open) {
        const target = event.target as Node;
        if (
          menuRef.current && !menuRef.current.contains(target) &&
          buttonRef.current && !buttonRef.current.contains(target)
        ) {
          setOpen(false);
        }
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const navLinks = [
    { href: '/', label: 'Home', icon: <Info className="w-4 h-4" /> },
    { href: '/calendar', label: 'Calendar', icon: <CalendarIcon className="w-4 h-4" /> },
    { href: '/map', label: 'Map', icon: <MapIcon className="w-4 h-4" /> },
    { href: '/ranking', label: 'Rankings', icon: <BarChart3 className="w-4 h-4" /> },
    { href: '/methodology', label: 'Methodology', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-900">
            <Globe className="w-6 h-6 text-blue-600" />
            Economic Calendar
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden sm:flex gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger button */}
          <button
            ref={buttonRef}
            className="sm:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <div
          ref={menuRef}
          className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-40 flex flex-col pt-20 px-4"
        >
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-slate-700 hover:text-blue-600 flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
