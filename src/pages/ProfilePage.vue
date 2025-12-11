<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-12 col-md-6">
      <h4 class="q-my-md">{{ $t('profile') }}</h4>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ $t('userProfile') }}</div>
          <div class="text-subtitle2">{{ $t('profileDescription') }}</div>
        </q-card-section>
        <q-card-section>
          <div v-if="authStore.user">
            <p><strong>{{ $t('name') }}:</strong> {{ authStore.user.name }}</p>
            <p><strong>{{ $t('email') }}:</strong> {{ authStore.user.email }}</p>
          </div>
          <div v-else>
            <p>{{ $t('noUserProfile') }}</p>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn
            flat
            :label="$t('logout')"
            color="primary"
            @click="handleLogout"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

function handleLogout() {
  authStore.logout();
  void router.push({ name: 'login' });
}
</script>