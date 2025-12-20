<!-- FlyingItem.vue 负责元素飞行动画的具体实现 -->

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { CSSProperties } from 'vue';
import type { FlyingElement } from '@/stores/animation';
import { useWordStore } from '@/stores/word';
import { nextTick } from 'vue';

const wordStore = useWordStore();
let finishTimeout: number | undefined;

const props = defineProps<{
  item: FlyingElement;
}>();

const emit = defineEmits<{
  (e: 'complete'): void;
}>();

const flyingElementStyle = ref<CSSProperties>({
  left: '0px',
  top: '0px',
  opacity: '1',
  transform: `translate(${props.item.startX}px, ${props.item.startY}px)`,
  transition: `all ${props.item.duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
});

/**
 * 封装实时更新目标位置
 */
function updateTargetLocation(): void {
  const targetSpan = document.querySelector(`span[data-id="${props.item.targetID}"]`);
  // 强类型守卫，依赖于DOM结构
  if (!(targetSpan instanceof HTMLSpanElement)) return;

  const spanRect = targetSpan.getBoundingClientRect();
  flyingElementStyle.value.transform = `translate(${spanRect.left}px, ${spanRect.top}px)`;

  clearTimeout(finishTimeout);
  finishTimeout = window.setTimeout(() => {
    emit('complete');
  }, props.item.duration);
}

onMounted(() => {
  // 立刻更新末尾位置
  requestAnimationFrame(updateTargetLocation);
  // 条件更新末尾位置
  wordStore.$subscribe(async () => {
    await nextTick();
    requestAnimationFrame(updateTargetLocation);
  });

  // Set timeout to emit complete
  finishTimeout = setTimeout(() => {
    emit('complete');
  }, props.item.duration);
});
</script>

<template>
  <div
    class="fixed flex items-center justify-center font-bold text-gray-900 text-sm"
    :style="flyingElementStyle"
  >
    {{ item.text }}
  </div>
</template>

<style scoped>
/* Ensure hardware acceleration */
div {
  will-change: transform, opacity;
}
</style>
