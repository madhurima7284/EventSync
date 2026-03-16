import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Event, StudentProfile, UserRole } from '@/types/event';

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  events: Event[];
  setEvents: (events: Event[] | ((prev: Event[]) => Event[])) => void;
  addEvent: (event: Event) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  studentProfile: StudentProfile | null;
  setStudentProfile: (profile: StudentProfile | null) => void;
  trackEventView: (eventId: string) => void;
  trackEventRegistration: (eventId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'CodeStorm 2026',
    organizerName: 'TechVarsity',
    description: 'A 48-hour hackathon where teams build innovative solutions to real-world problems. Open to all college students with prizes worth $10,000.',
    category: 'hackathon',
    date: '2026-03-15',
    time: '09:00',
    registrationLink: 'https://example.com/codestorm',
    rewards: [
      { type: 'cash', description: '$5,000 Grand Prize' },
      { type: 'internship', description: 'Internship offers from sponsors' },
      { type: 'goodies', description: 'Swag bags for all participants' },
    ],
    isFeatured: true,
    createdAt: '2026-02-01',
    skills: ['Problem Solving', 'Team Collaboration', 'Rapid Prototyping', 'Pitching'],
    careerValue: 'Direct exposure to hiring managers from top tech companies',
    networking: 'Connect with 500+ developers and 20+ industry mentors',
  },
  {
    id: '2',
    title: 'AI/ML Workshop Series',
    organizerName: 'DataMinds Club',
    description: 'Learn the fundamentals of machine learning through hands-on projects. Build your first neural network and deploy it to production.',
    category: 'workshop',
    date: '2026-02-28',
    time: '14:00',
    registrationLink: 'https://example.com/aiml',
    rewards: [
      { type: 'certificate', description: 'Industry-recognized certification' },
    ],
    isFeatured: false,
    createdAt: '2026-02-02',
    skills: ['Python', 'TensorFlow', 'Data Analysis', 'Model Deployment'],
    careerValue: 'Portfolio-ready projects to showcase to employers',
    networking: 'Join our alumni network of 200+ ML practitioners',
  },
  {
    id: '3',
    title: 'Startup Founders Talk',
    organizerName: 'Entrepreneur Cell',
    description: 'Hear from successful startup founders about their journey from idea to IPO. Interactive Q&A session included.',
    category: 'talk',
    date: '2026-02-20',
    time: '18:00',
    registrationLink: 'https://example.com/founders',
    rewards: [
      { type: 'certificate', description: 'Participation certificate' },
      { type: 'other', description: 'Exclusive networking dinner' },
    ],
    isFeatured: true,
    createdAt: '2026-02-03',
    skills: ['Business Strategy', 'Pitching', 'Market Analysis'],
    careerValue: 'Insights directly applicable to your startup journey',
    networking: 'Meet VCs and angel investors during the networking session',
  },
  {
    id: '4',
    title: 'Cloud Computing Seminar',
    organizerName: 'AWS Student Club',
    description: 'Deep dive into cloud architecture, serverless computing, and DevOps best practices with certified AWS instructors.',
    category: 'seminar',
    date: '2026-03-05',
    time: '10:00',
    registrationLink: 'https://example.com/cloud',
    rewards: [
      { type: 'certificate', description: 'AWS Cloud Practitioner prep voucher' },
      { type: 'goodies', description: 'AWS merchandise' },
    ],
    isFeatured: false,
    createdAt: '2026-02-04',
    skills: ['AWS Services', 'Docker', 'Kubernetes', 'CI/CD'],
    careerValue: 'Cloud skills are in top demand across all industries',
    networking: 'Connect with AWS solution architects and hiring partners',
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useLocalStorage<UserRole>('eventsync-role', null);
  const [events, setEvents] = useLocalStorage<Event[]>('eventsync-events', sampleEvents);
  const [studentProfile, setStudentProfile] = useLocalStorage<StudentProfile | null>('eventsync-student', null);

  const addEvent = (event: Event) => {
    setEvents((prev) => [event, ...prev]);
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, ...updates } : event))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const trackEventView = (eventId: string) => {
    if (studentProfile && !studentProfile.viewedEvents.includes(eventId)) {
      setStudentProfile({
        ...studentProfile,
        viewedEvents: [...studentProfile.viewedEvents, eventId],
      });
    }
  };

  const trackEventRegistration = (eventId: string) => {
    if (studentProfile && !studentProfile.registeredEvents.includes(eventId)) {
      setStudentProfile({
        ...studentProfile,
        registeredEvents: [...studentProfile.registeredEvents, eventId],
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        events,
        setEvents,
        addEvent,
        updateEvent,
        deleteEvent,
        studentProfile,
        setStudentProfile,
        trackEventView,
        trackEventRegistration,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
