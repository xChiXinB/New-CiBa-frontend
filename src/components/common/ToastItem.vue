<template>
  <div
    class="pointer-events-auto mb-3 flex w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300"
    :class="{
      'border-l-4 border-green-500': type === 'success',
      'border-l-4 border-red-500': type === 'error',
      'border-l-4 border-blue-500': type === 'info',
      'border-l-4 border-yellow-500': type === 'warning',
    }"
  >
    <div class="p-4 flex items-start w-full">
      <div class="shrink-0">
        <!-- Success Icon -->
        <Icon v-if="type === 'success'" name="check-circle" class="h-6 w-6 text-green-400" />
        <!-- Error Icon -->
        <Icon v-else-if="type === 'error'" name="x-circle" class="h-6 w-6 text-red-400" />
        <!-- Info Icon -->
        <Icon v-else-if="type === 'info'" name="information-circle" class="h-6 w-6 text-blue-400" />
        <!-- Warning Icon -->
        <Icon v-else name="exclamation-triangle" class="h-6 w-6 text-yellow-400" />
      </div>
      <div class="ml-3 w-0 flex-1 pt-0.5">
        <p class="text-sm font-medium text-gray-900">{{ message }}</p>
      </div>
      <div class="ml-4 flex shrink-0">
        <button
          type="button"
          @click="$emit('close')"
          class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span class="sr-only">Close</span>
          <Icon name="x-mark" class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue';

defineProps<{
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}>();

defineEmits(['close']);
</script>
