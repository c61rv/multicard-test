<template>
  <v-container>
    <v-btn class="mb-4" @click="router.back()">
      <v-icon left>mdi-arrow-left</v-icon>
      Назад к списку
    </v-btn>
    <v-card v-if="currentEmployee && !loading" :loading="loading">
      <v-card-title class="text-h5">
        {{ currentEmployee.firstName }} {{ currentEmployee.lastName }}
      </v-card-title>
      <v-card-subtitle>Детальная информация о сотруднике</v-card-subtitle>
      <v-list>
        <v-list-item prepend-icon="mdi-card-account-details-outline">
          <v-list-item-title>Серия и номер паспорта</v-list-item-title>
          <v-list-item-subtitle>{{ currentEmployee.passport }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item prepend-icon="mdi-calendar">
          <v-list-item-title>Дата рождения</v-list-item-title>
          <v-list-item-subtitle>{{ new Date(currentEmployee.birthDate.split('.').reverse().join('-')).toLocaleDateString() }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item prepend-icon="mdi-gender-male-female">
          <v-list-item-title>Пол</v-list-item-title>
          <v-list-item-subtitle>{{ currentEmployee.gender }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item prepend-icon="mdi-check-circle-outline">
          <v-list-item-title>Статус</v-list-item-title>
          <v-list-item-subtitle>
            <v-chip :color="currentEmployee.status ? 'green' : 'red'">
              {{ currentEmployee.status ? 'Активен' : 'Не активен' }}
            </v-chip>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
    <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEmployeesStore } from '@/stores/employees';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const employeesStore = useEmployeesStore();
const { currentEmployee, loading } = storeToRefs(employeesStore);

onMounted(() => {
  employeesStore.fetchEmployeeById(route.params.id);
});
</script>