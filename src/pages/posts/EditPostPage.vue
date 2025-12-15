<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4">Edit Post</h1>
    <PostForm v-if="post" :post="post" @submit="handleSubmit" @cancel="handleCancel" />
    <div v-else-if="isLoading" class="text-center">
      <q-spinner-dots color="primary" size="40px" />
    </div>
    <div v-else-if="isError" class="text-center text-negative">
      <p>Error loading post for editing.</p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/PostForm.vue';
import { usePostQuery } from '@/queries/usePostsQuery';
import { useUpdatePostMutation } from '@/queries/usePostMutations';
import type { PostFormValues } from '@/validation/schemas';

const route = useRoute();
const router = useRouter();
const postId = Number(route.params.id);

const { data: post, isLoading, isError } = usePostQuery(postId);
const { mutate: updatePost } = useUpdatePostMutation();

const handleSubmit = (values: PostFormValues) => {
  if (!post.value) return;
  updatePost({ ...post.value, ...values }, {
    onSuccess: () => {
      void router.push(`/posts/${postId}`);
    },
  });
};

const handleCancel = () => {
  void router.push(`/posts/${postId}`);
};
</script>
