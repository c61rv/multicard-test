<template>
  <v-card>
    <v-card-title>
      <span class="headline">Список документов</span>
    </v-card-title>
    <v-card-text>
      <v-autocomplete
          v-model="selectedEmployeeId"
          :items="allEmployees"
          :item-title="(item) => item ? `${item.lastName} ${item.firstName}` : ''"
          item-value="id"
          label="Фильтр по сотруднику"
          clearable
          class="mb-4"
          @update:modelValue="applyFilter"
      ></v-autocomplete>

      <v-data-table-server
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items-length="totalDocuments"
          :items="documents"
          :loading="loading"
          class="elevation-1"
          item-value="id"
          @update:options="loadItems"
          @click:row="documentInfo"
      >
        <template v-slot:item.employee="{ item }">
          {{ item.employee.firstName }} {{ item.employee.lastName }}
        </template>
      </v-data-table-server>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDocumentsStore } from '@/stores/documents';
import { useEmployeesStore } from '@/stores/employees';
import { storeToRefs } from 'pinia';

const router = useRouter();

const documentsStore = useDocumentsStore();
const { documents, totalDocuments, loading } = storeToRefs(documentsStore);

const employeesStore = useEmployeesStore();
const { employees: allEmployees } = storeToRefs(employeesStore);

const itemsPerPage = ref(10);
const selectedEmployeeId = ref(null);

const headers = ref([
  { title: 'ID', align: 'start', value: 'id' },
  { title: 'Тип документа', value: 'type' },
  { title: 'Номер', value: 'number' },
  { title: 'Дата', value: 'date' },
  { title: 'Сотрудник', value: 'employee' },
]);

let currentOptions = {};

function loadItems(options) {
  currentOptions = options;
  documentsStore.fetchDocuments({
    page: options.page,
    itemsPerPage: options.itemsPerPage,
    employeeId: selectedEmployeeId.value
  });
}

function applyFilter() {
  loadItems(currentOptions);
}

function documentInfo(event, { item }) {
  router.push({ name: 'document-inner', params: { id: item.id } });
}

onMounted(() => {
  employeesStore.fetchEmployees({ page: 1, itemsPerPage: 1000 });
});
</script>

<style scoped>
.v-data-table-server :deep(tbody tr) {
  cursor: pointer;
}
</style>