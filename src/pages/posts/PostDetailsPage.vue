<template>
  <q-page class="q-pa-md">
    <div v-if="post">
      <div class="row items-center q-mb-md">
        <h1 class="text-h4 q-ma-none">{{ post.title }}</h1>
        <q-space />
        <q-btn
          color="primary"
          label="Edit Post"
          :to="`/posts/${post.id}/edit`"
          class="q-mr-sm"
        />
        <q-btn color="negative" label="Delete Post" @click="handleDelete" />
      </div>

      <p>{{ post.body }}</p>

      <q-btn
        color="secondary"
        label="View Comments"
        :to="`/posts/${post.id}/comments`"
        class="q-mt-md"
      />
    </div>

    <div v-else-if="isLoading" class="text-center">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <div v-else-if="isError" class="text-center text-negative">
      <p>Error loading post.</p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { usePostQuery } from '@/queries/usePostsQuery';
import { useDeletePostMutation } from '@/queries/usePostMutations';
import type { Post } from '@/types/models';
import type { AxiosResponse } from 'axios';

const route = useRoute();
const router = useRouter();
const postId = Number(route.params.id);

const { data: post, isLoading, isError } = usePostQuery(postId);
const { mutate: deletePost } = useDeletePostMutation();

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this post?')) {
    deletePost(postId, {
      onSuccess: () => {
        void router.push('/posts');
      },
    });
  }
};
</script>
