'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Understanding PCOS', href: '#understanding' },
    { name: 'Health Implications and Complications', href: '#health-implications' },
    { name: 'Lifestyle Management', href: '#lifestyle' },
    { name: 'Living with PCOS', href: '#living' },
    { name: 'References', href: '#references' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b shadow-sm" style={{ backgroundColor: 'rgba(255, 225, 224, 0.9)', borderColor: '#9B7EBD' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold transition-all hover:scale-110 active:scale-95" style={{ background: 'linear-gradient(to right, #F49BAB, #9B7EBD)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              SheManagePCOS
            </Link>
          </div>
          
          <div className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href} 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                style={{ color: '#7F5561' }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-all"
              style={{ color: '#7F5561' }}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className={`h-6 w-6 burger-icon-open`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className={`h-6 w-6 burger-icon-close`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 mobile-menu-enter">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium transition-all"
                  style={{ color: '#7F5561' }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
