export type EventCategory = 'hackathon' | 'workshop' | 'seminar' | 'talk';

export interface EventReward {
  type: 'cash' | 'certificate' | 'internship' | 'goodies' | 'other';
  description: string;
}

export interface Event {
  id: string;
  title: string;
  organizerName: string;
  description: string;
  category: EventCategory;
  date: string;
  time: string;
  posterUrl?: string;
  registrationLink: string;
  rewards: EventReward[];
  isFeatured: boolean;
  createdAt: string;
  skills?: string[];
  careerValue?: string;
  networking?: string;
}

export interface StudentProfile {
  email: string;
  interests: string[];
  viewedEvents: string[];
  registeredEvents: string[];
}

export type UserRole = 'organizer' | 'student' | null;
