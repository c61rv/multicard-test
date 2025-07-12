<template>
  <v-container>
    <v-card>
      <v-card-title>Список сотрудников</v-card-title>
      <v-data-table-server
          class="elevation-1"
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="employees"
          :items-length="totalEmployees"
          :loading="loading"
          @update:options="loadItems"
          @click:row="employeeInfo"
      >
        <template #item.fullName="{ item }">
          {{ item.firstName }} {{ item.lastName }}
        </template>
        <template #item.status="{ item }">
          <v-chip :color="item.status === true ? 'green' : 'red'" dark>
            {{ item.status === true ? 'Активный' : 'Отключен'  }}
          </v-chip>
        </template>
      </v-data-table-server>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useEmployeesStore } from '@/stores/employees';

const router = useRouter();
const employeesStore = useEmployeesStore();
const { employees, totalEmployees, loading } = storeToRefs(employeesStore);

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Ф.И.О', value: 'fullName' },
  { title: 'Дата рождения', value: 'birthDate' },
  { title: 'Пол', value: 'gender' },
  { title: 'Паспорт', value: 'passport' },
  { title: 'Статус', value: 'status' },
]

const itemsPerPage = ref(10)

function loadItems({ page, itemsPerPage, sortBy }) {
  employeesStore.fetchEmployees({ page, itemsPerPage, sortBy });
}
function employeeInfo(event, { item }) {
  router.push({ name: 'employee-inner', params: { id: item.id } });
}
</script>