import { defineStore } from 'pinia';
import api from '@/api';

export const useDocumentsStore = defineStore('documents', {
  state: () => ({
    documents: [],
    totalDocuments: 0,
    currentDocument: null,
    loading: false,
  }),
  actions: {
    async fetchDocuments({ page, itemsPerPage, employeeId }) {
      this.loading = true;
      try {
        const response = await api.getDocuments(page, itemsPerPage, employeeId);
        this.documents = response.data;
        this.totalDocuments = parseInt(response.headers['x-total-count'], 10);
      } catch (error) {
        console.error('Ошибка при загрузке документов:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});