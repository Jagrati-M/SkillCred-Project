export interface FormState {
  title: string;
  targetAudience: string;
  durationScope: string;
  topics: string[];
}

export interface Reference {
  title: string;
  uri: string;
}

export interface ContentSection {
  title: string;
  content: string; // Markdown content
}

export interface GeneratedResult {
    title: string;
    overview: string;
    learningObjectives: string[];
    sections: ContentSection[];
    references: Reference[];
}