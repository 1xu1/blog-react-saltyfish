'use client'
import React, { useEffect } from 'react';
import { addRead } from '@/service/blog.js'

export default function WebsiteCounter(props) {

  const {
    id
  } = props

  useEffect(() => {
    const now = new Date()
    const storageTime = localStorage.getItem(`visitTime-${id}`)
    if (storageTime) {
      if (now.getTime() - Number(storageTime) > (1000 * 3600 * 24)) {
        addRead({id})
      }
    } else {
      addRead({id})
    }
    localStorage.setItem(`visitTime-${id}`, JSON.stringify(now.getTime()))
  }, [])

  return (
    <></>
  );
}