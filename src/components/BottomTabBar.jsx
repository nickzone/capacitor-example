import { Link, useLocation } from 'react-router-dom';

const BottomTabBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // 判断当前路径来应用活跃状态
  const isActive = (path) => {
    if (path === '/home' && (currentPath === '/' || currentPath === '/home')) {
      return true;
    }
    return currentPath.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center shadow-lg">
      <div className="flex w-full safe-area-x safe-bottom">
        <Link 
          to="/home" 
          className={`flex flex-col items-center justify-center w-1/3 py-1 ${
            isActive('/home') ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span className="text-xs mt-1">首页</span>
        </Link>
        <Link 
          to="/editor" 
          className={`flex flex-col items-center justify-center w-1/3 py-1 ${
            isActive('/editor') ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          <span className="text-xs mt-1">写日记</span>
        </Link>
        <Link 
          to="/my" 
          className={`flex flex-col items-center justify-center w-1/3 py-1 ${
            isActive('/my') ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span className="text-xs mt-1">我的</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomTabBar;
