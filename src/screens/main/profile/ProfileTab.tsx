import { User, Bell, Moon, LogOut, Sun, Edit, TrendingUp, Calendar as CalendarIcon, BookOpen } from 'lucide-react-native';
import { Switch } from '../../../components/ui/switch';
import { Button } from '../../../components/ui/button';
import type { MealCheckIn, UserProfile } from '../../../types';

interface ProfileTabProps {
  profile: UserProfile;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  mealCheckIns: MealCheckIn[];
  notesCount: number;
  onEditProfile: () => void;
}

export default function ProfileTab({
  profile,
  onLogout,
  isDarkMode,
  onToggleDarkMode,
  notificationsEnabled,
  onToggleNotifications,
  mealCheckIns,
  notesCount,
  onEditProfile,
}: ProfileTabProps) {
  // Calculate stats
  const uniqueDays = new Set(mealCheckIns.map((c) => c.date)).size;
  const totalMeals = mealCheckIns.length;
  const totalCalories = mealCheckIns.reduce((sum, c) => sum + (c.calories || 0), 0);
  const avgCalories = totalMeals > 0 ? Math.round(totalCalories / uniqueDays) : 0;
  const completionRate = totalMeals > 0 ? Math.min(100, Math.round((totalMeals / uniqueDays / 3) * 100)) : 0;

  // Get recent activity
  const recentCheckIns = [...mealCheckIns]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="p-6 pb-8">
      {/* Header */}
      <h1 className="text-primary mb-6">My Profile</h1>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 shadow-lg mb-6 text-primary-foreground">
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar */}
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-primary-foreground/20"
            />
          ) : (
            <div className="w-20 h-20 bg-primary-foreground/20 rounded-full flex items-center justify-center border-4 border-primary-foreground/20">
              <User className="w-10 h-10" />
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <h2 className="mb-1">{profile.name}</h2>
            <p className="opacity-90 text-sm">{profile.email}</p>
          </div>

          {/* Edit Button */}
          <button
            onClick={onEditProfile}
            className="p-2 hover:bg-primary-foreground/20 rounded-lg transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>

        {profile.bio && (
          <p className="opacity-90 text-sm mb-4">{profile.bio}</p>
        )}

        {profile.goalCalories && (
          <div className="bg-primary-foreground/20 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Daily Goal</span>
              <span className="font-medium">{profile.goalCalories} kcal</span>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">Days Active</span>
          </div>
          <p className="text-primary">{uniqueDays || 0}</p>
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">Meals Logged</span>
          </div>
          <p className="text-primary">{totalMeals}</p>
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">Notes Created</span>
          </div>
          <p className="text-primary">{notesCount}</p>
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🔥</span>
            <span className="text-xs text-muted-foreground">Avg Calories</span>
          </div>
          <p className="text-primary">{avgCalories}</p>
        </div>
      </div>

      {/* Achievement Badge */}
      {completionRate >= 80 && (
        <div className="bg-accent rounded-2xl p-4 shadow-sm border border-border mb-6">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🏆</div>
            <div>
              <h3 className="text-primary mb-1">Great Job!</h3>
              <p className="text-muted-foreground text-sm">
                You've maintained {completionRate}% completion rate
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {recentCheckIns.length > 0 && (
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border mb-6">
          <h3 className="text-primary mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentCheckIns.map((checkIn) => (
              <div
                key={checkIn.id}
                className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border"
              >
                {checkIn.photo ? (
                  <img
                    src={checkIn.photo}
                    alt={checkIn.mealName}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-xl">
                      {checkIn.mealType === 'breakfast'
                        ? '🌅'
                        : checkIn.mealType === 'lunch'
                          ? '🌞'
                          : checkIn.mealType === 'dinner'
                            ? '🌙'
                            : '🍪'}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-primary text-sm">{checkIn.mealName}</p>
                  <p className="text-muted-foreground text-xs">
                    {new Date(checkIn.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}{' '}
                    • {checkIn.time}
                    {checkIn.calories && ` • ${checkIn.calories} kcal`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Section */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border mb-6">
        <h3 className="text-primary mb-4">Settings</h3>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="bg-accent p-2 rounded-lg">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-primary">Notifications</h4>
              <p className="text-xs text-muted-foreground">Get meal reminders</p>
            </div>
          </div>
          <Switch checked={notificationsEnabled} onCheckedChange={onToggleNotifications} />
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent p-2 rounded-lg">
              {isDarkMode ? (
                <Moon className="w-5 h-5 text-primary" />
              ) : (
                <Sun className="w-5 h-5 text-primary" />
              )}
            </div>
            <div>
              <h4 className="text-primary">Dark Mode</h4>
              <p className="text-xs text-muted-foreground">
                {isDarkMode ? 'Dark theme active' : 'Light theme active'}
              </p>
            </div>
          </div>
          <Switch checked={isDarkMode} onCheckedChange={onToggleDarkMode} />
        </div>
      </div>

      {/* Logout Button */}
      <Button
        onClick={onLogout}
        className="w-full h-14 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Logout
      </Button>
    </div>
  );
}
