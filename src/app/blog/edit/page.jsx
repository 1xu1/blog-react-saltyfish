"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { getBlog, updateBlog, addBlog } from '@/service/blog.js'
import { transBlogContent } from '@/lib/utils'

import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import message from "@/components/Notifications/Message";

import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

export default function BlogEditor(props) {
  // eslint-disable-next-line no-unused-vars
  const [blogContent, setBlogContent] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogLabel, setBlogLabel] = useState('');
  const [blogVisibility, setBlogVisibility] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const router = useRouter()

  const {
    searchParams
  } = props

  const { id } = searchParams

  useEffect(() => {
    refreshBlog()
  }, []);

  const saveBlog = () => {
    const param = {
      id: id,
      blogContent: blogContent,
      blogTitle: blogTitle,
      blogLabel: blogLabel,
      blogVisibility: blogVisibility
    }
    if (!isLoading) {
      setIsLoading(true)
      updateBlog(param)
        .then(() => {
          message.success('保存成功')
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const onChangeBlogVis = (blogVisibility) => {
    const param = {
      id: id,
      blogVisibility: blogVisibility
    }
    if (!isLoading) {
      setIsLoading(true)
      updateBlog(param)
        .then((res) => {
          const msg = blogVisibility === 0 ? '隐藏成功' : '发布成功'
          setAllData(res.data)
          message.success(msg)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const setAllData = (blog) => {
    const blogContent = (transBlogContent(blog?.blogContent ?? ''))
    setBlogContent(blogContent)
    setBlogTitle(blog?.blogTitle ?? '')
    setBlogLabel(blog?.blogLabel ?? '')
    setBlogVisibility(blog?.blogVisibility)
  }

  const refreshBlog = () => {
    getBlog({ id }).then(res => {
      const blog = res.data
      setAllData(blog)
    })
  }

  const createBlog = () => {
    const param = {
      blogContent: '新增博文，请在此编辑',
      blogTitle: '新增博文',
      blogLabel: '#新增'
    }
    addBlog(param)
      .then(res => {
        message.success('新增博文成功')
        router.push('/blogEditor?id=' + res?.data?.id)
        router.refresh()
      })
  }

  return <MainLayout>
    <div className="h-full flex flex-col items-center justify-center">
      <div className="flex flex-row justify-center md:w-auto bg-white py-5 ">
        <span className="max-w-xs mx-5"><Input label={'标题'} value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)}></Input></span>
        <span className="max-w-xs mx-5"><Input label={'标签'} value={blogLabel} placeholder={'#分割标签'} onChange={(e) => setBlogLabel(e.target.value)}></Input></span>
        <div className="flex justify-between items-center mx-5 space-x-4">
          <Button onClick={saveBlog} className="m-2">保存</Button>
          {blogVisibility === 0 && <Button onClick={() => onChangeBlogVis(1)} className="m-2">发布</Button>}
          {blogVisibility === 1 && <Button onClick={() => onChangeBlogVis(0)} className="m-2">隐藏</Button>}
          <Button className="m-2" onClick={createBlog}>新建</Button>
        </div>
      </div>
      <div className="max-w-screen-xl">
        <MdEditor modelValue={blogContent} onChange={setBlogContent} onSave={saveBlog} style={{ height: '80vh' }} />
      </div>
    </div>
  </MainLayout>;
}
