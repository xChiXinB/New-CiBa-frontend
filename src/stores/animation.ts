import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export interface FlyingElement {
  id: string;
  text: string;
  startX: number;
  startY: number;
  targetID: string;
  duration: number;
  onComplete?: () => void;
}

export const useAnimationStore = defineStore('animation', () => {
  const flyingElements = ref<FlyingElement[]>([]);

  /**
   * 开始一个飞入动画
   * @param text 文本内容
   * @param startRect 起始位置 (DOMRect)
   * @param targetRect 目标位置 (DOMRect)
   * @param onComplete 动画完成后的回调
   */
  function applyFlyingElement(
    text: string,
    startRect: { left: number; top: number; width: number; height: number },
    targetID: string,
    onComplete?: () => void,
  ) {
    const id = uuidv4();

    const element: FlyingElement = {
      id,
      text,
      startX: startRect.left,
      startY: startRect.top,
      targetID: targetID,
      // 动画持续时间 ms
      // duration: 600, // 生产环境
      duration: 3000, // 开发环境
      onComplete,
    };

    flyingElements.value.push(element);
  }

  function removeFlyingElement(id: string) {
    const index = flyingElements.value.findIndex((e) => e.id === id);
    if (index === -1) return;
    const element = flyingElements.value[index];
    if (!element) return;
    element.onComplete?.();
    flyingElements.value.splice(index, 1);
  }

  return {
    flyingElements,
    applyFlyingElement,
    removeFlyingElement,
  };
});
