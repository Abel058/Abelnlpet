export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  abstract: string;
  tags: string[];
  scholarUrl?: string;
  paperUrl?: string;
  codeUrl?: string;
  bibtex: string;
  citationsCount?: number;
  featured?: boolean;
}

export interface AcademicExperience {
  role: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  highlights?: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ContactInfo {
  name: string;
  title: string;
  affiliation: string;
  location: string;
  email: string;
  scholarUrl: string;
  githubUrl: string;
  huggingfaceUrl: string;
}
