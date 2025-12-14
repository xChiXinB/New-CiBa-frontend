<template>
  <tr class="hover:bg-gray-50 transition-colors">
    <!-- 序号 -->
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
      {{ index + 1 }}
    </td>

    <!-- 单词 -->
    <td class="whitespace-nowrap px-3 py-4 text-sm font-bold text-gray-900">
      <div v-if="word.status === 'error'">
        <input
          type="text"
          v-model="word.text"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          @keydown.enter="store.retryWord(word.id, word.text)"
        />
      </div>
      <span v-else>{{ word.text }}</span>
    </td>

    <!-- 释义 (可编辑) -->
    <td class="px-3 py-4 text-sm text-gray-500">
      <div v-if="word.status === 'loading'" class="flex items-center text-blue-500">
        <Icon name="spinner" class="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" />
        查询中...
      </div>
      <div v-else-if="word.status === 'error'" class="text-red-500 flex items-center">
        <span>查询失败: {{ word.errorMessage }}</span>
      </div>
      <textarea
        v-else
        ref="textareaRef"
        v-model="word.translation"
        rows="1"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 resize-none overflow-hidden"
        @input="handleInput"
        @focus="handleInput"
      ></textarea>
    </td>

    <!-- 操作 -->
    <td
      class="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6 space-x-2"
    >
      <button
        v-if="word.status === 'error'"
        @click="store.retryWord(word.id, word.text)"
        class="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded hover:bg-blue-50"
        title="重试"
      >
        <Icon name="refresh" class="w-5 h-5" />
      </button>
      <button
        @click="store.removeWord(word.id)"
        class="text-red-600 hover:text-red-900 transition-colors p-1 rounded hover:bg-red-50"
        title="删除"
      >
        <Icon name="trash" class="w-5 h-5" />
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';
import { useWordStore } from '../../stores/word';
import Icon from '../common/Icon.vue';
import type { WordItem } from '../../stores/word';

const props = defineProps<{
  word: WordItem;
  index: number;
}>();

const store = useWordStore();
const textareaRef = ref<HTMLTextAreaElement | null>(null);

// Textarea 高度自适应
const autoResize = () => {
  const el = textareaRef.value;
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
};

const handleInput = () => {
  autoResize();
};

// 监听状态变化，当变为 success 时自动调整高度
watch(
  () => props.word.status,
  (newStatus, oldStatus) => {
    if (newStatus === 'success' && oldStatus !== 'success') {
      nextTick(() => {
        autoResize();
      });
    }
  },
);

// 初始化时如果已经是 success 状态，也要调整高度
onMounted(() => {
  if (props.word.status === 'success') {
    nextTick(() => {
      autoResize();
    });
  }
});
</script>
