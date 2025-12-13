<template>
    <aside class="w-64 h-screen bg-slate-800 text-white flex flex-col transition-all duration-300">
        <!-- Logo / Title Area -->
        <div class="h-16 flex items-center justify-center border-b border-slate-700">
            <span class="text-xl font-bold tracking-wider">词霸 Refactor</span>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 py-6">
            <ul class="space-y-2 px-4">
                <li v-for="item in menuItems" :key="item.path">
                    <router-link 
                        :to="item.path"
                        class="flex items-center px-4 py-3 rounded-lg transition-colors duration-200 group"
                        :class="[
                            $route.path === item.path 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        ]"
                    >
                        <!-- Icon Placeholder -->
                        <div class="w-5 h-5 mr-3 flex items-center justify-center">
                            <img v-if="item.icon" :src="item.icon" :alt="item.name" class="w-full h-full filter invert" />
                            <span v-else class="w-2 h-2 rounded-full bg-current"></span>
                        </div>
                        
                        <span class="font-medium">{{ item.name }}</span>
                    </router-link>
                </li>
            </ul>
        </nav>

        <!-- Footer / User Info (Optional) -->
        <div class="p-4 border-t border-slate-700 text-xs text-slate-500 text-center">
            v1.0.0 Dev
        </div>
    </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// 导入图标资源
// 使用 new URL(...) 是 Vite 中引用静态资源的标准方式
const getIconUrl = (name: string) => {
    return new URL(`../../assets/icons/${name}`, import.meta.url).href
}

const menuItems = computed(() => [
    { name: '查词', path: '/', icon: getIconUrl('search.svg') },
    { name: '文章', path: '/passage', icon: getIconUrl('book.svg') },
]);
</script>
