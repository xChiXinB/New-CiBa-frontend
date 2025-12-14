<template>
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-end sm:p-6 z-50"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <TransitionGroup name="notification">
        <ToastItem
          v-for="notification in store.notifications"
          :key="notification.id"
          :message="notification.message"
          :type="notification.type"
          @close="store.remove(notification.id)"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from '../../stores/notification';
import ToastItem from './ToastItem.vue';

const store = useNotificationStore();
</script>

<style scoped>
.notification-enter-active {
  transition: all 0.3s ease-out;
}

.notification-enter-from {
  transform: translateY(0.5rem);
  opacity: 0;
}

.notification-leave-to {
  opacity: 0;
}

.notification-leave-active {
  transition: all 0.1s ease-in;
}
</style>
