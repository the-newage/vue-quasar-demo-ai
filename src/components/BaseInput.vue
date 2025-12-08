<template>
  <div>
    <Field :name="name" v-slot="{ field, errorMessage }">
      <q-input
        v-model="field.value"
        :label="label"
        :error-message="errorMessage"
        :error="!!errorMessage"
      />
    </Field>
  </div>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate';

defineProps<{
  name: string;
  label: string;
}>();
</script>
