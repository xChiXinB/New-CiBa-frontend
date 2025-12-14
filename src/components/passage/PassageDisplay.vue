<template>
  <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 min-h-[300px] leading-relaxed text-lg">
    <template v-if="passageStore.parsedTokens.length > 0">
      <span
        v-for="token in passageStore.parsedTokens"
        :key="token.id"
        :class="getTokenClass(token)"
        @click="handleTokenClick(token)"
      >
        {{ token.text }}
      </span>
    </template>
    <div v-else class="text-center text-gray-400 py-10">
      文章内容将显示在这里
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePassageStore } from '../../stores/passage';
import { useWordStore } from '../../stores/word';
import type { Token } from '../../utils/parser';

const passageStore = usePassageStore();
const wordStore = useWordStore();

// 获取 Token 的样式类
const getTokenClass = (token: Token) => {
  if (!token.isWord) {
    return 'text-gray-500'; // 非单词部分
  }

  const isExisted = wordStore.wordSet.has(token.text.toLowerCase());
  
  return [
    'cursor-pointer transition-colors duration-200 rounded px-0.5 mx-0.5',
    isExisted 
      ? 'text-gray-400 hover:bg-gray-100' // 已存在：灰色，悬停微亮
      : 'text-gray-900 hover:bg-blue-100 hover:text-blue-700 font-medium' // 未存在：深色，悬停变蓝高亮
  ];
};

// 处理点击事件
const handleTokenClick = (token: Token) => {
  if (!token.isWord) return;
  
  // 添加单词
  wordStore.addWord(token.text);
};
</script>
