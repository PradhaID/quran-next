'use client';

import { useEffect } from 'react';

export default function ScrollToAyah({ ayahNum }: { ayahNum: number | null }) {
  useEffect(() => {
    if (ayahNum == null) return;
    const el = document.getElementById(`ayah-${ayahNum}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [ayahNum]);
  return null;
}
