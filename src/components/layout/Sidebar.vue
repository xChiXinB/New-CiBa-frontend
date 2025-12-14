<template>
  <aside
    class="h-screen bg-slate-800 text-white flex flex-col transition-all duration-300"
    :class="isCollapsed ? 'w-20' : 'w-64'"
  >
    <!-- Logo / Title Area -->
    <div
      class="h-16 flex items-center justify-center border-b border-slate-700 overflow-hidden whitespace-nowrap"
    >
      <span v-if="!isCollapsed" class="text-xl font-bold tracking-wider">词霸 CiBa</span>
      <span v-else class="text-xl font-bold tracking-wider">霸</span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-6">
      <ul class="space-y-2 px-4">
        <li v-for="item in menuItems" :key="item.path">
          <router-link
            :to="item.path"
            class="flex items-center rounded-lg transition-colors duration-200 group"
            :class="[
              $route.path === item.path
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white',
              isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-3',
            ]"
            :title="isCollapsed ? item.name : ''"
          >
            <!-- Icon Placeholder -->
            <div class="w-5 h-5 flex items-center justify-center" :class="{ 'mr-3': !isCollapsed }">
              <Icon v-if="item.icon" :name="item.icon" class="w-full h-full" />
              <span v-else class="w-2 h-2 rounded-full bg-current"></span>
            </div>

            <span v-if="!isCollapsed" class="font-medium whitespace-nowrap">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Collapse Button -->
    <div class="p-4 border-t border-slate-700 flex justify-center">
      <button
        @click="toggleCollapse"
        class="p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
        :title="isCollapsed ? '展开' : '收起'"
      >
        <Icon :name="isCollapsed ? 'chevron-right' : 'chevron-left'" class="w-5 h-5" />
      </button>
    </div>

    <!-- Footer / User Info (Optional) -->
    <div v-if="!isCollapsed" class="pb-4 text-xs text-slate-500 text-center whitespace-nowrap">
      dev version
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import Icon from '../common/Icon.vue';

const isCollapsed = ref(false);
const userManuallyToggled = ref(false);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  userManuallyToggled.value = isCollapsed.value;
};

const handleResize = () => {
  if (userManuallyToggled.value) return;

  // 阈值设为 1024px (lg)
  if (window.innerWidth < 1024) {
    isCollapsed.value = true;
  } else {
    isCollapsed.value = false;
  }
};

onMounted(() => {
  handleResize(); // 初始化时执行一次
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const menuItems = computed(() => [
  { name: '查词', path: '/', icon: 'search' },
  { name: '文章', path: '/passage', icon: 'book' },
]);
</script>
