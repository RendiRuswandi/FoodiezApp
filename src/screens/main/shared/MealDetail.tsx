import { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Clock, Flame } from 'lucide-react-native';
import { Button } from '../../../components//ui/button';
import { Input } from '../../../components//ui/input';
import { Textarea } from '../../../components/ui/textarea';
import type { MealCheckIn, MealSchedule } from '../../../types';

interface MealDetailProps {
  mealType: string;
  mealSchedule?: MealSchedule;
  existingCheckIn?: MealCheckIn;
  onSave: (checkIn: MealCheckIn) => void;
  onBack: () => void;
}

export default function MealDetail({
  mealType,
  mealSchedule,
  existingCheckIn,
  onSave,
  onBack,
}: MealDetailProps) {
  const [mealName, setMealName] = useState('');
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (existingCheckIn) {
      setMealName(existingCheckIn.mealName || '');
      setDescription(existingCheckIn.description || '');
      setCalories(existingCheckIn.calories?.toString() || '');
      setPhoto(existingCheckIn.photo || null);
    }
  }, [existingCheckIn]);

  const handlePhotoUpload = () => {
    // Simulate photo upload
    const mockPhotos = [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    ];
    const randomPhoto = mockPhotos[Math.floor(Math.random() * mockPhotos.length)];
    setPhoto(randomPhoto);
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
  };

  const handleSave = () => {
    if (!mealName.trim()) {
      alert('Please enter a meal name');
      return;
    }

    const now = new Date();
    const checkIn: MealCheckIn = {
      id: existingCheckIn?.id || Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mealType,
      mealName,
      description,
      calories: calories ? parseInt(calories) : undefined,
      photo: photo || undefined,
      time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
    };

    onSave(checkIn);
  };

  const getMealIcon = () => {
    switch (mealType) {
      case 'breakfast':
        return '🌅';
      case 'lunch':
        return '🌞';
      case 'dinner':
        return '🌙';
      case 'snack':
        return '🍪';
      default:
        return '🍽️';
    }
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
        <h2 className="text-primary">
          {getMealIcon()} {mealSchedule?.name || 'Meal'} Check-in
        </h2>
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
          {/* Target Info */}
          {mealSchedule && (
            <div className="bg-accent rounded-2xl p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-primary">Scheduled Time</span>
                </div>
                <span className="text-primary">{mealSchedule.time}</span>
              </div>
              {mealSchedule.targetCalories && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-primary" />
                    <span className="text-primary">Target Calories</span>
                  </div>
                  <span className="text-primary">{mealSchedule.targetCalories} kcal</span>
                </div>
              )}
            </div>
          )}

          {/* Photo Upload */}
          <div>
            <label className="text-primary mb-2 block">
              Meal Photo
            </label>
            {photo ? (
              <div className="relative">
                <img
                  src={photo}
                  alt="Meal"
                  className="w-full h-64 object-cover rounded-2xl"
                />
                <button
                  onClick={handleRemovePhoto}
                  className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg shadow-lg hover:bg-destructive/90"
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                onClick={handlePhotoUpload}
                className="w-full h-64 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-muted transition-colors"
              >
                <Camera className="w-12 h-12 text-muted-foreground" />
                <span className="text-muted-foreground">Add Photo</span>
              </button>
            )}
          </div>

          {/* Meal Name */}
          <div>
            <label className="text-primary mb-2 block">
              What did you eat?
            </label>
            <Input
              type="text"
              placeholder="e.g., Oatmeal with berries"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="bg-card border-border focus:border-primary h-14"
            />
          </div>

          {/* Calories */}
          <div>
            <label className="text-primary mb-2 block">
              Calories (optional)
            </label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="bg-card border-border focus:border-primary h-14 pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                kcal
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-primary mb-2 block">
              Notes (optional)
            </label>
            <Textarea
              placeholder="How was it? Any ingredients? Feeling?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-card border-border focus:border-primary min-h-[150px] resize-none"
            />
          </div>

          {/* Quick Suggestions */}
          <div>
            <label className="text-primary mb-2 block">
              Quick Add
            </label>
            <div className="grid grid-cols-2 gap-3">
              {mealType === 'breakfast' && (
                <>
                  <button
                    onClick={() => {
                      setMealName('Oatmeal with Fruits');
                      setCalories('350');
                    }}
                    className="p-4 bg-card border border-border rounded-xl hover:bg-muted transition-colors text-left"
                  >
                    <div className="text-2xl mb-1">🥣</div>
                    <div className="text-primary">Oatmeal</div>
                    <div className="text-xs text-muted-foreground">350 kcal</div>
                  </button>
                  <button
                    onClick={() => {
                      setMealName('Scrambled Eggs & Toast');
                      setCalories('400');
                    }}
                    className="p-4 bg-card border border-border rounded-xl hover:bg-muted transition-colors text-left"
                  >
                    <div className="text-2xl mb-1">🍳</div>
                    <div className="text-primary">Eggs & Toast</div>
                    <div className="text-xs text-muted-foreground">400 kcal</div>
                  </button>
                </>
              )}
              {mealType === 'lunch' && (
                <>
                  <button
                    onClick={() => {
                      setMealName('Grilled Chicken Salad');
                      setCalories('550');
                    }}
                    className="p-4 bg-card border border-border rounded-xl hover:bg-muted transition-colors text-left"
                  >
                    <div className="text-2xl mb-1">🥗</div>
                    <div className="text-primary">Chicken Salad</div>
                    <div className="text-xs text-muted-foreground">550 kcal</div>
                  </button>
                  <button
                    onClick={() => {
                      setMealName('Pasta with Vegetables');
                      setCalories('650');
                    }}
                    className="p-4 bg-card border border-border rounded-xl hover:bg-muted transition-colors text-left"
                  >
                    <div className="text-2xl mb-1">🍝</div>
                    <div className="text-primary">Pasta</div>
                    <div className="text-xs text-muted-foreground">650 kcal</div>
                  </button>
                </>
              )}
              {mealType === 'dinner' && (
                <>
                  <button
                    onClick={() => {
                      setMealName('Grilled Salmon & Rice');
                      setCalories('600');
                    }}
                    className="p-4 bg-card border border-border rounded-xl hover:bg-muted transition-colors text-left"
                  >
                    <div className="text-2xl mb-1">🐟</div>
                    <div className="text-primary">Salmon</div>
                    <div className="text-xs text-muted-foreground">600 kcal</div>
                  </button>
                  <button
                    onClick={() => {
                      setMealName('Chicken Stir Fry');
                      setCalories('550');
                    }}
                    className="p-4 bg-card border border-border rounded-xl hover:bg-muted transition-colors text-left"
                  >
                    <div className="text-2xl mb-1">🍲</div>
                    <div className="text-primary">Stir Fry</div>
                    <div className="text-xs text-muted-foreground">550 kcal</div>
                  </button>
                </>
              )}
              {mealType === 'snack' && (
                <>
                  <button
                    onClick={() => {
                      setMealName('Mixed Nuts');
                      setCalories('200');
                    }}
                    className="p-4 bg-card border border-border rounded-xl hover:bg-muted transition-colors text-left"
                  >
                    <div className="text-2xl mb-1">🥜</div>
                    <div className="text-primary">Nuts</div>
                    <div className="text-xs text-muted-foreground">200 kcal</div>
                  </button>
                  <button
                    onClick={() => {
                      setMealName('Greek Yogurt');
                      setCalories('150');
                    }}
                    className="p-4 bg-card border border-border rounded-xl hover:bg-muted transition-colors text-left"
                  >
                    <div className="text-2xl mb-1">🥛</div>
                    <div className="text-primary">Yogurt</div>
                    <div className="text-xs text-muted-foreground">150 kcal</div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
