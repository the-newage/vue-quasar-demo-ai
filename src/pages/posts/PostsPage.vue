<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-md">
      <h1 class="text-h4 q-ma-none">Posts</h1>
      <q-space />
      <q-btn color="primary" label="Create Post" to="/posts/create" />
    </div>

    <q-linear-progress v-if="isLoading" indeterminate color="primary" />

    <q-banner v-if="isError" class="bg-red-2 text-red-9 q-mb-md">
      <template v-slot:avatar>
        <q-icon name="error" />
      </template>
      {{ error?.message || 'An unknown error occurred' }}
      <template v-slot:action>
        <q-btn flat color="red-9" label="Retry" @click="() => refetch()" />
      </template>
    </q-banner>

    <q-list v-if="posts" bordered separator>
      <q-item
        v-for="post in posts"
        :key="post.id"
        clickable
        :to="`/posts/${post.id}`"
      >
        <q-item-section>
          <q-item-label class="text-h6">{{ post.title }}</q-item-label>
          <q-item-label caption>{{ post.body.substring(0, 100) }}...</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            icon="delete"
            color="negative"
            flat
            round
            @click.stop.prevent="handleDelete(post.id)"
            :loading="deletePostMutation.isPending.value"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { usePostsQuery } from '@/queries/usePostsQuery';
import { useDeletePostMutation } from '@/queries/usePostMutations';
import { useDialog } from '@/composables/useDialog';

const { data: posts, isLoading, isError, error, refetch } = usePostsQuery();
const deletePostMutation = useDeletePostMutation();
const { showConfirmation } = useDialog();

const handleDelete = async (id: number) => {
  try {
    await showConfirmation('Are you sure you want to delete this post?');
    deletePostMutation.mutate(id);
  } catch {
    // User cancelled the dialog. Do nothing.
  }
};
</script>
