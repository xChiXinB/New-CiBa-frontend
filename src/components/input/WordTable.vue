<template>
  <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-16"
          >
            序号
          </th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-32">
            单词
          </th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            释义
          </th>
          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 w-24 text-center">操作</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <WordRow
          v-for="(word, index) in store.words"
          :key="word.id"
          :word="word"
          :index="index"
        />

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
import WordRow from './WordRow.vue';

const store = useWordStore();
</script>
