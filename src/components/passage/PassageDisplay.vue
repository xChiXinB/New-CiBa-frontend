<template>
  <div
    class="bg-gray-50 rounded-lg border border-gray-200 p-6 min-h-75 text-lg leading-relaxed font-serif relative"
  >
    <template v-if="passageStore.parsedTokens.length > 0">
      <span
        v-for="token in passageStore.parsedTokens"
        :key="token.id"
        :class="getTokenClass(token)"
        class="select-none"
        @click="handleTokenClick(token, $event)"
      >
        {{ token.text }}
      </span>
    </template>
    <div v-else class="flex items-center justify-center text-gray-400 absolute inset-0">
      <p>文章内容将显示在这里...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePassageStore } from '../../stores/passage';
import { useWordStore } from '../../stores/word';
import { useAnimationStore } from '../../stores/animation';
import type { Token } from '../../utils/parser';
import { nextTick } from 'vue';

const passageStore = usePassageStore();
const wordStore = useWordStore();
const animationStore = useAnimationStore();

const getTokenClass = (token: Token) => {
  if (!token.isWord) return 'text-gray-500'; // 非单词

  const isExisted = wordStore.wordSet.has(token.text.toLowerCase());

  return [
    'cursor-pointer transition-colors duration-200 rounded px-0.5 mx-0.5',
    isExisted
      ? 'text-gray-400 hover:bg-gray-200' // 已存在：灰色
      : 'text-blue-700 hover:bg-blue-100 hover:text-blue-900 font-medium', // 生词：蓝色高亮
  ];
};

const handleTokenClick = async (token: Token, event: MouseEvent) => {
  // 1. 添加单词 (带动画标记)
  if (!token.isWord) return;
  const id = wordStore.addWord(token.text, { isAnimating: true });
  if (!id) return;

  // 2. 获取起始位置
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const rect = target.getBoundingClientRect();
  const startRect = {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
  
  // 3. 等待 DOM 更新 (表格行被渲染)
  await nextTick();

  // 4. 计算目标位置
  const rowElement = document.querySelector(`span[data-id="${id}"]`);
  if (!rowElement) return;
  
  let targetRect;
  const rowRect = rowElement.getBoundingClientRect();
  // 目标位置设为行的中心，或者单词列的位置
  // 这里简单设为行的左侧位置
  targetRect = {
    left: rowRect.left, // 稍微偏移
    top: rowRect.top,
    width: rowRect.width,
    height: rowRect.height,
  };

  // 5. 开始飞入动画
  animationStore.startFlying(
    token.text,
    startRect,
    targetRect,
    /**
     * onComplete 回调，通知 wordStore 动画结束
     */
    () => {
      // 6. 动画结束，显示真实行
      wordStore.finishAnimation(id);
    }
  );
};
</script>
