<template>
  <div
    class="bg-gray-50 rounded-lg border border-gray-200 p-6 min-h-75 text-lg leading-relaxed font-serif"
  >
    <template v-if="passageStore.parsedTokens.length > 0">
      <span
        v-for="token in passageStore.parsedTokens"
        :key="token.id"
        :class="getTokenClass(token)"
        class="select-none"
        @click="handleTokenClick(token)"
      >
        {{ token.text }}
      </span>
    </template>
    <div v-else class="text-center text-gray-400 py-10">文章内容将显示在这里...</div>
  </div>
</template>

<script setup lang="ts">
import { usePassageStore } from '../../stores/passage';
import { useWordStore } from '../../stores/word';
import type { Token } from '../../utils/parser';

const passageStore = usePassageStore();
const wordStore = useWordStore();

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

const handleTokenClick = (token: Token) => {
  if (!token.isWord) return;

  // 添加单词
  wordStore.addWord(token.text);
};
</script>
