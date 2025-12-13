import axios from 'axios';

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // 后端 API 地址
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 响应拦截器：统一处理错误
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 这里可以做统一的错误日志记录
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default {
  // 查词接口
  async fetchTranslation(word: string) {
    try {
      const response = await apiClient.get('/vocab', {
        params: { word },
      });
      return response.data; // 返回 { code: 200, data: { ... } }
    } catch (error: any) {
      // 如果是 404，说明没找到，但也算一种“正常”的业务逻辑返回
      if (error.response && error.response.status === 404) {
        throw new Error(`没有找到单词 "${word}"`);
      }
      // 其他网络错误
      throw new Error(error.message || '网络请求失败');
    }
  },
};
