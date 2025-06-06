import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useDiaryStore from '../../store/diaryStore';

const Home = () => {
  const { diaries } = useDiaryStore();
  const [groupedDiaries, setGroupedDiaries] = useState({});

  // 按日期分组日记
  useEffect(() => {
    const grouped = diaries.reduce((acc, diary) => {
      const date = diary.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(diary);
      return acc;
    }, {});

    // 按日期排序（从新到旧）
    const sortedGrouped = Object.keys(grouped)
      .sort((a, b) => new Date(b) - new Date(a))
      .reduce((acc, date) => {
        acc[date] = grouped[date];
        return acc;
      }, {});

    setGroupedDiaries(sortedGrouped);
  }, [diaries]);

  // 格式化日期显示
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
    
    const today = new Date();
    const isToday = today.toDateString() === date.toDateString();
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = yesterday.toDateString() === date.toDateString();
    
    if (isToday) {
      return `今天 (${month}月${day}日 ${weekday})`;
    } else if (isYesterday) {
      return `昨天 (${month}月${day}日 ${weekday})`;
    } else {
      return `${year}年${month}月${day}日 ${weekday}`;
    }
  };

  // 显示日记的心情图标
  const getMoodIcon = (mood) => {
    switch (mood) {
      case 'happy':
        return '😊';
      case 'sad':
        return '😢';
      case 'angry':
        return '😠';
      case 'excited':
        return '😃';
      case 'neutral':
      default:
        return '😐';
    }
  };

  // 获取天气图标
  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'sunny':
        return '☀️';
      case 'cloudy':
        return '☁️';
      case 'rainy':
        return '🌧️';
      case 'snowy':
        return '❄️';
      default:
        return '🌤️';
    }
  };

  return (
    <div className="pb-16 pt-4">
      <div className="px-4 mb-6">
        <h1 className="text-2xl font-bold">我的日记</h1>
      </div>

      {Object.keys(groupedDiaries).length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 mb-4">还没有日记，开始写第一篇吧！</p>
          <Link 
            to="/editor"
            className="py-2 px-4 bg-blue-500 text-white rounded-lg"
          >
            写日记
          </Link>
        </div>
      ) : (
        Object.entries(groupedDiaries).map(([date, diariesForDate]) => (
          <div key={date} className="mb-6">
            <div className="px-4 py-2 bg-gray-100">
              <h2 className="font-medium">{formatDate(date)}</h2>
            </div>
            
            <div className="px-4">
              {diariesForDate.map(diary => (
                <Link
                  to={`/editor/${diary.id}`}
                  key={diary.id}
                  className="block border-b border-gray-200 py-4"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg mb-1">
                      {diary.title || '无标题'}
                    </h3>
                    <div className="flex space-x-1">
                      <span>{getMoodIcon(diary.mood)}</span>
                      <span>{getWeatherIcon(diary.weather)}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 line-clamp-2">{diary.content || '无内容'}</p>
                  
                  {diary.tags && diary.tags.length > 0 && (
                    <div className="flex flex-wrap mt-2 gap-1">
                      {diary.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
