# 日记应用 (Diary App)

基于 Capacitor 的跨平台日记应用，支持 Web、iOS 和 Android 平台。

## 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 6
- **样式**: Tailwind CSS 3
- **路由**: React Router 7
- **状态管理**: Zustand 5
- **移动端**: Capacitor 7
- **原生功能**: Capacitor Camera

## 项目结构

```
├── src/
│   ├── assets/         # 静态资源
│   ├── components/     # 可复用组件
│   ├── pages/          # 页面组件
│   │   ├── Editor/     # 日记编辑页面
│   │   ├── Home/       # 首页
│   │   └── My/         # 个人中心页面
│   ├── store/          # 状态管理
│   ├── App.jsx         # 应用入口组件
│   ├── main.jsx        # 应用入口文件
│   └── index.css       # 全局样式
├── ios/                # iOS 平台代码
├── public/             # 公共资源
├── capacitor.config.ts # Capacitor 配置
├── tailwind.config.js  # Tailwind 配置
├── postcss.config.js   # PostCSS 配置
└── vite.config.js      # Vite 配置
```

## 功能特点

- 日记创建与编辑
- 照片拍摄与上传 (Web/iOS/Android)
- 标签管理
- 心情与天气记录
- 响应式设计
- 本地数据持久化

## 环境要求

- Node.js 18+
- npm 9+
- Xcode 14+ (用于 iOS 开发)
- Android Studio (用于 Android 开发)

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建 Web 版本

```bash
npm run build
```

### iOS 开发

```bash
npm run cap:ios
```

### Android 开发

```bash
npm run cap:android
```

## 部署

### Web

构建后的文件位于 `dist` 目录，可部署到任何静态网站托管服务。

### iOS

使用 Xcode 构建和部署到 App Store 或测试设备。

### Android

使用 Android Studio 构建 APK 或部署到 Google Play。

## 开发指南

### 添加新页面

1. 在 `src/pages` 创建新页面目录
2. 在 `App.jsx` 中添加路由配置

### 添加新原生功能

1. 安装相应的 Capacitor 插件
2. 同步到原生平台: `npx cap sync`

## 许可证

[MIT](LICENSE)
