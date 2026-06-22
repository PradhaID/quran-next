import { redirect } from 'next/navigation';

const FIRST_SLUG: Record<string, string> = {
  'iqra-1': 'alif-dzal',
  'iqra-2': 'kasrah-i-sound',
  'iqra-3': 'sukun-no-vowel',
  'iqra-4': 'tasydid-doubled-letter',
  'iqra-5': 'waqf-stopping',
  'iqra-6': 'idgham-assimilation',
};

export default async function LevelPage({ params }: { params: Promise<{ locale: string; level: string }> }) {
  const { locale, level } = await params;
  const slug = FIRST_SLUG[level];
  if (!slug) redirect(`/${locale}/learning`);
  redirect(`/${locale}/learning/${level}/${slug}`);
}
