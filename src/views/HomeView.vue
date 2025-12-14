<template>
  <div class="flex h-full overflow-hidden relative">
    <!-- 左侧：单词列表 (始终存在) -->
    <div 
      class="h-full overflow-y-auto transition-all duration-500 ease-in-out bg-gray-50"
      :class="isPassageOpen ? 'w-1/2 border-r border-gray-200' : 'w-full'"
    >
      <div class="p-6 max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-800">单词查询</h1>

          <!-- 顶部操作按钮组 -->
          <div class="space-x-3">
            <button
              @click="store.clearAll()"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors shadow-sm"
              :disabled="store.words.length === 0"
              :class="{ 'opacity-50 cursor-not-allowed': store.words.length === 0 }"
            >
              清空列表
            </button>
            <button
              @click="store.exportToExcel()"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors shadow-sm"
              :disabled="store.words.length === 0"
              :class="{ 'opacity-50 cursor-not-allowed': store.words.length === 0 }"
            >
              导出 Excel
            </button>
          </div>
        </div>

        <!-- 输入区域 -->
        <WordInput />

        <!-- 列表区域 -->
        <div class="mt-6">
          <WordTable />
        </div>
      </div>
    </div>

    <!-- 右侧：文章面板 (滑动进出) -->
    <div 
      class="absolute right-0 top-0 h-full w-1/2 bg-white shadow-xl transition-transform duration-500 ease-in-out transform z-10"
      :class="isPassageOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="p-6 h-full overflow-y-auto">
        <h2 class="text-xl font-bold mb-4 text-gray-800">文章阅读</h2>
        <div class="p-10 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg h-64 flex items-center justify-center">
          <p>文章功能开发中...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import WordInput from '../components/input/WordInput.vue';
import WordTable from '../components/input/WordTable.vue';
import { useWordStore } from '../stores/word';

const store = useWordStore();
const route = useRoute();

// 根据路由判断是否打开文章面板
const isPassageOpen = computed(() => route.path === '/passage');
</script>
