import { defineStore } from 'pinia';
import api from '@/api';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    userProfile: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProfile() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.getProfile();
        this.userProfile = response.data;
      } catch (err) {
        console.error('Ошибка при загрузке профиля:', err);
        this.error = 'Не удалось загрузить данные профиля.';
      } finally {
        this.loading = false;
      }
    },
  },
});