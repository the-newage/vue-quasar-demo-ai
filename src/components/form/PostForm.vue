<template>
  <Form
    :validation-schema="validationSchema"
    :initial-values="initialValues"
    v-slot="{ isSubmitting }"
    @submit="onSubmit"
    class="q-gutter-md"
  >
    <BaseInput name="title" label="Title" />

    <Field v-slot="{ field, errorMessage }" name="body">
      <q-input
        v-model="field.value"
        label="Body"
        type="textarea"
        :error-message="errorMessage"
        :error="!!errorMessage"
        outlined
        @update:model-value="field.onChange"
        @blur="field.onBlur"
      />
    </Field>

    <div class="q-mt-md">
      <q-btn type="submit" color="primary" label="Submit" :loading="isSubmitting" />
      <q-btn flat label="Cancel" @click="$emit('cancel')" class="q-ml-sm" />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Form, Field } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import type { Post } from '@/types/models';
import BaseInput from '@/components/form/BaseInput.vue';
import { postSchema, type PostFormValues } from '@/validation/schemas';

const props = defineProps<{
  post?: Post;
}>();

const emit = defineEmits<{
  (e: 'submit', values: PostFormValues): void;
  (e: 'cancel'): void;
}>();

const validationSchema = toTypedSchema(postSchema);

const initialValues = computed(() => {
  if (props.post) {
    return {
      title: props.post.title,
      body: props.post.body,
    };
  }
  return {
    title: '',
    body: '',
  };
});

const onSubmit = (values: Record<string, unknown>) => {
  emit('submit', values as PostFormValues);
};
</script>
