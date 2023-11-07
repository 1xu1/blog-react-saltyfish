'use client'
import React, { useEffect } from 'react';
import { addRead } from '@/service/blog.js'

export default function WebsiteCounter() {

  useEffect(() => {
    const now = new Date()
    const storageTime = localStorage.getItem('visitTime')
    if (storageTime) {
      if (now.getTime() - Number(storageTime) > (1000 * 3600 * 24)) {
        addRead()
      }
    } else {
      addRead()
    }
    localStorage.setItem('visitTime', JSON.stringify(now.getTime()))
  }, [])

  return (
    <></>
  );
}