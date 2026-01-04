
export enum Section {
  HOME = 'Bosh sahifa',
  ABOUT = 'Simpozium haqida',
  PROGRAM = 'Dastur',
  TRACKS = 'Sho‘balar',
  SPEAKERS = 'Ma’ruzachilar',
  LOGISTICS = 'Logistika va Turizm',
  ARCHIVE = 'Arxiv',
  SUBMIT = 'Maqola yuborish',
  CABINET = 'Shaxsiy kabinet',
  ADMIN = 'Admin Panel',
  CONTACT = 'Aloqa'
}

export type Language = 'uz' | 'ru' | 'en';

export interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  scores: {
    originality: number;
    methodology: number;
    language: number;
    relevance: number;
  };
  comments: string;
  date: string;
  recommendation: 'accept' | 'revision' | 'reject';
}

export interface Article {
  id: string;
  userId: string;
  userName: string;
  title: string;
  abstract: string;
  keywords: string[];
  status: 'submitted' | 'technical_check' | 'review' | 'revision' | 'accepted' | 'rejected';
  submittedAt: string;
  track: string;
  reviews: Review[];
  doi?: string;
  version: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'participant' | 'speaker' | 'reviewer' | 'admin' | 'listener';
  institution?: string;
  track?: string;
  articles: Article[];
  qrCode?: string;
  bio?: string;
  orcid?: string;
  researchInterests?: string[];
  socialLinks?: {
    linkedin?: string;
    googleScholar?: string;
  };
}

export interface ChatMessage {
  id: string;
  fromId: string;
  toId: string;
  text: string;
  timestamp: Date;
}

export interface PastSymposium {
  id: string;
  year: number;
  theme: string;
  description: string;
  stats: {
    speakers: number;
    articles: number;
    countries: number;
  };
  books: any[];
  gallery: string[];
}

// Added ScheduleEvent and DaySchedule interfaces to fix missing export in Program.tsx
export interface ScheduleEvent {
  time: string;
  title: string;
  type: 'plenary' | 'track' | 'break' | 'cultural' | string;
  speaker?: string;
  location?: string;
}

export interface DaySchedule {
  day: number;
  date: string;
  events: ScheduleEvent[];
}
