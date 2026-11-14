import type { Locale, Resume, UiStrings } from '../types/resume';
import resumeEn from '../../data/resume.en.json';
import resumeEs from '../../data/resume.es.json';

const resumes: Record<Locale, Resume> = {
  en: resumeEn as Resume,
  es: resumeEs as Resume,
};

export function getResume(locale: Locale): Resume {
  return resumes[locale];
}

export function formatLocation(resume: Resume, locale: Locale): string {
  const { city, country } = resume.basics.location ?? {};
  return [city, country].filter(Boolean).join(', ');
}

export function formatDateRange(
  startDate: string,
  endDate: string | undefined,
  presentLabel: string,
  locale: Locale,
): string {
  const formatter = new Intl.DateTimeFormat(locale === 'es' ? 'es-CO' : 'en-US', {
    month: 'short',
    year: 'numeric',
  });

  const parse = (value: string) => {
    const normalized = value.length === 4 ? `${value}-01` : value;
    return new Date(`${normalized}-01T00:00:00`);
  };

  const start = formatter.format(parse(startDate));
  if (!endDate) {
    return `${start} — ${presentLabel}`;
  }
  const end = formatter.format(parse(endDate));
  return `${start} — ${end}`;
}

/** Year only (e.g. graduation year) from a `YYYY` or `YYYY-MM` string. */
export function formatYear(date: string): string {
  return date.slice(0, 4);
}

export type SectionId =
  | 'experience'
  | 'case-studies'
  | 'featured-project'
  | 'testimonials'
  | 'skills'
  | 'how-i-work'
  | 'services'
  | 'languages'
  | 'education';

const hasItems = (list: unknown[] | null | undefined) => Array.isArray(list) && list.length > 0;

/**
 * Page sections in render order. A section with no data is neither rendered
 * nor listed in the navigation.
 */
const sections: { id: SectionId; labelKey: keyof UiStrings; hasContent: (resume: Resume) => boolean }[] = [
  { id: 'experience', labelKey: 'navExperience', hasContent: (r) => hasItems(r.work) },
  { id: 'case-studies', labelKey: 'navCaseStudies', hasContent: (r) => hasItems(r.caseStudies) },
  { id: 'featured-project', labelKey: 'navFeaturedProject', hasContent: (r) => Boolean(r.featuredProject?.name) },
  { id: 'testimonials', labelKey: 'navTestimonials', hasContent: (r) => hasItems(r.testimonials) },
  { id: 'skills', labelKey: 'navSkills', hasContent: (r) => hasItems(r.skills) },
  { id: 'how-i-work', labelKey: 'navHowIWork', hasContent: (r) => hasItems(r.howIWork) },
  { id: 'services', labelKey: 'navServices', hasContent: (r) => hasItems(r.services) },
  { id: 'languages', labelKey: 'navLanguages', hasContent: (r) => hasItems(r.languages) },
  { id: 'education', labelKey: 'navEducation', hasContent: (r) => hasItems(r.education) },
];

export function hasSection(resume: Resume, id: SectionId): boolean {
  return sections.find((section) => section.id === id)?.hasContent(resume) ?? false;
}

export function getNavSections(resume: Resume, ui: UiStrings): { id: SectionId; label: string }[] {
  return sections
    .filter((section) => section.hasContent(resume))
    .map((section) => ({ id: section.id, label: ui[section.labelKey] }));
}

export function getPdfPath(locale: Locale): string {
  return `/resume-${locale}.pdf`;
}

/** Social card generated into dist/ by scripts/generate-og.mjs. */
export function getOgImagePath(locale: Locale): string {
  return `/images/og-${locale}.png`;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en';
}

export function getCanonicalPath(locale: Locale): string {
  return `/${locale}/`;
}
