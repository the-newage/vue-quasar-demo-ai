<template>
  <q-page class="q-pa-md">
    <h2 class="text-h5">Comments for Post #{{ postId }}</h2>

    <q-list v-if="comments" bordered separator>
      <q-item v-for="comment in comments" :key="comment.id">
        <q-item-section>
          <q-item-label class="text-weight-bold">{{ comment.name }}</q-item-label>
          <q-item-label caption>{{ comment.email }}</q-item-label>
          <q-item-label>{{ comment.body }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div v-else-if="isLoading" class="text-center">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <div v-else-if="isError" class="text-center text-negative">
      <p>Error loading comments.</p>
    </div>

    <q-btn flat label="Back to Post" @click="$router.back()" class="q-mt-md" />
  </q-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useCommentsQuery } from '@/queries/useCommentsQuery';

const route = useRoute();
const postId = Number(route.params.id);

const { data: comments, isLoading, isError } = useCommentsQuery(postId);
</script>
