import { Users, GraduationCap, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types/event';

export function RoleSelection() {
  const { setUserRole } = useApp();

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lavender rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-mint rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-peach rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        <div className="flex justify-center mb-8 animate-fade-in">
          <Logo size="lg" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 animate-slide-up">
          Who are you?
        </h1>
        <p className="text-muted-foreground text-lg mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Choose your role to get started with EventSync
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Organizer Card */}
          <button
            onClick={() => handleRoleSelect('organizer')}
            className="group relative bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 text-left border border-border animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="absolute inset-0 bg-gradient-featured rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-lavender rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users size={32} className="text-lavender-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Organizer</h2>
              <p className="text-muted-foreground mb-4">
                Post events, manage registrations, and reach thousands of students
              </p>
              <div className="flex items-center text-primary font-medium">
                Get Started
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Student Card */}
          <button
            onClick={() => handleRoleSelect('student')}
            className="group relative bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 text-left border border-border animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="absolute inset-0 bg-gradient-featured rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-mint rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap size={32} className="text-mint-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Student</h2>
              <p className="text-muted-foreground mb-4">
                Discover events, track registrations, and never miss an opportunity
              </p>
              <div className="flex items-center text-primary font-medium">
                Get Started
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </div>

        <p className="text-sm text-muted-foreground mt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Your centralized platform for college events & hackathons
        </p>
      </div>
    </div>
  );
}
