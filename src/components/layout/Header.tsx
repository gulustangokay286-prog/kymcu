'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { BUSINESS, NAV_LINKS } from '@/lib/constants';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass-header">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-20">
        {/* Logo - Ahlatci style (clean, white) */}
        <Link href="/" className="flex flex-col shrink-0">
          <span className="text-[15px] md:text-[22px] font-bold tracking-widest text-white uppercase luxury-header">
            {BUSINESS.shortName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 ml-8 flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-semibold text-white/80 hover:text-white hover:text-rose-400 transition-colors uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Badge - Ahlatci Style */}
        <div className="hidden md:flex items-center">
          <div className="bg-[#333333] px-4 py-2 flex flex-col text-right rounded-sm border border-white/10">
            <span className="text-[11px] text-white font-bold tracking-wider">A Grubu</span>
            <span className="text-[10px] text-white/70">Yetkili Müessese</span>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-1.5 text-white/70 hover:text-white"
          aria-label="Menü"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-border/50 bg-black/95 backdrop-blur-xl absolute top-20 left-0 w-full shadow-2xl">
          <div className="max-w-[1200px] mx-auto px-4 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[14px] font-semibold text-white/80 hover:text-white uppercase tracking-wider py-2 border-b border-white/10"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="bg-[#333333] px-2.5 py-1.5 mt-2 rounded-sm border border-white/10 inline-block w-max">
              <span className="block text-[10px] text-white font-bold tracking-wider">A Grubu</span>
              <span className="block text-[9px] text-white/70">Yetkili Müessese</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
