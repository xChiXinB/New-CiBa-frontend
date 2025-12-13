<template>
  <i 
    v-if="svgContent" 
    v-html="svgContent" 
    class="inline-block select-none leading-none"
    :class="customClass"
    role="img"
    aria-hidden="true"
  ></i>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name: string;
  class?: string;
}>();

const icons = import.meta.glob('../../assets/icons/*.svg', { query: '?raw', import: 'default', eager: true });

const svgContent = computed(() => {
  const fileName = props.name.endsWith('.svg') ? props.name : `${props.name}.svg`;
  const path = `../../assets/icons/${fileName}`;
  return icons[path] as string | undefined;
});

const customClass = computed(() => props.class || '');
</script>

<style scoped>
:deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
