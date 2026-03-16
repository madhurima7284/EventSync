import { LogOut } from 'lucide-react';
import { Logo } from './Logo';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  showLogout?: boolean;
}

export function Header({ showLogout = true }: HeaderProps) {
  const { userRole, setUserRole, setStudentProfile } = useApp();

  const handleLogout = () => {
    setUserRole(null);
    setStudentProfile(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo size="sm" />
        
        <div className="flex items-center gap-4">
          {userRole && (
            <span className="hidden sm:inline-block px-3 py-1 bg-secondary rounded-full text-sm text-secondary-foreground capitalize">
              {userRole}
            </span>
          )}
          
          {showLogout && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut size={18} className="mr-2" />
              Switch Role
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
