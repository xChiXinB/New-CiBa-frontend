<template>
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
</template>

<script setup lang="ts">
import WordInput from '../components/input/WordInput.vue';
import WordTable from '../components/input/WordTable.vue';
import { useWordStore } from '../stores/word';

const store = useWordStore();
</script>
