import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { Header } from './Header';
import { EventCard } from './EventCard';
import { EventDetails } from './EventDetails';
import { Event } from '@/types/event';
import { Input } from '@/components/ui/input';
import { Search, Filter, Sparkles, Calendar, Eye, CheckCircle2, Bell } from 'lucide-react';

type FilterCategory = 'all' | 'hackathon' | 'workshop' | 'seminar' | 'talk' | 'featured';
type Tab = 'discover' | 'registered' | 'viewed';

export function StudentDashboard() {
  const { events, studentProfile } = useApp();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [activeTab, setActiveTab] = useState<Tab>('discover');

  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    // Tab filtering
    if (activeTab === 'registered') {
      filtered = filtered.filter(e => studentProfile?.registeredEvents.includes(e.id));
    } else if (activeTab === 'viewed') {
      filtered = filtered.filter(e => studentProfile?.viewedEvents.includes(e.id));
    }

    // Category filtering
    if (activeFilter !== 'all') {
      if (activeFilter === 'featured') {
        filtered = filtered.filter(e => e.isFeatured);
      } else {
        filtered = filtered.filter(e => e.category === activeFilter);
      }
    }

    // Search filtering
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(query) ||
        e.organizerName.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query)
      );
    }

    // Sort: featured first, then by date
    filtered.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return filtered;
  }, [events, searchQuery, activeFilter, activeTab, studentProfile]);

  const filterOptions: { value: FilterCategory; label: string }[] = [
    { value: 'all', label: 'All Events' },
    { value: 'featured', label: 'Featured' },
    { value: 'hackathon', label: 'Hackathons' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'seminar', label: 'Seminars' },
    { value: 'talk', label: 'Talks' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Discover Events
          </h1>
          <p className="text-muted-foreground">
            Find hackathons, workshops, and opportunities that match your interests
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <TabButton
            active={activeTab === 'discover'}
            onClick={() => setActiveTab('discover')}
            icon={<Calendar size={16} />}
          >
            Discover
          </TabButton>
          <TabButton
            active={activeTab === 'registered'}
            onClick={() => setActiveTab('registered')}
            icon={<CheckCircle2 size={16} />}
            count={studentProfile?.registeredEvents.length}
          >
            Registered
          </TabButton>
          <TabButton
            active={activeTab === 'viewed'}
            onClick={() => setActiveTab('viewed')}
            icon={<Eye size={16} />}
            count={studentProfile?.viewedEvents.length}
          >
            Viewed
          </TabButton>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {filterOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setActiveFilter(option.value)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-secondary'
                }`}
              >
                {option.value === 'featured' && <Sparkles size={14} className="inline mr-1.5" />}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notification Banner */}
        <div className="bg-gradient-featured rounded-xl p-4 mb-6 flex items-start gap-3">
          <div className="shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Bell size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-foreground text-sm">Smart Notifications</h3>
            <p className="text-muted-foreground text-sm">
              You'll receive alerts for featured events and reminders for events you've registered for.
            </p>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No events found</h3>
            <p className="text-muted-foreground">
              {activeTab === 'registered'
                ? "You haven't registered for any events yet"
                : activeTab === 'viewed'
                ? "You haven't viewed any events yet"
                : 'Try adjusting your search or filters'}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <EventCard
                  event={event}
                  onClick={() => setSelectedEvent(event)}
                  isRegistered={studentProfile?.registeredEvents.includes(event.id)}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
  icon,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-card text-foreground shadow-soft border border-border'
          : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {icon}
      {children}
      {count !== undefined && count > 0 && (
        <span className={`px-1.5 py-0.5 rounded text-xs ${active ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
          {count}
        </span>
      )}
    </button>
  );
}
