<template>
  <q-form @submit.prevent="handleSubmit">
    <BaseInput
      v-model="editablePost.title"
      label="Title"
      :rules="[(val) => !!val || 'Title is required']"
    />

    <q-input
      v-model="editablePost.body"
      label="Body"
      type="textarea"
      :rules="[(val) => !!val || 'Body is required']"
      outlined
      class="q-mt-md"
    />

    <div class="q-mt-md">
      <q-btn type="submit" color="primary" label="Submit" />
      <q-btn flat label="Cancel" @click="$emit('cancel')" class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Post } from '@/types/models';
import BaseInput from '@/components/BaseInput.vue';

const props = defineProps<{
  post?: Post;
}>();

const emit = defineEmits(['submit', 'cancel']);

const editablePost = ref<Omit<Post, 'id' | 'userId'> & { userId?: number }>({
  title: '',
  body: '',
  userId: 1, // Default user ID for new posts
});

watch(
  () => props.post,
  (newPost) => {
    if (newPost) {
      editablePost.value = { ...newPost };
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  emit('submit', editablePost.value);
};
</script>
