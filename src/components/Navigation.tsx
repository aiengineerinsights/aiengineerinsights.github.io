
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-slate-900">
            AIEngineerInsights
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/about" className="text-slate-700 hover:text-blue-600 transition-colors">About</Link>
            <Link to="/role-roadmap" className="text-slate-700 hover:text-blue-600 transition-colors">Role & Roadmap</Link>
            <Link to="/blogs" className="text-slate-700 hover:text-blue-600 transition-colors">Blogs</Link>
            <Link to="/projects" className="text-slate-700 hover:text-blue-600 transition-colors">Projects</Link>
            <Link to="/notes" className="text-slate-700 hover:text-blue-600 transition-colors">Notes</Link>
            <Link to="/resources" className="text-slate-700 hover:text-blue-600 transition-colors">Resources</Link>
            <Link to="/contact" className="text-slate-700 hover:text-blue-600 transition-colors">Contact</Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="py-4 space-y-2">
              <Link to="/about" className="block px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50">About</Link>
              <Link to="/role-roadmap" className="block px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50">Role & Roadmap</Link>
              <Link to="/blogs" className="block px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50">Blogs</Link>
              <Link to="/projects" className="block px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50">Projects</Link>
              <Link to="/notes" className="block px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50">Notes</Link>
              <Link to="/resources" className="block px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50">Resources</Link>
              <Link to="/contact" className="block px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
