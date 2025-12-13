<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/layout/Sidebar.vue'
</script>

<template>
  <div class="flex h-screen w-screen overflow-hidden bg-gray-50">
    <!-- 左侧导航 -->
    <Sidebar />

    <!-- 右侧主内容区 -->
    <main class="flex-1 overflow-auto relative">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* 全局重置或基础样式 */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}
</style>
