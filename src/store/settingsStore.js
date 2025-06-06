import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 创建设置存储
const useSettingsStore = create(
  persist(
    (set) => ({
      // 主题设置
      theme: 'light', // light, dark
      
      // 字体设置
      fontSize: 'medium', // small, medium, large
      fontFamily: 'default', // default, serif, sans-serif
      
      // 用户信息
      userProfile: {
        name: '日记用户',
        avatar: null, // 头像URL
      },
      
      // 更改主题
      setTheme: (theme) => set({ theme }),
      
      // 更改字体大小
      setFontSize: (fontSize) => set({ fontSize }),
      
      // 更改字体
      setFontFamily: (fontFamily) => set({ fontFamily }),
      
      // 更新用户资料
      updateUserProfile: (profile) => set((state) => ({
        userProfile: { ...state.userProfile, ...profile }
      })),
    }),
    {
      name: 'diary-settings', // localStorage 的键名
      getStorage: () => localStorage, // 使用 localStorage 作为存储
    }
  )
);

export default useSettingsStore;
