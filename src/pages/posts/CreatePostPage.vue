<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4">Create Post</h1>
    <PostForm @submit="handleSubmit" @cancel="handleCancel" />
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import PostForm from '@/components/PostForm.vue';
import { useCreatePostMutation } from '@/queries/usePostMutations';
import type { PostFormValues } from '@/validation/schemas';

const router = useRouter();
const { mutate: createPost } = useCreatePostMutation();

const handleSubmit = (values: PostFormValues) => {
  createPost({ ...values, userId: 1 }, {
    onSuccess: () => {
      void router.push('/posts');
    },
  });
};

const handleCancel = () => {
  void router.push('/posts');
};
</script>
