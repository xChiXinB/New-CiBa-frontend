<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { CSSProperties } from 'vue';
import type { FlyingElement } from '@/stores/animation';

const props = defineProps<{
  item: FlyingElement;
}>();

const emit = defineEmits<{
  (e: 'complete'): void;
}>();

const style = ref<CSSProperties>({
  left: `${props.item.startX}px`,
  top: `${props.item.startY}px`,
  opacity: '1',
  transform: 'scale(1)',
  transition: `all ${props.item.duration}ms cubic-bezier(0.22, 0.61, 0.36, 1)`
});

onMounted(() => {
  // Force a reflow/repaint before starting animation
  // requestAnimationFrame is usually enough
  requestAnimationFrame(() => {
    style.value.left = `${props.item.targetX}px`;
    style.value.top = `${props.item.targetY}px`;
  });

  // Set timeout to emit complete
  setTimeout(() => {
    emit('complete');
  }, props.item.duration);
});
</script>

<template>
  <div
    class="fixed flex items-center justify-center font-bold text-gray-900"
    :style="style"
  >
    {{ item.text }}
  </div>
</template>

<style scoped>
/* Ensure hardware acceleration */
div {
  will-change: left, top, transform, opacity;
}
</style>
