<template>
  <q-item
    clickable
    :tag="isExternalLink ? 'a' : 'router-link'"
    :target="isExternalLink ? '_blank' : undefined"
    :href="isExternalLink ? link : undefined"
    :to="isExternalLink ? undefined : link"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}

const props = withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});

const isExternalLink = computed(() => {
  if (!props.link) return false;
  return props.link.startsWith('http') || props.link.startsWith('mailto:') || props.link.startsWith('tel:');
});
</script>
