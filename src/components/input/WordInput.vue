<template>
  <div class="mb-6">
    <div class="relative">
      <input
        ref="inputRef"
        v-model="inputValue"
        type="text"
        class="block w-full rounded-lg border-0 py-4 pl-4 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-lg sm:leading-6 transition-shadow"
        placeholder="请输入你的单词 (Enter 提交)"
        @keydown.enter="handleSubmit"
        @paste="handlePaste"
      />
      <div class="absolute inset-y-0 right-0 flex items-center pr-3">
        <span class="text-gray-400 text-sm mr-2 hidden sm:inline">Enter ↵</span>
      </div>
    </div>
    <div class="mt-2 flex justify-between items-center text-sm text-gray-500 px-1">
      <p>提示：支持 Ctrl+V 粘贴查词</p>
      <div class="space-x-2">
        <!-- 可以在这里放一些小工具按钮 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useWordStore } from '../../stores/word';

const store = useWordStore();
const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const handleSubmit = () => {
  if (!inputValue.value.trim()) return;
  store.addWord(inputValue.value);
  inputValue.value = '';
};

// 自动聚焦
const focusInput = () => {
  inputRef.value?.focus();
};

// 修复6: 粘贴并查词 (无需读取剪贴板权限)
const handlePaste = (e: ClipboardEvent) => {
  const text = e.clipboardData?.getData('text');
  if (text) {
    // 阻止默认粘贴行为，手动处理
    e.preventDefault();
    // 立即提交
    store.addWord(text);
    // 清空输入框 (虽然 preventDefault 阻止了粘贴，但为了保险)
    inputValue.value = '';
  }
};

// 保持输入框聚焦 (参考旧版逻辑)
onMounted(() => {
  focusInput();
  window.addEventListener('focus', focusInput);
});

onUnmounted(() => {
  window.removeEventListener('focus', focusInput);
});
</script>
