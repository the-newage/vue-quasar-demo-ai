<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-md">
      <h1 class="text-h4 q-ma-none">Posts</h1>
      <q-space />
      <q-btn color="primary" label="Create Post" to="/posts/create" />
    </div>

    <q-list v-if="posts" bordered separator>
      <q-item v-for="post in posts" :key="post.id" clickable :to="`/posts/${post.id}`">
        <q-item-section>
          <q-item-label class="text-h6">{{ post.title }}</q-item-label>
          <q-item-label caption>{{ post.body.substring(0, 100) }}...</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div v-else-if="isLoading" class="text-center">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <div v-else-if="isError" class="text-center text-negative">
      <p>Error loading posts.</p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { usePostsQuery } from '@/queries/usePostsQuery';

const { data: posts, isLoading, isError } = usePostsQuery();
</script>
