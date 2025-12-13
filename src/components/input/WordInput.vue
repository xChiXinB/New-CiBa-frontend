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

// 监听快捷键
const handleKeydown = (e: KeyboardEvent) => {
  // Ctrl+V 粘贴并查词 (浏览器默认行为会粘贴到输入框，我们需要拦截并直接提交，或者让它粘贴后我们检测)
  // 更好的体验是：如果焦点不在输入框，Ctrl+V 会聚焦并粘贴。
  // 这里我们简单实现：监听全局 focus，保持输入框聚焦
};

// 保持输入框聚焦 (参考旧版逻辑)
const handleWindowFocus = () => {
  focusInput();
};

onMounted(() => {
  focusInput();
  window.addEventListener('focus', handleWindowFocus);
});

onUnmounted(() => {
  window.removeEventListener('focus', handleWindowFocus);
});
</script>
