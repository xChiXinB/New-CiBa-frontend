<template>
  <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-16">序号</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-32">单词</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">释义</th>
          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 w-24 text-center">操作</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-for="(word, index) in store.words" :key="word.id" class="hover:bg-gray-50 transition-colors">
          <!-- 序号 -->
          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
            {{ store.words.length - index }}
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
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              查询中...
            </div>
            <div v-else-if="word.status === 'error'" class="text-red-500 flex items-center">
              <span>查询失败: {{ word.errorMessage }}</span>
            </div>
            <textarea
              v-else
              v-model="word.translation"
              :ref="(el) => setTextareaRef(el, word.id)"
              rows="1"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 resize-none overflow-hidden"
              @input="autoResize($event.target as HTMLTextAreaElement)"
              @focus="autoResize($event.target as HTMLTextAreaElement)"
            ></textarea>
          </td>

          <!-- 操作 -->
          <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6 space-x-2">
            <button 
              v-if="word.status === 'error'"
              @click="store.retryWord(word.id, word.text)" 
              class="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded hover:bg-blue-50"
              title="重试"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
            <button 
              @click="store.removeWord(word.id)" 
              class="text-red-600 hover:text-red-900 transition-colors p-1 rounded hover:bg-red-50"
              title="删除"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </td>
        </tr>
        
        <!-- 空状态 -->
        <tr v-if="store.words.length === 0">
          <td colspan="4" class="py-10 text-center text-gray-500">
            <p>暂无单词，请在上方输入框添加</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useWordStore } from '../../stores/word';
import { nextTick, watch, ref } from 'vue';

const store = useWordStore();
const textareaRefs = ref<Map<string, HTMLTextAreaElement>>(new Map());

const setTextareaRef = (el: any, id: string) => {
  if (el) {
    textareaRefs.value.set(id, el as HTMLTextAreaElement);
  } else {
    textareaRefs.value.delete(id);
  }
};

// Textarea 高度自适应
const autoResize = (target: HTMLTextAreaElement) => {
  if (!target) return;
  target.style.height = 'auto';
  target.style.height = target.scrollHeight + 'px';
};

// 监听单词列表变化，当状态变为 success 时，自动调整高度
watch(() => store.words, (newWords) => {
  newWords.forEach(word => {
    if (word.status === 'success') {
      nextTick(() => {
        const el = textareaRefs.value.get(word.id);
        if (el) autoResize(el);
      });
    }
  });
}, { deep: true });
</script>
