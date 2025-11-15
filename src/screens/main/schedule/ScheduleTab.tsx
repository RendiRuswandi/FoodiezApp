import { useState } from 'react';
import { Coffee, Sun, Moon, Cookie, Check, X, Settings, Bell, BellOff } from 'lucide-react-native';
import { Switch } from '../../../components/ui/switch';
import { Button } from '../../../components/ui/button';
import type { MealCheckIn, MealSchedule } from '../../../types';

interface ScheduleTabProps {
  mealSchedules: MealSchedule[];
  mealCheckIns: MealCheckIn[];
  onMealCheckIn: (mealType: string) => void;
  onRemoveMealCheckIn: (mealType: string) => void;
  onUpdateSchedule: (schedule: MealSchedule) => void;
  onRequestNotificationPermission: () => void;
}

export default function ScheduleTab({
  mealSchedules,
  mealCheckIns,
  onMealCheckIn,
  onRemoveMealCheckIn,
  onUpdateSchedule,
  onRequestNotificationPermission,
}: ScheduleTabProps) {
  const [showSettings, setShowSettings] = useState(false);

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast':
        return Coffee;
      case 'lunch':
        return Sun;
      case 'dinner':
        return Moon;
      case 'snack':
        return Cookie;
      default:
        return Coffee;
    }
  };

  const getMealCheckIn = (mealType: string) => {
    const today = new Date().toISOString().split('T')[0];
    return mealCheckIns.find((c) => c.date === today && c.mealType === mealType);
  };

  const enabledMeals = mealSchedules.filter((m) => m.enabled);
  const checkedMeals = enabledMeals.filter((m) => getMealCheckIn(m.type));
  const totalCalories = checkedMeals.reduce(
    (sum, meal) => sum + (getMealCheckIn(meal.type)?.calories || 0),
    0
  );
  const targetCalories = enabledMeals.reduce(
    (sum, meal) => sum + (meal.targetCalories || 0),
    0
  );

  return (
    <div className="p-6 pb-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-primary">Today's Meals</h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 text-primary" />
          </button>
        </div>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Daily Progress */}
      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 shadow-lg mb-6 text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="opacity-90 mb-1">Today's Progress</p>
            <h2>
              {checkedMeals.length} / {enabledMeals.length} Meals
            </h2>
          </div>
          <div className="text-right">
            <p className="opacity-90 mb-1">Calories</p>
            <h2>{totalCalories} kcal</h2>
          </div>
        </div>
        <div className="bg-primary-foreground/20 rounded-full h-3 overflow-hidden">
          <div
            className="bg-primary-foreground h-full transition-all duration-500 rounded-full"
            style={{
              width: `${enabledMeals.length > 0 ? (checkedMeals.length / enabledMeals.length) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border mb-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-primary">Enable Notifications</h3>
              <p className="text-xs text-muted-foreground">Get reminders for meals</p>
            </div>
            <Button
              onClick={onRequestNotificationPermission}
              variant="outline"
              className="border-border"
            >
              Enable
            </Button>
          </div>
        </div>
      )}

      {/* Meal Cards */}
      <div className="space-y-4">
        {mealSchedules.map((meal) => {
          const Icon = getMealIcon(meal.type);
          const checkIn = getMealCheckIn(meal.type);

          return (
            <div
              key={meal.type}
              className={`bg-card rounded-2xl p-5 shadow-sm border transition-all ${
                checkIn
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-border hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4 mb-3">
                {/* Icon */}
                <div className={`${checkIn ? 'bg-primary' : 'bg-accent'} p-3 rounded-xl relative`}>
                  <Icon
                    className={`w-6 h-6 ${checkIn ? 'text-primary-foreground' : 'text-primary'}`}
                  />
                  {checkIn && (
                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-primary">{meal.name}</h3>
                    <div className="flex items-center gap-2">
                      {meal.notificationEnabled ? (
                        <Bell className="w-4 h-4 text-primary" />
                      ) : (
                        <BellOff className="w-4 h-4 text-muted-foreground" />
                      )}
                      <Switch
                        checked={meal.enabled}
                        onCheckedChange={() =>
                          onUpdateSchedule({ ...meal, enabled: !meal.enabled })
                        }
                      />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{meal.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">⏰ {meal.time}</span>
                    {meal.targetCalories && (
                      <span className="text-muted-foreground">
                        🔥 {meal.targetCalories} kcal
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Check-in Details */}
              {checkIn && (
                <div className="mt-4 pt-4 border-t border-border">
                  {checkIn.photo && (
                    <img
                      src={checkIn.photo}
                      alt={checkIn.mealName}
                      className="w-full h-40 object-cover rounded-xl mb-3"
                    />
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-primary">{checkIn.mealName}</p>
                      {checkIn.calories && (
                        <p className="text-muted-foreground text-sm">
                          {checkIn.calories} kcal • {checkIn.time}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveMealCheckIn(meal.type)}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-destructive" />
                    </button>
                  </div>
                  {checkIn.description && (
                    <p className="text-muted-foreground text-sm">{checkIn.description}</p>
                  )}
                </div>
              )}

              {/* Check-in Button */}
              {meal.enabled && !checkIn && (
                <button
                  onClick={() => onMealCheckIn(meal.type)}
                  className="w-full mt-3 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all hover:shadow-md"
                >
                  Check-in Now
                </button>
              )}

              {checkIn && (
                <button
                  onClick={() => onMealCheckIn(meal.type)}
                  className="w-full mt-3 py-3 bg-muted hover:bg-accent text-primary rounded-xl transition-colors"
                >
                  Update Check-in
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Weekly Summary */}
      <div className="mt-6 p-5 bg-card rounded-2xl shadow-sm border border-border">
        <h3 className="text-primary mb-3">This Week Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-primary mb-1">
              {new Set(mealCheckIns.map((c) => c.date)).size}
            </div>
            <div className="text-xs text-muted-foreground">Days Active</div>
          </div>
          <div className="text-center">
            <div className="text-primary mb-1">{mealCheckIns.length}</div>
            <div className="text-xs text-muted-foreground">Meals Logged</div>
          </div>
          <div className="text-center">
            <div className="text-primary mb-1">
              {enabledMeals.length - checkedMeals.length}
            </div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
}
