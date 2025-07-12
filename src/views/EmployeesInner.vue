<template>
  <v-container>
    <v-btn class="mb-4" @click="router.back()">
      <v-icon start>mdi-arrow-left</v-icon>
      Назад к списку
    </v-btn>

    <v-card v-if="currentEmployee && !employeeLoading" :loading="employeeLoading" class="mb-6">
      <v-card-title class="text-h5">
        {{ currentEmployee.firstName }} {{ currentEmployee.lastName }}
      </v-card-title>
      <v-card-subtitle>
        Детальная информация о сотруднике
      </v-card-subtitle>
      <v-list>
        <v-list-item prepend-icon="mdi-card-account-details-outline">
          <v-list-item-title>Серия и номер паспорта</v-list-item-title>
          <v-list-item-subtitle>{{ currentEmployee.passport }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item prepend-icon="mdi-calendar">
          <v-list-item-title>Дата рождения</v-list-item-title>
          <v-list-item-subtitle>{{ currentEmployee.birthDate }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item prepend-icon="mdi-gender-male-female">
          <v-list-item-title>Пол</v-list-item-title>
          <v-list-item-subtitle>{{ currentEmployee.gender }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item prepend-icon="mdi-check-circle-outline">
          <v-list-item-title>Статус</v-list-item-title>
          <v-list-item-subtitle>
            <v-chip :color="currentEmployee.isActive ? 'green' : 'red'">
              {{ currentEmployee.isActive ? 'Активен' : 'Не активен' }}
            </v-chip>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <template v-if="currentEmployee && documents.length" :loading="documentsLoading">
        <v-card-subtitle class="mt-5">
          Документы сотрудника
        </v-card-subtitle>
        <v-card-text>
          <v-data-table-server
              v-model:items-per-page="itemsPerPage"
              :headers="documentHeaders"
              :items-length="totalDocuments"
              :items="documents"
              :loading="documentsLoading"
              class="elevation-1"
              item-value="id"
              @update:options="loadDocuments"
              @click:row="goToDocumentDetail"
          >
            <template v-slot:item.date="{ item }">{{ }}
              {{ new Date(item.date).toLocaleDateString() }}
            </template>
          </v-data-table-server>
        </v-card-text>
      </template>
    </v-card>
    <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>

  </v-container>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEmployeesStore } from '@/stores/employees';
import { useDocumentsStore } from '@/stores/documents';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const employeeId = route.params.id;

const employeesStore = useEmployeesStore();
const { currentEmployee, loading: employeeLoading } = storeToRefs(employeesStore);

const documentsStore = useDocumentsStore();
const { documents, totalDocuments, loading: documentsLoading } = storeToRefs(documentsStore);

const itemsPerPage = ref(10);
const documentHeaders = ref([
  { title: 'Тип документа', key: 'type', sortable: false },
  { title: 'Номер', key: 'number', sortable: false },
  { title: 'Дата', key: 'date', sortable: false },
  { title: 'Описание', key: 'description', sortable: false },
]);

function loadDocuments({ page, itemsPerPage }) {
  documentsStore.fetchDocuments({
    page,
    itemsPerPage,
    employeeId: employeeId
  });
}

function goToDocumentDetail(event, { item }) {
  router.push({ name: 'document-inner', params: { id: item.id } });
}

onMounted(() => {
  employeesStore.fetchEmployeeById(employeeId);
});

watch(currentEmployee, (newEmployee) => {
  if (newEmployee) {
    loadDocuments({ page: 1, itemsPerPage: itemsPerPage.value });
  }
}, { immediate: true });

</script>

<style scoped>
.v-data-table-server :deep(tbody tr) {
  cursor: pointer;
}
</style>