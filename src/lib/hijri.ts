const MONTH_LENGTHS = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
const LEAP_CYCLE = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];

const HIJRI_MONTH_NAMES = [
  'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
  'Jumada al-Ula', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
  'Ramadan', 'Shawwal', 'Dhu al-Qi\'da', 'Dhu al-Hijja',
];

const HIJRI_MONTH_NAMES_ID = [
  'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir',
  'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Sya\'ban',
  'Ramadan', 'Syawwal', 'Zulqa\'dah', 'Zulhijjah',
];

function isLeapYear(hijriYear: number): boolean {
  return LEAP_CYCLE.includes(hijriYear % 30);
}

function daysInHijriYear(year: number): number {
  return isLeapYear(year) ? 355 : 354;
}

function daysInHijriMonth(year: number, month: number): number {
  if (month === 11 && isLeapYear(year)) return 30;
  return MONTH_LENGTHS[month];
}

const HIJRI_EPOCH = new Date(Date.UTC(622, 6, 16));

function hijriYearDays(year: number): number {
  let total = 0;
  for (let y = 1; y < year; y++) {
    total += daysInHijriYear(y);
  }
  return total;
}

function hijriToDays(year: number, month: number, day: number): number {
  let total = hijriYearDays(year);
  for (let m = 0; m < month; m++) {
    total += daysInHijriMonth(year, m);
  }
  total += day - 1;
  return total;
}

function daysToGregorian(days: number): { year: number; month: number; day: number } {
  const g = new Date(HIJRI_EPOCH.getTime() + days * 86400000);
  return { year: g.getUTCFullYear(), month: g.getUTCMonth(), day: g.getUTCDate() };
}

function gregorianToDays(year: number, month: number, day: number): number {
  const g = new Date(Date.UTC(year, month, day));
  return Math.round((g.getTime() - HIJRI_EPOCH.getTime()) / 86400000);
}

export function toHijri(year: number, month: number, day: number): { year: number; month: number; day: number } {
  const totalDays = gregorianToDays(year, month, day);
  if (totalDays < 0) return { year: 1, month: 0, day: 1 };

  let hYear = 1;
  let daysRemaining = totalDays;

  while (true) {
    const yd = daysInHijriYear(hYear);
    if (daysRemaining < yd) break;
    daysRemaining -= yd;
    hYear++;
  }

  let hMonth = 0;
  while (hMonth < 12) {
    const md = daysInHijriMonth(hYear, hMonth);
    if (daysRemaining < md) break;
    daysRemaining -= md;
    hMonth++;
  }

  return { year: hYear, month: hMonth, day: daysRemaining + 1 };
}

export function toGregorian(hYear: number, hMonth: number, hDay: number): { year: number; month: number; day: number } {
  const days = hijriToDays(hYear, hMonth, hDay);
  return daysToGregorian(days);
}

export function getHijriMonthName(month: number, locale: string = 'en'): string {
  const names = locale === 'id' ? HIJRI_MONTH_NAMES_ID : HIJRI_MONTH_NAMES;
  return names[month] ?? '';
}

export function hijriMonthDays(year: number, month: number): number {
  return daysInHijriMonth(year, month);
}
