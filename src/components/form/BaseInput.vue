<template>
  <q-input
    v-model="value"
    :label="label"
    :error-message="errorMessage"
    :error="!!errorMessage"
    outlined
    class="q-mb-md"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string;
  label: string;
}>();

const { value, errorMessage, handleBlur } = useField<string>(() => props.name);
</script>
