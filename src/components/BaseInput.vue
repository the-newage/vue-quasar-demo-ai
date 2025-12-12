<template>
  <q-input
    v-model="model"
    :label="label"
    :rules="rules"
    outlined
    class="q-mb-md"
  />
</template>

<script setup lang="ts">
import type { QInputProps } from 'quasar';

defineProps<{
  label: string;
  rules?: QInputProps['rules'];
}>();

const model = defineModel<string>();
</script>
