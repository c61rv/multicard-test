<template>
  <v-container>
    <div v-if="loading" class="text-center pa-10">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      <div class="mt-4">Загрузка профиля...</div>
    </div>

    <v-alert v-else-if="error" type="error" title="Ошибка загрузки" :text="error"></v-alert>

    <v-card v-else-if="userProfile" class="mx-auto" max-width="600">
      <v-card-title class="text-h5 d-flex align-center">
        <v-icon start size="30">mdi-account-circle</v-icon>
        Мой профиль
      </v-card-title>
      <v-card-subtitle>
        Информация о текущем пользователе
      </v-card-subtitle>

      <v-divider class="mx-4"></v-divider>

      <v-card-text>
        <v-list lines="two">
          <v-list-item prepend-icon="mdi-badge-account-outline">
            <v-list-item-title>Имя пользователя</v-list-item-title>
            <v-list-item-subtitle>{{ userProfile.username }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item prepend-icon="mdi-email-outline">
            <v-list-item-title>Email</v-list-item-title>
            <v-list-item-subtitle>{{ userProfile.email }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item prepend-icon="mdi-briefcase-account-outline">
            <v-list-item-title>Роль</v-list-item-title>
            <v-list-item-subtitle>{{ userProfile.role }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item prepend-icon="mdi-calendar-check-outline">
            <v-list-item-title>Дата регистрации</v-list-item-title>
            <v-list-item-subtitle>{{ userProfile.registrationDate }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item prepend-icon="mdi-web">
            <v-list-item-title>Версия приложения</v-list-item-title>
            <v-list-item-subtitle>{{ userProfile.appVersion }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProfileStore } from '@/stores/profile';
import { storeToRefs } from 'pinia';

const profileStore = useProfileStore();

const { userProfile, loading, error } = storeToRefs(profileStore);

onMounted(() => {
  profileStore.fetchProfile();
});
</script>