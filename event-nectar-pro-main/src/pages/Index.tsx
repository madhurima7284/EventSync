import { useApp } from '@/context/AppContext';
import { RoleSelection } from '@/components/RoleSelection';
import { OrganizerDashboard } from '@/components/OrganizerDashboard';
import { StudentDashboard } from '@/components/StudentDashboard';
import { StudentOnboarding } from '@/components/StudentOnboarding';

const Index = () => {
  const { userRole, studentProfile } = useApp();

  // First-time user: show role selection
  if (!userRole) {
    return <RoleSelection />;
  }

  // Organizer flow
  if (userRole === 'organizer') {
    return <OrganizerDashboard />;
  }

  // Student flow: check if onboarded
  if (userRole === 'student') {
    if (!studentProfile) {
      return <StudentOnboarding />;
    }
    return <StudentDashboard />;
  }

  return <RoleSelection />;
};

export default Index;
