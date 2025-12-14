<template>
  <div class="mb-6">
    <label for="passage-input" class="block text-sm font-medium text-gray-700 mb-2">
      输入文章
    </label>
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
