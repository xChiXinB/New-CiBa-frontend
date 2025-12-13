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
              <Icon name="spinner" class="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" />
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
import Icon from '../common/Icon.vue';

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
