import { Event } from '@/types/event';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Trophy, 
  Sparkles,
  Target,
  Briefcase,
  Users,
  CheckCircle2,
  Bell
} from 'lucide-react';
import { format } from 'date-fns';
import { useEffect } from 'react';

interface EventDetailsProps {
  event: Event;
  onClose: () => void;
}

export function EventDetails({ event, onClose }: EventDetailsProps) {
  const { trackEventView, trackEventRegistration, studentProfile } = useApp();
  const isRegistered = studentProfile?.registeredEvents.includes(event.id);

  useEffect(() => {
    trackEventView(event.id);
  }, [event.id, trackEventView]);

  const handleRegister = () => {
    trackEventRegistration(event.id);
    window.open(event.registrationLink, '_blank');
  };

  const categoryColors: Record<string, string> = {
    hackathon: 'bg-lavender text-lavender-foreground',
    workshop: 'bg-mint text-mint-foreground',
    seminar: 'bg-sky text-sky-foreground',
    talk: 'bg-peach text-peach-foreground',
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-start justify-between rounded-t-2xl z-10">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${categoryColors[event.category]}`}>
                {event.category}
              </span>
              {event.isFeatured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-hero rounded-full text-xs font-medium text-primary-foreground">
                  <Sparkles size={12} />
                  Featured
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-foreground">{event.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Event Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <MetaItem
              icon={<Calendar size={18} />}
              label="Date"
              value={format(new Date(event.date), 'MMMM d, yyyy')}
            />
            <MetaItem
              icon={<Clock size={18} />}
              label="Time"
              value={format(new Date(`2000-01-01T${event.time}`), 'h:mm a')}
            />
            <MetaItem
              icon={<MapPin size={18} />}
              label="Organizer"
              value={event.organizerName}
            />
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">About This Event</h3>
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </div>

          {/* Rewards */}
          {event.rewards.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Trophy size={18} className="text-peach-foreground" />
                Rewards & Prizes
              </h3>
              <div className="space-y-2">
                {event.rewards.map((reward, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-peach/30 rounded-xl px-4 py-3"
                  >
                    <span className="shrink-0 px-2 py-0.5 bg-peach text-peach-foreground rounded text-xs font-medium capitalize">
                      {reward.type}
                    </span>
                    <span className="text-foreground">{reward.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Why You Should Attend */}
          {(event.skills?.length || event.careerValue || event.networking) && (
            <div className="bg-gradient-featured rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-primary" />
                Why You Should Attend
              </h3>
              
              <div className="space-y-4">
                {event.skills && event.skills.length > 0 && (
                  <WhyItem
                    icon={<Target size={18} />}
                    title="Skills You'll Gain"
                    description={
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {event.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-card rounded-md text-sm text-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    }
                  />
                )}

                {event.careerValue && (
                  <WhyItem
                    icon={<Briefcase size={18} />}
                    title="Career Value"
                    description={<p className="text-muted-foreground">{event.careerValue}</p>}
                  />
                )}

                {event.networking && (
                  <WhyItem
                    icon={<Users size={18} />}
                    title="Networking Opportunities"
                    description={<p className="text-muted-foreground">{event.networking}</p>}
                  />
                )}
              </div>
            </div>
          )}

          {/* Notification info */}
          <div className="flex items-start gap-3 bg-muted/50 rounded-xl p-4">
            <Bell size={18} className="text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              {isRegistered
                ? "You'll receive a reminder email before this event starts."
                : "Register to receive event reminders and updates."}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Back to Events
            </Button>
            <Button
              onClick={handleRegister}
              className="flex-1"
              disabled={isRegistered}
            >
              {isRegistered ? (
                <>
                  <CheckCircle2 size={18} className="mr-2" />
                  Registered
                </>
              ) : (
                <>
                  <ExternalLink size={18} className="mr-2" />
                  Register Now
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-muted/50 rounded-xl p-3">
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="font-medium text-foreground text-sm">{value}</p>
    </div>
  );
}

function WhyItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="shrink-0 w-8 h-8 bg-card rounded-lg flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-foreground text-sm mb-1">{title}</h4>
        {description}
      </div>
    </div>
  );
}
