<template>
  <Form
    :validation-schema="validationSchema"
    :initial-values="initialValues"
    v-slot="{ isSubmitting }"
    @submit="onSubmit"
    class="q-gutter-md"
    aria-label="Post creation form"
  >
    <BaseInput
      name="title"
      label="Title"
      aria-required="true"
      aria-describedby="title-error"
    />

    <BaseInput
      name="body"
      label="Body"
      type="textarea"
      aria-required="true"
      aria-describedby="body-error"
    />

    <div class="q-mt-md">
      <q-btn type="submit" color="primary" label="Submit" :loading="isSubmitting" />
      <q-btn flat label="Cancel" @click="$emit('cancel')" class="q-ml-sm" />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import type { Post } from '@/types/models';
import BaseInput from '@/components/form/BaseInput.vue';
import { postSchema, type PostFormValues } from '@/validation/schemas';
import type { PropType } from 'vue';

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    default: undefined,
    validator: (value: Post) => {
      // If a post is provided, it must have an id
      return value ? typeof value.id === 'number' : true;
    },
  },
});

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
