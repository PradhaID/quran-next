'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { PageTurnContext, type NavigateDir } from '@/lib/PageTurnContext';

interface SwipeNavigatorProps {
  prevHref: string | null;
  nextHref: string | null;
  children: ReactNode;
}

const ANIM_DURATION = 350;

export default function SwipeNavigator({ prevHref, nextHref, children }: SwipeNavigatorProps) {
  const router = useRouter();
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [animDir, setAnimDir] = useState<NavigateDir | null>(null);
  const animatingRef = useRef(false);

  const navigate = useCallback((dir: NavigateDir, href: string) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setAnimDir(dir);
    setTimeout(() => {
      router.push(href);
    }, ANIM_DURATION);
  }, [router]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (animatingRef.current) return;
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const start = touchStartRef.current;
    if (!start) return;
    touchStartRef.current = null;

    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;

    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;

    const href = dx > 0 ? nextHref : prevHref;
    if (href) navigate(dx > 0 ? 'next' : 'prev', href);
  }, [prevHref, nextHref, navigate]);

  const animStyle: React.CSSProperties = animDir
    ? {
        transform: `translateX(${animDir === 'next' ? 8 : -8}%) scale(0.94)`,
        opacity: 0,
        transition: `transform ${ANIM_DURATION}ms ease-in-out, opacity ${ANIM_DURATION}ms ease-in-out`,
      }
    : {};

  return (
    <PageTurnContext.Provider value={{ navigate }}>
      <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{ width: '100%', overflow: 'hidden' }}>
        <div style={animStyle}>
          {children}
        </div>
      </div>
    </PageTurnContext.Provider>
  );
}
