import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import BottomTabBar from './components/BottomTabBar'
import Home from './pages/Home'
import Editor from './pages/Editor'
import My from './pages/My'
import Test from './pages/Test'
import NotFound from './pages/NotFound'
import useSettingsStore from './store/settingsStore'

function App() {
  const { theme } = useSettingsStore();

  // 应用主题设置
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <Router>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        {/* 添加顶部安全区域边距 */}
        <div className="safe-top"></div>
        
        <div className="max-w-md mx-auto pb-16 safe-area-x">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/editor/:id" element={<Editor />} />
            <Route path="/my" element={<My />} />
            <Route path="/test" element={<Test />} />
            {/* 404页面路由配置 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        
        {/* 底部导航栏添加安全区域边距 */}
        <BottomTabBar />
        
        {/* 添加底部额外的安全区域边距 */}
        <div className="safe-bottom"></div>
      </div>
    </Router>
  )
}

export default App
