import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { parseText, type Token } from '../utils/parser';

export const usePassageStore = defineStore('passage', () => {
  // 存储文章文本
  const text = ref('');

  // 从 LocalStorage 加载
  const savedText = localStorage.getItem('ciba_passage_text');
  if (savedText) {
    text.value = savedText;
  }

  // 自动保存
  watch(text, (newText) => {
    localStorage.setItem('ciba_passage_text', newText);
  });

  // 计算属性：解析后的 Token 数组
  const parsedTokens = computed<Token[]>(() => {
    return parseText(text.value);
  });

  // 设置文本
  function setText(newText: string) {
    text.value = newText;
  }

  return {
    text,
    parsedTokens,
    setText,
  };
});
