<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ route.meta.title ? route.meta.title : ''  }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ props }" v-if="userProfile">
          <v-btn v-bind="props" text class="px-2">
            <v-avatar size="36">
              <v-img
                  :src="userProfile.img"
                  :alt="userProfile.username"
              ></v-img>
            </v-avatar>
            <div class="d-none d-sm-flex flex-column align-start ml-2">
              <span class="text-body-2 font-weight-bold">{{ userProfile.username }}</span>
              <span class="text-caption">{{ userProfile.role }}</span>
            </div>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item link to="/profile">
            <template v-slot:prepend>
              <v-icon>mdi-account-circle</v-icon>
            </template>
            <v-list-item-title>Профиль</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item link @click="logout">
            <template v-slot:prepend>
              <v-icon color="error">mdi-logout</v-icon>
            </template>
            <v-list-item-title class="text-error">Выйти</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :to="item.to"
            link
        >
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { onMounted } from 'vue';
import { useProfileStore } from '@/stores/profile';
import { storeToRefs } from 'pinia';

const route = useRoute()
const drawer = ref(true);
const menuItems = ref([
  { title: 'Сотрудники', icon: 'mdi-account-group', to: '/employees' },
  { title: 'Документы', icon: 'mdi-text-box-multiple', to: '/documents' },
  { title: 'Профиль', icon: 'mdi-account-circle', to: '/profile' },
]);
const profileStore = useProfileStore();
const { userProfile } = storeToRefs(profileStore);
const logout = () => {
  alert('Выход из системы...');
};

onMounted(() => {
  profileStore.fetchProfile();
});
</script>