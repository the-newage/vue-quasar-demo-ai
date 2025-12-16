<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 q-ma-none q-mb-md">Comments for Post #{{ postId }}</h1>

    <q-linear-progress v-if="isLoading" indeterminate color="primary" />

    <q-banner v-else-if="isError" class="bg-red-2 text-red-9 q-mb-md">
      <template v-slot:avatar>
        <q-icon name="error" />
      </template>
      {{ error?.message || 'An unknown error occurred' }}
      <template v-slot:action>
        <q-btn flat color="red-9" label="Retry" @click="() => refetch()" />
      </template>
    </q-banner>

    <q-list v-else-if="comments" bordered separator>
      <q-item v-for="comment in comments" :key="comment.id">
        <q-item-section>
          <q-item-label class="text-weight-bold">{{ comment.name }}</q-item-label>
          <q-item-label caption>{{ comment.email }}</q-item-label>
          <q-item-label>{{ comment.body }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div v-else>
      <p>No comments found for this post.</p>
    </div>

    <q-btn
      flat
      label="Back to Post"
      @click="$router.back()"
      class="q-mt-md"
      icon="arrow_back"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useCommentsQuery } from '@/queries/useCommentsQuery';

const route = useRoute();
const postId = Number(route.params.id);

const {
  data: comments,
  isLoading,
  isError,
  error,
  refetch,
} = useCommentsQuery(postId);
</script>
