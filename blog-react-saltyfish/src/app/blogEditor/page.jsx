"use client"

import "vditor/dist/index.css";
import { useState, useEffect } from "react"
import Vditor from "vditor";
import { Menu } from '@headlessui/react'

import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import Input from "@/components/Input/Input";

export default function Home() {
  const [vd, setVd] = useState(null);
  const [blogContent, setBlogContent] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogLabel, setBlogLabel] = useState('');


  useEffect(() => {
    const vditor = new Vditor("vditor", {
      after: () => {
        vditor.setValue("`Vditor` 最小代码示例");
        setVd(vditor);
      },
      mode: 'sv',
      width: '80%'
    });
  }, []);


  return <MainLayout>
    <p className="flex justify-start bg-white">
      <span className="mx-auto w-full max-w-xs"><Input label={'标题'}></Input></span>
      <span className="mx-auto w-full max-w-xs"><Input label={'标签'} placeholder={'#分割标签'}></Input></span>
      <button>保存</button>
      <button>发布</button>
      <button>新建</button>
    </p>

    <div className="flex min-h-screen flex-row justify-center w-full md:w-auto">
      <div id="vditor" />
    </div>
  </MainLayout>;
}
