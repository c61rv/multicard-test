<template>
  <v-container>
    <v-btn class="mb-4" @click="router.back()">
      <v-icon start>mdi-arrow-left</v-icon>
      Назад к списку
    </v-btn>

    <v-card v-if="currentDocument && !loading" :loading="loading">
      <v-card-title class="text-h5">
        {{ currentDocument.type === 'счет-фактура' ? 'Счет-фактура' : 'Доверенность' }} №{{ currentDocument.number }}
      </v-card-title>
      <v-card-subtitle>
        Детальная информация о документе
      </v-card-subtitle>

      <v-divider class="mx-4"></v-divider>

      <v-list lines="two">
        <v-list-item v-if="currentDocument.employee" prepend-icon="mdi-account">
          <v-list-item-title>Сотрудник</v-list-item-title>
          <v-list-item-subtitle>
            {{ currentDocument.employee.firstName }} {{ currentDocument.employee.lastName }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item prepend-icon="mdi-calendar">
          <v-list-item-title>Дата документа</v-list-item-title>
          <v-list-item-subtitle>{{ new Date(currentDocument.date).toLocaleDateString() }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item prepend-icon="mdi-text-box-outline">
          <v-list-item-title>Описание</v-list-item-title>
          <v-list-item-subtitle style="white-space: pre-wrap;">{{ currentDocument.description }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item v-if="currentDocument.type === 'счет-фактура'" prepend-icon="mdi-receipt-text-outline">
          <v-list-item-title>Тип счет-фактуры</v-list-item-title>
          <v-list-item-subtitle>{{ currentDocument.invoiceType }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item v-if="currentDocument.type === 'доверенность'" prepend-icon="mdi-account-tie">
          <v-list-item-title>ФИО доверенного лица</v-list-item-title>
          <v-list-item-subtitle>{{ currentDocument.proxyFullName }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>

    <div v-else class="text-center pa-10">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      <div class="mt-4">Загрузка данных...</div>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDocumentsStore } from '@/stores/documents';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();

const documentsStore = useDocumentsStore();

const { currentDocument, loading } = storeToRefs(documentsStore);

onMounted(() => {
  const documentId = route.params.id;
  documentsStore.fetchDocumentById(documentId);
});

onUnmounted(() => {
  documentsStore.currentDocument = null;
});
</script>

<style scoped>
.v-list-item-subtitle {
  white-space: pre-wrap;
}
</style>