import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import BottomTabBar from './components/BottomTabBar'
import Home from './pages/Home'
import Editor from './pages/Editor'
import My from './pages/My'
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
        <div className="max-w-md mx-auto pb-16">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/editor/:id" element={<Editor />} />
            <Route path="/my" element={<My />} />
          </Routes>
        </div>
        <BottomTabBar />
      </div>
    </Router>
  )
}

export default App
