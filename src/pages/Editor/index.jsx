import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useDiaryStore from '../../store/diaryStore';
import useSettingsStore from '../../store/settingsStore';

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { 
    currentDiary, 
    resetCurrentDiary, 
    loadDiaryById, 
    updateCurrentDiary,
    saveDiary
  } = useDiaryStore();
  
  const { fontSize, fontFamily } = useSettingsStore();
  
  const [tagInput, setTagInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // 页面加载时，根据ID判断是新建还是编辑
  useEffect(() => {
    if (id) {
      // 编辑已有日记
      const diary = loadDiaryById(id);
      if (!diary) {
        navigate('/editor'); // 如果找不到对应ID的日记，跳转到创建新日记页面
      }
    } else if (!currentDiary.id) {
      // 创建新日记
      resetCurrentDiary();
    }
  }, [id, loadDiaryById, navigate, resetCurrentDiary, currentDiary.id]);
  
  // 页面离开时自动保存
  useEffect(() => {
    const handleBeforeUnload = () => {
      // 如果有内容但未保存，则自动保存
      if (currentDiary.title || currentDiary.content) {
        saveDiary();
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentDiary, saveDiary]);
  
  // 提交表单
  const handleSubmit = () => {
    setIsSaving(true);
    saveDiary();
    setIsSaving(false);
    
    // 保存后返回首页
    navigate('/home');
  };
  
  // 添加标签
  const handleAddTag = () => {
    if (tagInput && !currentDiary.tags.includes(tagInput)) {
      updateCurrentDiary('tags', [...currentDiary.tags, tagInput]);
      setTagInput('');
    }
  };
  
  // 移除标签
  const handleRemoveTag = (tagToRemove) => {
    updateCurrentDiary('tags', currentDiary.tags.filter(tag => tag !== tagToRemove));
  };
  
  // 根据设置应用字体大小
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      case 'medium':
      default: return 'text-base';
    }
  };
  
  // 根据设置应用字体
  const getFontFamilyClass = () => {
    switch (fontFamily) {
      case 'serif': return 'font-serif';
      case 'sans-serif': return 'font-sans';
      case 'default':
      default: return '';
    }
  };
  
  return (
    <div className="pb-20 pt-4">
      <div className="px-4 mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {id ? '编辑日记' : '新日记'}
        </h1>
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-lg"
          onClick={handleSubmit}
          disabled={isSaving}
        >
          {isSaving ? '保存中...' : '保存'}
        </button>
      </div>
      
      <div className="px-4 space-y-4">
        {/* 日期选择 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">日期</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md py-2 px-3"
            value={currentDiary.date}
            onChange={(e) => updateCurrentDiary('date', e.target.value)}
          />
        </div>
        
        {/* 标题 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md py-2 px-3"
            placeholder="今天的标题"
            value={currentDiary.title}
            onChange={(e) => updateCurrentDiary('title', e.target.value)}
          />
        </div>
        
        {/* 心情 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">心情</label>
          <div className="flex space-x-4">
            {['neutral', 'happy', 'sad', 'excited', 'angry'].map(mood => (
              <button
                key={mood}
                className={`p-2 rounded-full ${currentDiary.mood === mood ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100'}`}
                onClick={() => updateCurrentDiary('mood', mood)}
              >
                {mood === 'neutral' && '😐'}
                {mood === 'happy' && '😊'}
                {mood === 'sad' && '😢'}
                {mood === 'excited' && '😃'}
                {mood === 'angry' && '😠'}
              </button>
            ))}
          </div>
        </div>
        
        {/* 天气 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">天气</label>
          <div className="flex space-x-4">
            {['sunny', 'cloudy', 'rainy', 'snowy'].map(weather => (
              <button
                key={weather}
                className={`p-2 rounded-full ${currentDiary.weather === weather ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100'}`}
                onClick={() => updateCurrentDiary('weather', weather)}
              >
                {weather === 'sunny' && '☀️'}
                {weather === 'cloudy' && '☁️'}
                {weather === 'rainy' && '🌧️'}
                {weather === 'snowy' && '❄️'}
              </button>
            ))}
          </div>
        </div>
        
        {/* 日记内容 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
          <textarea
            className={`w-full border border-gray-300 rounded-md py-2 px-3 min-h-[200px] ${getFontSizeClass()} ${getFontFamilyClass()}`}
            placeholder="今天发生了什么？"
            value={currentDiary.content}
            onChange={(e) => updateCurrentDiary('content', e.target.value)}
          />
        </div>
        
        {/* 标签 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">标签</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-md py-2 px-3"
              placeholder="添加标签"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <button
              className="py-2 px-3 bg-gray-200 rounded-md"
              onClick={handleAddTag}
            >
              添加
            </button>
          </div>
          
          {currentDiary.tags && currentDiary.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {currentDiary.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 rounded px-2 py-1 text-sm flex items-center"
                >
                  {tag}
                  <button
                    className="ml-1 text-blue-800"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
