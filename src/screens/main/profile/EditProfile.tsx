import { useState, useEffect } from 'react';
import { ArrowLeft, Camera, User } from 'lucide-react-native';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components//ui/textarea';
import type { UserProfile } from '../../../types';

interface EditProfileProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onBack: () => void;
}

export default function EditProfile({ profile, onSave, onBack }: EditProfileProps) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [bio, setBio] = useState(profile.bio || '');
  const [goalCalories, setGoalCalories] = useState(profile.goalCalories?.toString() || '2000');
  const [avatar, setAvatar] = useState(profile.avatar || '');

  const handleAvatarUpload = () => {
    // Simulate avatar upload with random avatar
    const avatars = [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200',
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    ];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    setAvatar(randomAvatar);
  };

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      alert('Name and email are required');
      return;
    }

    onSave({
      name,
      email,
      bio,
      goalCalories: goalCalories ? parseInt(goalCalories) : undefined,
      avatar,
    });
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-6 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={onBack}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
        <h2 className="text-primary">Edit Profile</h2>
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Save
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-border"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-accent flex items-center justify-center border-4 border-border">
                  <User className="w-16 h-16 text-primary" />
                </div>
              )}
              <button
                onClick={handleAvatarUpload}
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <p className="text-muted-foreground text-center">
              Tap camera to change photo
            </p>
          </div>

          {/* Name */}
          <div>
            <label className="text-primary mb-2 block">
              Full Name
            </label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-card border-border focus:border-primary h-14"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-primary mb-2 block">
              Email
            </label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-card border-border focus:border-primary h-14"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-primary mb-2 block">
              Bio
            </label>
            <Textarea
              placeholder="Tell us about yourself and your food journey..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-card border-border focus:border-primary min-h-[100px] resize-none"
            />
          </div>

          {/* Goal Calories */}
          <div>
            <label className="text-primary mb-2 block">
              Daily Calorie Goal
            </label>
            <div className="relative">
              <Input
                type="number"
                placeholder="2000"
                value={goalCalories}
                onChange={(e) => setGoalCalories(e.target.value)}
                className="bg-card border-border focus:border-primary h-14 pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                kcal
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Recommended: 1500-2500 kcal per day
            </p>
          </div>

          {/* Quick Bio Templates */}
          <div>
            <label className="text-primary mb-2 block">
              Quick Bio Templates
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setBio('Love cooking and healthy eating! 🍳')}
                className="w-full p-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-left"
              >
                Love cooking and healthy eating! 🍳
              </button>
              <button
                onClick={() => setBio('Fitness enthusiast & meal prep master 💪')}
                className="w-full p-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-left"
              >
                Fitness enthusiast & meal prep master 💪
              </button>
              <button
                onClick={() => setBio('Exploring new recipes and cuisines 🌍')}
                className="w-full p-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-left"
              >
                Exploring new recipes and cuisines 🌍
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
