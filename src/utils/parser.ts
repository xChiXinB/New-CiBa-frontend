export interface Token {
  id: number;
  text: string;
  isWord: boolean;
}

/**
 * 解析文本，将其拆分为单词和非单词片段
 * @param text 输入的文本
 * @returns Token 数组
 */
export const parseText = (text: string): Token[] => {
  if (!text) return [];

  // 使用正则匹配所有连续的单词字符 (\w+) 或非单词字符 ([^\w]+)
  // \w 匹配 [A-Za-z0-9_]，如果需要更严格的英文单词匹配，可以使用 /[a-zA-Z]+|[^a-zA-Z]+/g
  // 这里沿用旧版逻辑 \w+
  const matches = text.match(/\w+|[^\w]+/g);

  if (!matches) return [];

  return matches.map((segment, index) => {
    // 判断是否为单词：只要包含单词字符，且不仅仅是数字（可选优化，旧版逻辑是 \w 即可）
    // 旧版逻辑：beginning.match(/\w/g) !== null
    const isWord = /\w/.test(segment);

    return {
      id: index,
      text: segment,
      isWord,
    };
  });
};
