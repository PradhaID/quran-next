'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';

interface SiteNavProps {
  locale: string;
  current?: 'home' | 'about' | 'how-to' | 'learning';
}

export default function SiteNav({ locale, current }: SiteNavProps) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { key: 'home', href: '/', label: t('home') },
    { key: 'learning', href: '/learning', label: t('learning') },
    { key: 'about', href: '/about', label: t('about') },
    { key: 'how-to', href: '/how-to', label: t('howTo') },
  ] as const;

  const switchLang = (lang: string) => {
    router.replace(pathname, { locale: lang });
    setMenuOpen(false);
  };

  return (
    <nav className="w-full mb-6 bg-[#064E3B] rounded-2xl px-4 md:px-6 h-14 flex items-center justify-between shadow-sm">
      {/* Brand */}
      <Link href="/" className="text-white font-bold text-sm md:text-base tracking-tight flex items-center gap-2">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Quran Digital
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-1">
        {links.map(link => (
          <Link
            key={link.key}
            href={link.href}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              current === link.key
                ? 'bg-white/20 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Desktop language toggle */}
      <div className="hidden md:flex items-center gap-1">
        <button
          onClick={() => switchLang('en')}
          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
            locale === 'en'
              ? 'bg-white text-[#064E3B]'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => switchLang('id')}
          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
            locale === 'id'
              ? 'bg-white text-[#064E3B]'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          ID
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(o => !o)}
        className="md:hidden w-8 h-8 flex items-center justify-center text-white"
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full h-full bg-[#064E3B] z-50 flex flex-col items-center justify-center gap-6 md:hidden">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {links.map(link => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-lg font-semibold transition-colors ${
                current === link.key
                  ? 'text-white border-b-2 border-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={() => switchLang('en')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                locale === 'en'
                  ? 'bg-white text-[#064E3B]'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              English
            </button>
            <button
              onClick={() => switchLang('id')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                locale === 'id'
                  ? 'bg-white text-[#064E3B]'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              Indonesia
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
