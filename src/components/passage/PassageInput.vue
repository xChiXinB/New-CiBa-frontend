<template>
  <div class="mb-6">
    <label for="passage-input" class="block text-sm font-medium text-gray-700 mb-2">
      输入文章
    </label>
    <input
      id="passage-input"
      v-model="store.text"
      class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-3 focus:ring-blue-500 focus:outline-none sm:text-sm p-3 border"
      placeholder="请在此粘贴文章，它们将显示于下方..."
    />
  </div>
</template>

<script setup lang="ts">
import { usePassageStore } from '../../stores/passage';

const store = usePassageStore();
</script>
