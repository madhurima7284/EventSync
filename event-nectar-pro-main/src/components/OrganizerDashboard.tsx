import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Header } from './Header';
import { EventForm } from './EventForm';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, Sparkles, Calendar, Users, ExternalLink } from 'lucide-react';
import { Event } from '@/types/event';
import { format } from 'date-fns';

export function OrganizerDashboard() {
  const { events } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEvent(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Organizer Dashboard
              </h1>
              <p className="text-muted-foreground">
                Create and manage your college events
              </p>
            </div>
            <Button onClick={() => setShowForm(true)} className="shrink-0">
              <Plus size={18} className="mr-2" />
              Create Event
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Events"
            value={events.length}
            icon={<Calendar size={20} />}
            color="bg-sky"
          />
          <StatCard
            label="Featured"
            value={events.filter(e => e.isFeatured).length}
            icon={<Sparkles size={20} />}
            color="bg-lavender"
          />
          <StatCard
            label="Hackathons"
            value={events.filter(e => e.category === 'hackathon').length}
            icon={<Users size={20} />}
            color="bg-mint"
          />
          <StatCard
            label="Workshops"
            value={events.filter(e => e.category === 'workshop').length}
            icon={<Calendar size={20} />}
            color="bg-peach"
          />
        </div>

        {/* Events List */}
        <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Your Events</h2>
          </div>

          {events.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No events yet</h3>
              <p className="text-muted-foreground mb-4">Create your first event to get started</p>
              <Button onClick={() => setShowForm(true)}>
                <Plus size={18} className="mr-2" />
                Create Event
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {events.map(event => (
                <EventRow key={event.id} event={event} onEdit={handleEdit} />
              ))}
            </div>
          )}
        </div>

        {/* Notification Info */}
        <div className="mt-8 bg-gradient-featured rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Sparkles size={18} className="text-primary" />
            Smart Notifications
          </h3>
          <p className="text-muted-foreground text-sm">
            Featured events automatically notify all students. Regular events reach registered and interested students only — keeping notifications relevant and non-spammy.
          </p>
        </div>
      </main>

      {showForm && (
        <EventForm
          event={editingEvent}
          onClose={handleCloseForm}
          onSave={handleCloseForm}
        />
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 shadow-soft">
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-3`}>
        <span className="text-foreground/80">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function EventRow({ event, onEdit }: { event: Event; onEdit: (event: Event) => void }) {
  const { deleteEvent } = useApp();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (confirmDelete) {
      deleteEvent(event.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  const categoryColors: Record<string, string> = {
    hackathon: 'bg-lavender text-lavender-foreground',
    workshop: 'bg-mint text-mint-foreground',
    seminar: 'bg-sky text-sky-foreground',
    talk: 'bg-peach text-peach-foreground',
  };

  return (
    <div className="px-6 py-4 hover:bg-muted/50 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground truncate">{event.title}</h3>
            {event.isFeatured && (
              <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-hero rounded-full text-xs text-primary-foreground">
                <Sparkles size={12} />
                Featured
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${categoryColors[event.category]}`}>
              {event.category}
            </span>
            <span>{event.organizerName}</span>
            <span>•</span>
            <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
            {event.rewards.length > 0 && (
              <>
                <span>•</span>
                <span className="text-peach-foreground">{event.rewards.length} reward{event.rewards.length > 1 ? 's' : ''}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ExternalLink size={18} className="text-muted-foreground" />
          </a>
          <button
            onClick={() => onEdit(event)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Edit2 size={18} className="text-muted-foreground" />
          </button>
          <button
            onClick={handleDelete}
            className={`p-2 rounded-lg transition-colors ${
              confirmDelete
                ? 'bg-destructive text-destructive-foreground'
                : 'hover:bg-muted'
            }`}
          >
            <Trash2 size={18} className={confirmDelete ? '' : 'text-muted-foreground'} />
          </button>
        </div>
      </div>
    </div>
  );
}
