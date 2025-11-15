// src/types/index.ts

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string; 
  bio: string; // <-- TAMBAHKAN INI
  goalCalories: number; // <-- TAMBAHKAN INI
  // 'avatar' sepertinya sama dengan 'avatarUrl', jadi kita pakai 'avatarUrl'
}

export interface MealSchedule {
  id: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  time: string; 
  reminderOn: boolean;
  enabled: boolean; // <-- TAMBAHKAN INI (dari image_3de2bc.png)
  type: string; // <-- TAMBAHKAN INI
  calories: number; // <-- TAMBAHKAN INI
}

// Tipe data untuk satu item catatan
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: 'Recipe' | 'Shopping' | 'Idea' | 'General';
  createdAt: string;
}

// Tipe data untuk check-in makan
export interface MealCheckIn {
  id: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  date: string;
}
// ... Tipe Anda yang lain