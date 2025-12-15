<template>
  <div class="mb-6">
    <div class="flex justify-between items-center mb-2">
      <label for="passage-input" class="block text-sm font-medium text-gray-700">
        输入文章
      </label>
      <button
        v-if="store.text"
        @click="store.setText(''); notification.show('已清空文章！')"
        class="text-sm text-blue-600 font-extrabold hover:underline transition-colors"
        title="清空文章内容"
      >
        清空
      </button>
    </div>
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
import { useNotificationStore } from '../../stores/notification';

const store = usePassageStore();
const notification = useNotificationStore();
</script>
