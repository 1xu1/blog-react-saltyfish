"use client"
import React from 'react';
export default function ScrollToTop() {

  const toTop = () => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <span onClick={toTop} className=' fixed bottom-16 right-16 cursor-pointer'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </span>
  );
}