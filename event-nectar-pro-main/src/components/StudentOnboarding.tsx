import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from './Logo';
import { CheckCircle2, Mail, ArrowRight } from 'lucide-react';

const interestOptions = [
  'AI & Machine Learning',
  'Web Development',
  'DevOps & Cloud',
  'Startups & Entrepreneurship',
  'Mobile Development',
  'Cybersecurity',
  'Data Science',
  'Blockchain',
];

export function StudentOnboarding() {
  const { setStudentProfile } = useApp();
  const [email, setEmail] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const eduPattern = /^[^\s@]+@[^\s@]+\.(edu|ac\.[a-z]{2,}|edu\.[a-z]{2,})$/i;
    const generalPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!generalPattern.test(email)) {
      return 'Please enter a valid email address';
    }
    
    if (!eduPattern.test(email)) {
      return 'Please use your student email (.edu or academic domain)';
    }
    
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    setStudentProfile({
      email,
      interests: selectedInterests,
      viewedEvents: [],
      registeredEvents: [],
    });
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-mint rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-lavender rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-md w-full">
        <div className="flex justify-center mb-8 animate-fade-in">
          <Logo size="lg" />
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-card p-8 animate-slide-up">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Welcome, Student!
            </h1>
            <p className="text-muted-foreground">
              Set up your profile to discover amazing events
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail size={16} />
                Student Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                placeholder="you@university.edu"
                className={emailError ? 'border-destructive' : ''}
                required
              />
              {emailError && (
                <p className="text-sm text-destructive">{emailError}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Use your academic email for verification
              </p>
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <Label>Interests (optional)</Label>
              <p className="text-xs text-muted-foreground">
                Select topics to get personalized event recommendations
              </p>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      selectedInterests.includes(interest)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    {selectedInterests.includes(interest) && (
                      <CheckCircle2 size={14} className="inline mr-1.5" />
                    )}
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Get Started
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Discover events from colleges across the country
        </p>
      </div>
    </div>
  );
}
