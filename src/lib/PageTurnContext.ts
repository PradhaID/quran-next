'use client';

import { createContext, useContext } from 'react';

export type NavigateDir = 'prev' | 'next';

export const PageTurnContext = createContext<{
  navigate: (dir: NavigateDir, href: string) => void;
}>({ navigate: () => {} });

export function usePageTurn() {
  return useContext(PageTurnContext);
}
