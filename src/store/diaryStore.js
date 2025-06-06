import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 创建一个日记帖子的唯一ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// 获取当前日期的格式化字符串
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0]; // 返回 YYYY-MM-DD 格式
};

// 创建 Zustand store
const useDiaryStore = create(
  persist(
    (set, get) => ({
      // 日记列表
      diaries: [],
      
      // 当前编辑的日记
      currentDiary: {
        id: null,
        title: '',
        content: '',
        date: getCurrentDate(),
        tags: [],
        mood: 'neutral',  // 情绪: happy, sad, neutral 等
        weather: 'sunny', // 天气: sunny, cloudy, rainy 等
      },
      
      // 设置当前编辑的日记
      setCurrentDiary: (diary) => set({ currentDiary: diary }),
      
      // 重置当前编辑的日记为新日记
      resetCurrentDiary: () => set({
        currentDiary: {
          id: null,
          title: '',
          content: '',
          date: getCurrentDate(),
          tags: [],
          mood: 'neutral',
          weather: 'sunny',
        }
      }),
      
      // 更新当前日记的特定字段
      updateCurrentDiary: (field, value) => set((state) => ({
        currentDiary: { ...state.currentDiary, [field]: value }
      })),
      
      // 保存当前的日记
      saveDiary: () => set((state) => {
        const { currentDiary, diaries } = state;
        
        // 如果没有ID，创建一个新日记
        if (!currentDiary.id) {
          const newDiary = {
            ...currentDiary,
            id: generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          return { diaries: [newDiary, ...diaries] };
        } 
        
        // 更新现有日记
        const updatedDiary = {
          ...currentDiary,
          updatedAt: new Date().toISOString()
        };
        
        const updatedDiaries = diaries.map(diary => 
          diary.id === currentDiary.id ? updatedDiary : diary
        );
        
        return { diaries: updatedDiaries };
      }),
      
      // 根据ID加载日记
      loadDiaryById: (id) => {
        const diary = get().diaries.find(d => d.id === id);
        if (diary) {
          set({ currentDiary: { ...diary } });
          return diary;
        }
        return null;
      },
      
      // 删除日记
      deleteDiary: (id) => set((state) => ({
        diaries: state.diaries.filter(diary => diary.id !== id)
      })),
      
      // 获取统计数据
      getStats: () => {
        const diaries = get().diaries;
        return {
          total: diaries.length,
          thisMonth: diaries.filter(d => {
            const diaryDate = new Date(d.date);
            const now = new Date();
            return diaryDate.getMonth() === now.getMonth() && 
                   diaryDate.getFullYear() === now.getFullYear();
          }).length,
          thisYear: diaries.filter(d => {
            const diaryDate = new Date(d.date);
            const now = new Date();
            return diaryDate.getFullYear() === now.getFullYear();
          }).length
        };
      }
    }),
    {
      name: 'diary-storage', // localStorage 的键名
      getStorage: () => localStorage, // 使用 localStorage 作为存储
    }
  )
);

export default useDiaryStore;
