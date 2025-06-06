import { useState } from 'react';
import useDiaryStore from '../../store/diaryStore';
import useSettingsStore from '../../store/settingsStore';

const My = () => {
  const { getStats } = useDiaryStore();
  const { 
    theme, setTheme, 
    fontSize, setFontSize, 
    fontFamily, setFontFamily,
    userProfile, updateUserProfile
  } = useSettingsStore();
  
  const [name, setName] = useState(userProfile.name);
  const [activeTab, setActiveTab] = useState('stats'); // 'stats', 'theme', 'profile'
  
  // 获取统计数据
  const stats = getStats();
  
  // 保存用户名
  const handleSaveName = () => {
    updateUserProfile({ name });
  };

  return (
    <div className="pb-16 pt-4">
      <div className="px-4 mb-6">
        <h1 className="text-2xl font-bold">我的</h1>
      </div>
      
      {/* 简单个人资料 */}
      <div className="px-4 mb-6 flex items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl mr-4">
          {userProfile.avatar ? (
            <img 
              src={userProfile.avatar} 
              alt="头像" 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span>{userProfile.name.charAt(0)}</span>
          )}
        </div>
        <div>
          <h2 className="text-xl font-medium">{userProfile.name}</h2>
          <p className="text-gray-500">共写了 {stats.total} 篇日记</p>
        </div>
      </div>
      
      {/* 选项卡 */}
      <div className="px-4 border-b border-gray-200">
        <div className="flex space-x-6">
          <button 
            className={`py-2 ${activeTab === 'stats' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('stats')}
          >
            统计
          </button>
          <button 
            className={`py-2 ${activeTab === 'theme' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('theme')}
          >
            外观
          </button>
          <button 
            className={`py-2 ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profile')}
          >
            个人信息
          </button>
        </div>
      </div>
      
      <div className="px-4 pt-4">
        {/* 统计面板 */}
        {activeTab === 'stats' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">日记统计</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">总日记数</p>
                <p className="text-2xl font-bold text-blue-800">{stats.total}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-green-800 text-sm">本月</p>
                <p className="text-2xl font-bold text-green-800">{stats.thisMonth}</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <p className="text-purple-800 text-sm">本年</p>
                <p className="text-2xl font-bold text-purple-800">{stats.thisYear}</p>
              </div>
            </div>
            
            {/* 可以在这里添加更多统计信息，如图表等 */}
          </div>
        )}
        
        {/* 外观设置面板 */}
        {activeTab === 'theme' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">外观设置</h3>
            
            {/* 主题切换 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">主题</label>
              <div className="flex space-x-4">
                <button 
                  className={`p-4 rounded-lg ${theme === 'light' ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setTheme('light')}
                >
                  <div className="bg-white border border-gray-200 h-12 w-12 rounded"></div>
                  <p className="text-sm mt-1 text-center">浅色</p>
                </button>
                <button 
                  className={`p-4 rounded-lg ${theme === 'dark' ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setTheme('dark')}
                >
                  <div className="bg-gray-900 border border-gray-700 h-12 w-12 rounded"></div>
                  <p className="text-sm mt-1 text-center">深色</p>
                </button>
              </div>
            </div>
            
            {/* 字体大小 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">字体大小</label>
              <div className="flex space-x-4">
                <button 
                  className={`px-4 py-2 border rounded-md ${fontSize === 'small' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                  onClick={() => setFontSize('small')}
                >
                  小
                </button>
                <button 
                  className={`px-4 py-2 border rounded-md ${fontSize === 'medium' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                  onClick={() => setFontSize('medium')}
                >
                  中
                </button>
                <button 
                  className={`px-4 py-2 border rounded-md ${fontSize === 'large' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                  onClick={() => setFontSize('large')}
                >
                  大
                </button>
              </div>
            </div>
            
            {/* 字体 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">字体</label>
              <div className="flex space-x-4">
                <button 
                  className={`px-4 py-2 border rounded-md ${fontFamily === 'default' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                  onClick={() => setFontFamily('default')}
                >
                  <span className="font-sans">默认</span>
                </button>
                <button 
                  className={`px-4 py-2 border rounded-md ${fontFamily === 'serif' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                  onClick={() => setFontFamily('serif')}
                >
                  <span className="font-serif">衬线</span>
                </button>
                <button 
                  className={`px-4 py-2 border rounded-md ${fontFamily === 'sans-serif' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                  onClick={() => setFontFamily('sans-serif')}
                >
                  <span className="font-sans">无衬线</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* 个人信息面板 */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">个人信息</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  className="flex-1 border border-gray-300 rounded-md py-2 px-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button 
                  className="py-2 px-4 bg-blue-500 text-white rounded-md"
                  onClick={handleSaveName}
                >
                  保存
                </button>
              </div>
            </div>
            
            {/* 可以添加更多个人信息设置 */}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default My;
