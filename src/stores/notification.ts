import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([]);
  let nextId = 1;

  /**
   * 显示通知
   * @param message 通知内容
   * @param type 通知类型 (默认 info)
   * @param duration 持续时间 (毫秒, 默认 3000)
   */
  function show(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration = 3000,
  ) {
    const id = nextId++;
    const notification: Notification = { id, message, type };

    notifications.value.push(notification);

    // 自动移除
    if (duration > 0) {
      setTimeout(() => {
        remove(id);
      }, duration);
    }
  }

  function remove(id: number) {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  }

  return {
    notifications,
    show,
    remove,
  };
});
