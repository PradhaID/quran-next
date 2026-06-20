import {getTranslations} from 'next-intl/server';
import { Link } from '@/i18n/routing';

interface SiteNavProps {
  locale: string;
  current?: 'home' | 'about' | 'how-to' | 'learning';
}

export default async function SiteNav({ locale, current }: SiteNavProps) {
  const t = await getTranslations('Navigation');

  const links = [
    { key: 'home', href: '/', label: t('home') },
    { key: 'learning', href: '/learning', label: t('learning') },
    { key: 'about', href: '/about', label: t('about') },
    { key: 'how-to', href: '/how-to', label: t('howTo') },
  ] as const;

  return (
    <nav className="w-full flex items-center justify-center gap-1 mb-6">
      {links.map(link => (
        <Link
          key={link.key}
          href={link.href}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors inline-flex items-center gap-1.5 ${
            current === link.key
              ? 'bg-primary/10 text-primary hover:bg-primary/20'
              : 'text-foreground/60 hover:text-foreground hover:bg-primary/5'
          }`}
        >
          {link.key === 'home' && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          )}
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
