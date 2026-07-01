const SHADDA = '\u0651';
const SUKUN = '\u0652';
const TANWEEN = new Set(['\u064B', '\u064C', '\u064D']);

const IKFA_LETTERS = new Set(['ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ف', 'ق', 'ك']);
const QALQALAH_LETTERS = new Set(['ق', 'ط', 'ب', 'ج', 'د']);
const IDGHAM_BIGHUNNAH = new Set(['ي', 'ن', 'م', 'و']);
const IDGHAM_BILA_GHUNNAH = new Set(['ل', 'ر']);

const BASE_CHAR = /\p{Letter}/u;

interface Token {
  text: string;
  base: string;
  hasShadda: boolean;
  hasSukun: boolean;
  hasTanween: boolean;
}

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let buf = '';
  for (const ch of text) {
    if (BASE_CHAR.test(ch)) {
      if (buf) tokens.push(parseToken(buf));
      buf = ch;
    } else {
      buf += ch;
    }
  }
  if (buf) tokens.push(parseToken(buf));
  return tokens;
}

function parseToken(s: string): Token {
  const base = s[0];
  const diac = s.slice(1);
  return {
    text: s,
    base,
    hasShadda: diac.includes(SHADDA),
    hasSukun: diac.includes(SUKUN),
    hasTanween: [...diac].some(c => TANWEEN.has(c)),
  };
}

export type TajweedColor = 'red' | 'green' | 'blue' | 'orange' | 'purple' | 'brown';

export function getTajweedColor(text: string): TajweedColor[] {
  const tokens = tokenize(text);
  const colors: TajweedColor[] = tokens.map(() => undefined as unknown as TajweedColor);

  function nextNonAlif(i: number): Token | undefined {
    if (i + 1 >= tokens.length) return undefined;
    const next = tokens[i + 1];
    if (next.base === 'ا' && i + 2 < tokens.length) return tokens[i + 2];
    return next;
  }

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];

    if ((t.base === 'ن' || t.base === 'م') && t.hasShadda) {
      colors[i] = 'red';
    }

    if (i + 1 < tokens.length) {
      const next = nextNonAlif(i);
      if (!next) continue;

      if (t.hasTanween && IKFA_LETTERS.has(next.base)) {
        colors[i] = 'green';
        colors[i + (tokens[i + 1]?.base === 'ا' ? 2 : 1)] ??= 'green';
      }
      if (t.base === 'ن' && t.hasSukun && IKFA_LETTERS.has(next.base)) {
        colors[i] = 'green';
        colors[i + (tokens[i + 1]?.base === 'ا' ? 2 : 1)] ??= 'green';
      }

      if (t.hasTanween && next.base === 'ب') {
        colors[i] = 'brown';
        colors[i + (tokens[i + 1]?.base === 'ا' ? 2 : 1)] ??= 'brown';
      }
      if (t.base === 'ن' && t.hasSukun && next.base === 'ب') {
        colors[i] = 'brown';
        colors[i + (tokens[i + 1]?.base === 'ا' ? 2 : 1)] ??= 'brown';
      }

      if (t.hasTanween && IDGHAM_BIGHUNNAH.has(next.base) && next.base !== 'ن') {
        colors[i] = 'orange';
        colors[i + (tokens[i + 1]?.base === 'ا' ? 2 : 1)] ??= 'orange';
      }
      if (t.base === 'ن' && t.hasSukun && IDGHAM_BIGHUNNAH.has(next.base) && next.base !== 'ن') {
        colors[i] = 'orange';
        colors[i + (tokens[i + 1]?.base === 'ا' ? 2 : 1)] ??= 'orange';
      }
      if (t.hasTanween && IDGHAM_BILA_GHUNNAH.has(next.base)) {
        colors[i] = 'purple';
        colors[i + (tokens[i + 1]?.base === 'ا' ? 2 : 1)] ??= 'purple';
      }
      if (t.base === 'ن' && t.hasSukun && IDGHAM_BILA_GHUNNAH.has(next.base)) {
        colors[i] = 'purple';
        colors[i + (tokens[i + 1]?.base === 'ا' ? 2 : 1)] ??= 'purple';
      }
    }

    if (QALQALAH_LETTERS.has(t.base) && t.hasSukun) {
      colors[i] = 'blue';
    }
  }

  return colors;
}

export interface ColoredSegment {
  text: string;
  color?: TajweedColor;
}

export interface RuleLegend {
  color: TajweedColor;
  label: string;
  description: string;
}

export const TAJWEED_RULES: RuleLegend[] = [
  { color: 'red', label: 'Ghunnah', description: 'Nasalization — ن or م with shaddah' },
  { color: 'green', label: 'Ikhfa', description: 'Hidden — noon sakin/tanween before ikhfa letters' },
  { color: 'blue', label: 'Qalqalah', description: 'Echo — ق ط ب ج د with sukun' },
  { color: 'orange', label: 'Idgham bi-ghunnah', description: 'Merging with ghunnah — noon sakin/tanween before ي م و' },
  { color: 'purple', label: 'Idgham bila ghunnah', description: 'Merging without ghunnah — noon sakin/tanween before ل ر' },
  { color: 'brown', label: 'Iqlab', description: 'Conversion — noon sakin/tanween before ب' },
];

export function toColoredSegments(text: string): ColoredSegment[] {
  const tokens = tokenize(text);
  const colors = getTajweedColor(text);
  const segments: ColoredSegment[] = [];

  for (let i = 0; i < tokens.length; ) {
    const color = colors[i];
    let j = i + 1;
    let buf = tokens[i].text;
    while (j < tokens.length && colors[j] === color) {
      buf += tokens[j].text;
      j++;
    }
    segments.push({ text: buf, color: color || undefined });
    i = j;
  }

  return segments;
}
