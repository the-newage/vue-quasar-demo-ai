<template>
  <q-page class="row items-start justify-evenly q-pa-md">
    <div class="col-12 col-md-6">
      <h5 class="q-my-md">{{ $t('todos') }}</h5>
      <div v-if="isLoading">{{ $t('loading') }}</div>
      <div v-else-if="error">{{ $t('failedToLoadTodos') }}</div>
      <q-list v-else bordered separator>
        <q-item v-for="todo in todos" :key="todo.id">
          <q-item-section>{{ todo.content }}</q-item-section>
        </q-item>
      </q-list>

      <h5 class="q-my-md">{{ $t('addTodo') }}</h5>
      <Form @submit="onSubmit" :validation-schema="validationSchema" v-slot="{ isSubmitting }">
        <div class="q-gutter-md">
          <BaseInput name="content" :label="$t('newTodo')" />
          <q-btn type="submit" :label="$t('add')" color="primary" :loading="isSubmitting" />
        </div>
        <div v-if="formError" class="text-negative q-mt-sm">{{ formError }}</div>
      </Form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Form, type SubmissionContext } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import BaseInput from '@/components/BaseInput.vue';
import { todoSchema, type TodoFormValues } from '@/validation/schemas';
import { useTodosQuery, useCreateTodoMutation } from '@/queries/useTodosQuery';

const { data, isLoading, error } = useTodosQuery();
const { mutateAsync: createTodo } = useCreateTodoMutation();

const todos = computed(() => data.value ?? []);

const validationSchema = toTypedSchema(todoSchema);
const formError = ref<string | null>(null);

const { t } = useI18n();

async function onSubmit(values: TodoFormValues, context: SubmissionContext) {
  formError.value = null;
  try {
    await createTodo(values.content);
    context.resetForm();
  } catch (err: unknown) {
    formError.value = t('failedToAddTodo');
  }
}
</script>
