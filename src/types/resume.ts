export type Locale = 'en' | 'es';

export interface ResumeProfile {
  network: string;
  username?: string;
  url: string;
}

export interface ResumeBasics {
  name: string;
  label: string;
  email: string;
  phone?: string;
  url?: string;
  summary: string;
  keyHighlights?: string[];
  location?: {
    city?: string;
    country?: string;
  };
  profiles?: ResumeProfile[];
}

export interface ResumeWork {
  name: string;
  position: string;
  startDate: string;
  endDate?: string;
  /** Render as a one-line entry with highlights behind "Show details" (always expanded in print). */
  compact?: boolean;
  summary?: string;
  highlights?: string[];
  technologies?: string[];
}

export interface ResumeLanguage {
  language: string;
  fluency: string;
}

export interface ResumeEducation {
  institution: string;
  area?: string;
  studyType?: string;
  startDate?: string;
  endDate?: string;
}

export interface ResumeSkill {
  name: string;
  keywords?: string[];
}

export interface ResumeCaseStudy {
  title: string;
  summary: string;
  highlights?: string[];
  technologies?: string[];
  url?: string;
}

export interface ResumeProject {
  name: string;
  description: string;
  highlights?: string[];
  technologies?: string[];
  url?: string;
  repository?: string;
}

export interface ResumeTestimonial {
  quote: string;
  name: string;
  role: string;
  url?: string;
}

/** Shared shape for "How I work" principles and Services offerings. */
export interface ResumeFeatureItem {
  title: string;
  description: string;
}

export interface Resume {
  basics: ResumeBasics;
  work: ResumeWork[];
  education: ResumeEducation[];
  skills: ResumeSkill[];
  languages: ResumeLanguage[];
  /** Brand names shown as a text-only strip under the hero. */
  brands?: string[];
  caseStudies?: ResumeCaseStudy[];
  featuredProject?: ResumeProject | null;
  testimonials?: ResumeTestimonial[];
  howIWork?: ResumeFeatureItem[];
  services?: ResumeFeatureItem[];
  meta?: Record<string, string>;
}

export interface UiStrings {
  siteTitle: string;
  siteDescription: string;
  tagline: string;
  skipToContent: string;
  sectionNavAria: string;
  navExperience: string;
  navSkills: string;
  navEducation: string;
  navLanguages: string;
  navCaseStudies: string;
  navFeaturedProject: string;
  navTestimonials: string;
  navHowIWork: string;
  navServices: string;
  brandsHeading: string;
  technologies: string;
  keyHighlightsAria: string;
  showDetails: string;
  hideDetails: string;
  downloadPdf: string;
  downloadPdfAria: string;
  emailCta: string;
  emailAria: string;
  present: string;
  tools: string;
  themeLight: string;
  themeDark: string;
  themeSystem: string;
  themeToggleAria: string;
  languageSwitcherAria: string;
  footerRights: string;
  locationLabel: string;
  phoneLabel: string;
  githubAria: string;
  linkedinAria: string;
  websiteAria: string;
  projectLiveLink: string;
  projectRepoLink: string;
  caseStudyLink: string;
  noticeBanner: string;
}
