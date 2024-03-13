"use client"

import React from 'react';
import Button from "@/components/Button/Button";
import { addBlog } from '@/service/blog.js'
import message from "@/components/Notifications/Message";

export default function Operate() {
  const createBlog = () => {
    const param = {
      blogContent: '新增博文，请在此编辑',
      blogTitle: '新增博文',
      blogLabel: '#新增'
    }
    addBlog(param)
      .then(() => {
        message.success('新增博文成功')
      })
  }

  return (
    <div className='flex justify-start flex-row w-[1000px] my-5'><Button className="m-2" onClick={createBlog}>新建</Button></div>
  );
}