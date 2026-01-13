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
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent hover:from-pink-600 hover:to-purple-700 transition-all hover:scale-110 active:scale-95">
              SheManagePCOS
            </Link>
          </div>
          
          <div className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href} 
                className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
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
              className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 p-2 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all"
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
                  className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 px-4 py-3 rounded-lg text-sm font-medium transition-all hover:bg-pink-50 dark:hover:bg-pink-900/20"
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
