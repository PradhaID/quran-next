const STORAGE_KEY = 'lastReadPosition';

export interface LastReadPosition {
  surah: number;
  surahName: string;
  ayah: number;
  page: number;
}

export function saveLastRead(pos: LastReadPosition): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
  } catch { /* ignore */ }
}

export function loadLastRead(): LastReadPosition | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LastReadPosition;
  } catch {
    return null;
  }
}
