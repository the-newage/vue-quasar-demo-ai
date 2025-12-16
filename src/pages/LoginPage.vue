<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-12 col-md-4">
      <h4 class="q-my-md text-center">{{ $t('login') }}</h4>
      <q-card>
        <q-card-section>
          <Form @submit="onSubmit" :validation-schema="validationSchema" v-slot="{ isSubmitting }">
            <div class="q-gutter-md">
              <BaseInput name="email" :label="$t('email')" type="email" autocomplete="email" />
              <BaseInput
                name="password"
                :label="$t('password')"
                type="password"
                autocomplete="current-password"
              />
              <div class="text-center">
                <q-btn
                  type="submit"
                  :label="$t('login')"
                  color="primary"
                  :loading="isSubmitting"
                  class="full-width"
                />
              </div>
            </div>
            <div v-if="loginError" class="text-negative q-mt-sm text-center">
              {{ loginError }}
            </div>
          </Form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import BaseInput from '@/components/form/BaseInput.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const loginError = ref<string | null>(null);

const loginSchema = z.object({
  email: z.string().email(t('invalidEmail')),
  password: z.string().min(6, t('passwordTooShort')),
});

const validationSchema = toTypedSchema(loginSchema);

function onSubmit(values: Record<string, unknown>) {
  loginError.value = null;

  try {
    // Mock login - replace with actual authentication
    authStore.login(values.email as string);

    // Redirect to the originally requested page or home
    const redirect = route.query.redirect as string;
    void router.push(redirect || { name: 'home' });
  } catch {
    loginError.value = t('loginFailed');
  }
}
</script>
