<template>
  <div>
    <q-input
      v-model="value"
      :label="label"
      :type="type"
      :error-message="errorMessage"
      :error="!!errorMessage"
      outlined
      class="q-mb-md"
      @blur="handleBlur"
      v-bind="$attrs"
    />
    <span v-if="errorMessage" :id="`${name}-error`" role="alert" class="sr-only">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'password' | 'email' | 'search' | 'tel' | 'file' | 'number' | 'url' | 'time' | 'date';
}>(), {
  type: 'text',
});

const { value, errorMessage, handleBlur } = useField<string>(() => props.name);
</script>
