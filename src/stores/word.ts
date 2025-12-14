/**
 * word.ts
 * 单词 Store，用来管理单词数据
 */

import { defineStore } from 'pinia';
import { ref, watch, computed } from 'vue';
import api from '../services/api';
import { useNotificationStore } from './notification';
import * as XLSX from 'xlsx';
import { v4 } from 'uuid';

// 定义单词对象接口
export interface WordItem {
  id: string; // 唯一标识
  text: string; // 单词拼写
  translation: string; // 释义
  status: 'loading' | 'success' | 'error'; // 状态
  errorMessage?: string; // 错误信息
}

// 定义单词 Store
export const useWordStore = defineStore('word', () => {
  /**
   * 单词列表 WordItem[]
   */
  const words = ref<WordItem[]>(new Array());
  const notificationStore = useNotificationStore();

  /**
   * 计算属性：已存在单词的集合 (Set)，用于快速查找
   * 存储的是小写形式
   */
  const wordSet = computed(() => {
    return new Set(words.value.map(w => w.text.toLowerCase()));
  });

  // 从 LocalStorage 加载数据
  const savedWords = localStorage.getItem('ciba_words');
  if (savedWords) {
    try {
      words.value = JSON.parse(savedWords);
    } catch (e) {
      console.error('Failed to load words from localStorage', e);
    }
  }

  // 监听 words 变化，自动保存到 LocalStorage
  watch(
    words,
    (newWords) => {
      localStorage.setItem('ciba_words', JSON.stringify(newWords));
    },
    { deep: true },
  );

  /**
   * 添加单词并自动查询
   */
  async function addWord(text: string) {
    const trimmedText = text.trim().toLowerCase(); // 修复8: 强制小写
    if (!trimmedText) return;

    // 修复7: 检查是否已存在
    if (wordSet.value.has(trimmedText)) {
      notificationStore.show(`单词 "${trimmedText}" 已存在`, 'warning');
      return;
    }

    const id = v4();
    const newWord: WordItem = {
      id,
      text: trimmedText,
      translation: '',
      status: 'loading',
    };

    // 修复1: 插入到列表最后面 (push)
    words.value.push(newWord);

    try {
      const result = await api.fetchTranslation(trimmedText);
      // 更新释义
      const index = words.value.findIndex((w) => w.id === id);
      if (index !== -1 && words.value[index]) {
        words.value[index].translation = result.data.translation;
        words.value[index].status = 'success';
        notificationStore.show(`查询成功: ${trimmedText}`, 'success');
      }
    } catch (error: any) {
      const index = words.value.findIndex((w) => w.id === id);
      if (index !== -1 && words.value[index]) {
        words.value[index].status = 'error';
        words.value[index].errorMessage = error.message;
        notificationStore.show(`查询失败: ${trimmedText}`, 'error');
      }
    }
  }

  /**
   * 重试查询
   */
  async function retryWord(id: string, newText?: string) {
    const index = words.value.findIndex((w) => w.id === id);
    if (index === -1) return;

    const wordItem = words.value[index];
    if (!wordItem) return;

    // 如果提供了新文本，更新单词拼写
    if (newText) {
      const trimmedNewText = newText.trim().toLowerCase();
      if (!trimmedNewText) return;
      wordItem.text = trimmedNewText;
    }

    wordItem.status = 'loading';
    wordItem.errorMessage = undefined;

    try {
      const result = await api.fetchTranslation(wordItem.text);
      const currentIndex = words.value.findIndex((w) => w.id === id);
      if (currentIndex !== -1 && words.value[currentIndex]) {
        // 再次检查索引，防止异步期间被删除
        words.value[currentIndex].translation = result.data.translation;
        words.value[currentIndex].status = 'success';
        notificationStore.show(`重试成功: ${wordItem.text}`, 'success');
      }
    } catch (error: any) {
      const currentIndex = words.value.findIndex((w) => w.id === id);
      if (currentIndex !== -1 && words.value[currentIndex]) {
        words.value[currentIndex].status = 'error';
        words.value[currentIndex].errorMessage = error.message;
        notificationStore.show(`重试失败: ${wordItem.text}`, 'error');
      }
    }
  }

  /**
   * 删除单词
   */
  function removeWord(id: string) {
    const index = words.value.findIndex((w) => w.id === id);
    if (index !== -1 && words.value[index]) {
      const removedWord = words.value[index].text;
      words.value.splice(index, 1);
      // 修复5: 删除通知
      notificationStore.show(`已删除单词: ${removedWord}`, 'info');
    }
  }

  /**
   * 清空列表
   */
  function clearAll() {
    words.value = [];
    notificationStore.show('列表已清空', 'info');
  }

  /**
   * 导出为 Excel
   */
  function exportToExcel() {
    if (words.value.length === 0) {
      notificationStore.show('列表为空，无法导出', 'warning');
      return;
    }

    // 准备数据：序号, 单词, 释义
    const data = words.value.map((w, index) => ({
      序号: words.value.length - index, // 倒序序号，或者 index + 1
      单词: w.text,
      释义: w.translation,
    }));

    // 创建工作簿
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '生词本');

    // 导出文件
    const fileName = `生词记录_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(wb, fileName);

    notificationStore.show('导出成功！', 'success');
  }

  return {
    words,
    wordSet,
    addWord,
    retryWord,
    removeWord,
    clearAll,
    exportToExcel,
  };
});
