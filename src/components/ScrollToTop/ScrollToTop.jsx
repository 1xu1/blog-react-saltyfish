"use client"
import React, { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toTop = () => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  };

  // 监听滚动事件，当滚动超过300px时显示按钮
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <span 
      onClick={toTop} 
      className="fixed bottom-8 right-8 p-3 bg-gray-800/80 backdrop-blur-md rounded-full shadow-lg cursor-pointer hover:bg-gray-700/90 transition-all duration-300 z-50"
      aria-label="滚动到顶部"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-6 h-6 text-white"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
    </span>
  );
}