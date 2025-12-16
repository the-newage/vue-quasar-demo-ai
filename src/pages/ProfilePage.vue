<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-12 col-md-6">
      <h4 class="q-my-md">{{ $t('profile') }}</h4>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ $t('editProfile') }}</div>
        </q-card-section>
        <q-card-section>
          <div v-if="query.isLoading.value" class="text-center">
            <q-spinner-dots color="primary" size="2em" />
          </div>
          <div v-else-if="query.isError.value" class="text-center text-negative">
            {{ $t('profileError') }}
          </div>
          <q-form v-else @submit="onSubmit">
            <q-input
              v-model="name"
              :label="$t('name')"
              :error="!!nameErrorMessage"
              :error-message="nameErrorMessage"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="email"
              :label="$t('email')"
              :error="!!emailErrorMessage"
              :error-message="emailErrorMessage"
              outlined
              class="q-mb-md"
            />
            <q-btn
              :label="$t('saveChanges')"
              type="submit"
              color="primary"
              :loading="mutation.isPending.value"
            />
          </q-form>
        </q-card-section>
        <q-card-actions>
          <q-btn flat :label="$t('logout')" color="primary" @click="handleLogout" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useProfileQuery } from '@/queries/useProfileQuery';
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { profileSchema } from '@/validation/schemas';
import { watch } from 'vue';
import type { User } from '@/types/user';

const authStore = useAuthStore();
const router = useRouter();
const { query, mutation } = useProfileQuery();

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(profileSchema),
});

const { value: name, errorMessage: nameErrorMessage } = useField<string>('name');
const { value: email, errorMessage: emailErrorMessage } = useField<string>('email');

watch(query.data, (newData) => {
  if (newData) {
    setValues(newData);
  }
});

const onSubmit = handleSubmit((values) => {
  mutation.mutate(values as User);
});

function handleLogout() {
  authStore.logout();
  void router.push({ name: 'login' });
}
</script>
