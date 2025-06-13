import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="mb-8">
        <svg
          className="w-24 h-24 text-gray-400 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-xl mb-6">页面未找到</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        抱歉，您访问的页面不存在或已被移除。
      </p>
      <Link
        to="/home"
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        返回首页
      </Link>
    </div>
  );
};

export default NotFound;
