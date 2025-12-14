<template>
  <div class="mb-6">
    <div class="flex justify-between items-center mb-2">
      <label for="passage-input" class="block text-sm font-medium text-gray-700">
        输入文章
      </label>
      <button
        v-if="store.text"
        @click="store.setText('')"
        class="text-xs text-red-500 hover:text-red-700 hover:underline transition-colors"
      >
        清空文章
      </button>
    </div>
    <textarea
      id="passage-input"
      v-model="store.text"
      rows="4"
      class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border resize-y"
      placeholder="请在此粘贴文章，它们将显示于下方..."
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { usePassageStore } from '../../stores/passage';

const store = usePassageStore();
</script>
