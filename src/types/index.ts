// src/types/index.ts

// Tipe data untuk profil pengguna
export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string; // atau path ke gambar
}

// Tipe data untuk satu item catatan
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: 'Recipe' | 'Shopping' | 'Idea' | 'General';
  createdAt: string;
}

// Tipe data untuk jadwal makan
export interface MealSchedule {
  id: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  time: string;
  reminderOn: boolean;
}

// Tipe data untuk check-in makan
export interface MealCheckIn {
  id: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  date: string;
}