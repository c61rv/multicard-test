import { defineStore } from 'pinia';
import api from '@/api';

export const useEmployeesStore = defineStore('employees', {
  state: () => ({
    employees: [],
    totalEmployees: 0,
    currentEmployee: null,
    loading: false,
  }),
  actions: {
    async fetchEmployees({ page, itemsPerPage, sortBy }) {
      this.loading = true;
      try {
        const params = {
          _page: page,
          _limit: itemsPerPage,
        };

        if (sortBy && sortBy.length > 0) {
          params._sort = sortBy[0].key;
          params._order = sortBy[0].order;
        }
        const response = await api.getEmployees(page, itemsPerPage);

        this.employees = response.data;
        console.log(response.headers.get("X-Total-Count"));
        this.totalEmployees = parseInt(response.headers['x-total-count'], 10) || 0;

      } catch (error) {
        console.error('Ошибка при загрузке сотрудников:', error);
        this.employees = [];
        this.totalEmployees = 0;
      } finally {
        this.loading = false;
      }
    },
  },
});