"use client"

import "vditor/dist/index.css";
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import Vditor from "vditor";
import { getBlog, updateBlog } from '@/service/blog.js'
import { transBlogContent } from '@/lib/utils'

import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";


export default function BlogEditor(props) {
  const [vd, setVd] = useState(null);
  const [blogContent, setBlogContent] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogLabel, setBlogLabel] = useState('');
  const [blogVisibility, setBlogVisibility] = useState('');


  const router = useRouter()

  const {
    searchParams
  } = props

  const { id } = searchParams

  useEffect(() => {
    const vditor = new Vditor("vditor", {
      mode: 'sv',
      width: '80%'
    });
    setVd(vditor);

    if (!id) return

    getBlog({ id }).then(res => {
      const blog = res.data
      const blogContent = (transBlogContent(blog.blogContent))
      setBlogContent(blogContent)
      setBlogTitle(blog.blogTitle)
      setBlogLabel(blog.blogLabel)
      setBlogVisibility(blog.blogVisibility)
      vditor.setValue(blogContent)
    })
  }, []);

  const saveBlog = () => {
    const blogContent = vd.getValue()
    const param = {
      id: id,
      blogContent: blogContent,
      blogTitle: blogTitle,
      blogLabel: blogLabel
    }

    updateBlog(param)
      .then(res => {

      })
  }

  const addBlog = () =>{
    
  }

  return <MainLayout>
    <div className="flex flex-row justify-center md:w-auto bg-white py-5">
      <span className="max-w-xs mx-5"><Input label={'标题'} value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)}></Input></span>
      <span className="max-w-xs mx-5"><Input label={'标签'} value={blogLabel} placeholder={'#分割标签'} onChange={(e) => setBlogLabel(e.target.value)}></Input></span>
      <div className="flex justify-between items-center mx-5">
        <Button onClick={saveBlog} className="m-2">保存</Button>
        <Button className="m-2">发布</Button>
        <Button className="m-2">隐藏</Button>
        {!id && <Button className="m-2">新建</Button>}
      </div>
    </div>

    <div className="flex min-h-screen flex-row justify-center w-full md:w-auto">
      <div id="vditor" />
    </div>
  </MainLayout>;
}
