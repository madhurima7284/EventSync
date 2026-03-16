import { Event, EventCategory, EventReward } from '@/types/event';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Sparkles, Image as ImageIcon } from 'lucide-react';

interface EventFormProps {
  event?: Event;
  onClose: () => void;
  onSave: () => void;
}

const categories: { value: EventCategory; label: string }[] = [
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'seminar', label: 'Seminar' },
  { value: 'talk', label: 'Talk' },
];

const rewardTypes = [
  { value: 'cash', label: 'Cash Prize' },
  { value: 'certificate', label: 'Certificate' },
  { value: 'internship', label: 'Internship' },
  { value: 'goodies', label: 'Goodies' },
  { value: 'other', label: 'Other' },
];

export function EventForm({ event, onClose, onSave }: EventFormProps) {
  const { addEvent, updateEvent } = useApp();
  const isEditing = !!event;

  const [formData, setFormData] = useState({
    title: event?.title || '',
    organizerName: event?.organizerName || '',
    description: event?.description || '',
    category: event?.category || 'hackathon' as EventCategory,
    date: event?.date || '',
    time: event?.time || '',
    posterUrl: event?.posterUrl || '',
    registrationLink: event?.registrationLink || '',
    rewards: event?.rewards || [] as EventReward[],
    isFeatured: event?.isFeatured || false,
    skills: event?.skills?.join(', ') || '',
    careerValue: event?.careerValue || '',
    networking: event?.networking || '',
  });

  const [newReward, setNewReward] = useState({ type: 'certificate' as EventReward['type'], description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData: Event = {
      id: event?.id || Date.now().toString(),
      title: formData.title,
      organizerName: formData.organizerName,
      description: formData.description,
      category: formData.category,
      date: formData.date,
      time: formData.time,
      posterUrl: formData.posterUrl || undefined,
      registrationLink: formData.registrationLink,
      rewards: formData.rewards,
      isFeatured: formData.isFeatured,
      createdAt: event?.createdAt || new Date().toISOString(),
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      careerValue: formData.careerValue,
      networking: formData.networking,
    };

    if (isEditing) {
      updateEvent(event.id, eventData);
    } else {
      addEvent(eventData);
    }
    
    onSave();
  };

  const addReward = () => {
    if (newReward.description.trim()) {
      setFormData(prev => ({
        ...prev,
        rewards: [...prev.rewards, { ...newReward }],
      }));
      setNewReward({ type: 'certificate', description: '' });
    }
  };

  const removeReward = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rewards: prev.rewards.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-semibold text-foreground">
            {isEditing ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="CodeStorm 2026"
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="organizer">Organizer / College Name</Label>
              <Input
                id="organizer"
                value={formData.organizerName}
                onChange={(e) => setFormData(prev => ({ ...prev, organizerName: e.target.value }))}
                placeholder="TechVarsity"
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="description">Event Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your event in detail..."
                required
                className="mt-1.5 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: EventCategory) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="registrationLink">Registration Link</Label>
                <Input
                  id="registrationLink"
                  type="url"
                  value={formData.registrationLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, registrationLink: e.target.value }))}
                  placeholder="https://..."
                  required
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Event Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="time">Event Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  required
                  className="mt-1.5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="poster" className="flex items-center gap-2">
                <ImageIcon size={16} />
                Poster URL (optional)
              </Label>
              <Input
                id="poster"
                type="url"
                value={formData.posterUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, posterUrl: e.target.value }))}
                placeholder="https://example.com/poster.jpg"
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Rewards Section */}
          <div className="space-y-4">
            <Label className="text-base">Rewards & Prizes</Label>
            
            {formData.rewards.length > 0 && (
              <div className="space-y-2">
                {formData.rewards.map((reward, index) => (
                  <div key={index} className="flex items-center gap-2 bg-peach/50 rounded-lg px-3 py-2">
                    <span className="text-xs font-medium text-peach-foreground bg-peach px-2 py-0.5 rounded capitalize">
                      {reward.type}
                    </span>
                    <span className="flex-1 text-sm text-foreground">{reward.description}</span>
                    <button
                      type="button"
                      onClick={() => removeReward(index)}
                      className="p-1 hover:bg-peach rounded"
                    >
                      <X size={14} className="text-peach-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Select
                value={newReward.type}
                onValueChange={(value: EventReward['type']) => setNewReward(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {rewardTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={newReward.description}
                onChange={(e) => setNewReward(prev => ({ ...prev, description: e.target.value }))}
                placeholder="e.g., $5,000 Grand Prize"
                className="flex-1"
              />
              <Button type="button" variant="secondary" onClick={addReward}>
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {/* Why Attend Section */}
          <div className="space-y-4">
            <Label className="text-base">Why You Should Attend</Label>
            
            <div>
              <Label htmlFor="skills" className="text-sm text-muted-foreground">Skills Gained (comma-separated)</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                placeholder="Problem Solving, Team Collaboration, Pitching"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="careerValue" className="text-sm text-muted-foreground">Career Value</Label>
              <Input
                id="careerValue"
                value={formData.careerValue}
                onChange={(e) => setFormData(prev => ({ ...prev, careerValue: e.target.value }))}
                placeholder="Direct exposure to hiring managers"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="networking" className="text-sm text-muted-foreground">Networking Opportunities</Label>
              <Input
                id="networking"
                value={formData.networking}
                onChange={(e) => setFormData(prev => ({ ...prev, networking: e.target.value }))}
                placeholder="Connect with 500+ developers"
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between bg-gradient-featured rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Sparkles size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">Featured / High-Impact Event</p>
                <p className="text-sm text-muted-foreground">Highlighted to all students</p>
              </div>
            </div>
            <Switch
              checked={formData.isFeatured}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {isEditing ? 'Save Changes' : 'Create Event'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
