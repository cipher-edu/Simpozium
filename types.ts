
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

export interface ScheduleEvent {
  time: string;
  title: string;
  speaker?: string;
  location?: string;
  type: 'plenary' | 'break' | 'track' | 'cultural';
}

export interface DaySchedule {
  day: number;
  date: string;
  events: ScheduleEvent[];
}

export interface Book {
  id: string;
  title: string;
  cover: string;
  isbn: string;
  editors: string;
  year: number;
  pdfUrl: string;
  pages: number;
}

export interface PastSymposium {
  id: string;
  year: number;
  theme: string;
  description: string;
  tracks: { title: string; count: number; details: string }[];
  books: Book[];
  gallery: string[];
  outcomes: string[];
  stats: {
    speakers: number;
    articles: number;
    countries: number;
  };
}

export interface Article {
  id: string;
  userId: string;
  userName: string;
  title: string;
  abstract: string;
  keywords: string[];
  status: 'submitted' | 'technical_check' | 'review' | 'accepted' | 'rejected';
  submittedAt: string;
  fileUrl?: string;
  feedback?: string;
  track?: string;
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  institution: string;
  image: string;
  bio?: string;
  participationYears: number[];
  email?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'participant' | 'speaker' | 'listener' | 'student' | 'admin';
  institution?: string;
  degree?: string;
  academicTitle?: string;
  bio?: string;
  orcid?: string;
  track?: string;
  articles: Article[];
  qrCode?: string;
}
