import { Event } from '@/types/event';
import { Calendar, MapPin, Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  onClick: () => void;
  isRegistered?: boolean;
}

export function EventCard({ event, onClick, isRegistered }: EventCardProps) {
  const categoryColors: Record<string, string> = {
    hackathon: 'bg-lavender text-lavender-foreground',
    workshop: 'bg-mint text-mint-foreground',
    seminar: 'bg-sky text-sky-foreground',
    talk: 'bg-peach text-peach-foreground',
  };

  const hasHighRewards = event.rewards.some(r => r.type === 'cash' || r.type === 'internship');

  return (
    <article
      onClick={onClick}
      className="group relative bg-card rounded-2xl border border-border shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
    >
      {/* Featured Badge */}
      {event.isFeatured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-hero rounded-full text-xs font-medium text-primary-foreground shadow-soft">
            <Sparkles size={12} />
            Featured
          </span>
        </div>
      )}

      {/* Poster/Image area */}
      {event.posterUrl ? (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={event.posterUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className={`aspect-video w-full bg-gradient-featured flex items-center justify-center`}>
          <div className={`w-16 h-16 ${categoryColors[event.category]} rounded-2xl flex items-center justify-center`}>
            <Calendar size={32} className="opacity-80" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Category & Date */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${categoryColors[event.category]}`}>
            {event.category}
          </span>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar size={14} />
            {format(new Date(event.date), 'MMM d, yyyy')}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
          {event.title}
        </h3>

        {/* Organizer */}
        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1.5">
          <MapPin size={14} />
          {event.organizerName}
        </p>

        {/* Rewards Preview */}
        {event.rewards.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {event.rewards.slice(0, 2).map((reward, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-peach/60 text-peach-foreground rounded-md text-xs"
              >
                <Trophy size={12} />
                {reward.description.length > 25 ? `${reward.description.slice(0, 25)}...` : reward.description}
              </span>
            ))}
            {event.rewards.length > 2 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs">
                +{event.rewards.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          {isRegistered ? (
            <span className="text-sm text-mint-foreground font-medium flex items-center gap-1">
              ✓ Registered
            </span>
          ) : hasHighRewards ? (
            <span className="text-sm text-peach-foreground font-medium">High Rewards</span>
          ) : (
            <span className="text-sm text-muted-foreground">View Details</span>
          )}
          <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </article>
  );
}
