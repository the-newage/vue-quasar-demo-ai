<template>
  <q-dialog v-model="errorStore.show" @hide="errorStore.clearError">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">An Error Occurred</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <p>{{ errorStore.message }}</p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stores/error';

const errorStore = useErrorStore();
</script>
