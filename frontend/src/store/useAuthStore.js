import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('catzo_user')) || null,
    setUser: (user) => {
        localStorage.setItem('catzo_user', JSON.stringify(user));
        set({ user });
    },
    logout: () => {
        localStorage.removeItem('catzo_user');
        set({ user: null });
    }
}));
