export type WaqfColor = 'waqf-red' | 'waqf-green' | 'waqf-yellow' | 'waqf-orange' | 'waqf-blue' | 'waqf-gray';

export interface WaqfSign {
  char: string;
  codepoint: number;
  name: string;
  meaning: string;
  color: WaqfColor;
}

export const WAQF_SIGNS: WaqfSign[] = [
  { char: '\u06D8', codepoint: 0x06D8, name: 'Lazim', meaning: 'must stop', color: 'waqf-red' },
  { char: '\u06D9', codepoint: 0x06D9, name: 'La', meaning: 'must continue', color: 'waqf-green' },
  { char: '\u06DA', codepoint: 0x06DA, name: 'Jaiz', meaning: 'allowed to stop or continue', color: 'waqf-yellow' },
  { char: '\u06D7', codepoint: 0x06D7, name: 'Qeela', meaning: 'some say to stop', color: 'waqf-orange' },
  { char: '\u06D6', codepoint: 0x06D6, name: 'Wasl', meaning: 'better to continue', color: 'waqf-blue' },
  { char: '\u06DB', codepoint: 0x06DB, name: 'Mu\'anaqah', meaning: 'paired stop', color: 'waqf-gray' },
];

export const WAQF_CHARS = new Set(WAQF_SIGNS.map(s => s.codepoint));

export const WAQF_COLORS: Record<WaqfColor, string> = {
  'waqf-red': '#e74c3c',
  'waqf-green': '#27ae60',
  'waqf-yellow': '#f1c40f',
  'waqf-orange': '#e67e22',
  'waqf-blue': '#3498db',
  'waqf-gray': '#95a5a6',
};

export function getWaqfSign(cp: number): WaqfSign | undefined {
  return WAQF_SIGNS.find(s => s.codepoint === cp);
}

export interface WaqfSpan {
  index: number;
  sign: WaqfSign;
}

export function findWaqfSpans(text: string): WaqfSpan[] {
  const spans: WaqfSpan[] = [];
  for (let i = 0; i < text.length; i++) {
    const cp = text.codePointAt(i);
    if (cp && WAQF_CHARS.has(cp)) {
      const sign = getWaqfSign(cp);
      if (sign) {
        spans.push({ index: i, sign });
      }
    }
  }
  return spans;
}

export function splitTextAtWaqf(text: string): Array<{ text: string; waqf?: WaqfSign }> {
  const waqfSpans = findWaqfSpans(text);
  if (waqfSpans.length === 0) return [{ text }];

  const parts: Array<{ text: string; waqf?: WaqfSign }> = [];
  let lastEnd = 0;

  for (const span of waqfSpans) {
    if (span.index > lastEnd) {
      parts.push({ text: text.slice(lastEnd, span.index) });
    }
    parts.push({ text: text[span.index], waqf: span.sign });
    lastEnd = span.index + 1;
  }

  if (lastEnd < text.length) {
    parts.push({ text: text.slice(lastEnd) });
  }

  return parts;
}
