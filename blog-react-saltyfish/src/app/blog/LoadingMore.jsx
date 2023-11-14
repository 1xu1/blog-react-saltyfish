"use client"

import { getBlogList } from '@/service/blog.js'
import { useEffect, useState } from 'react';
import { isScrollButtom, debounce } from '@/lib/utils.js';
import BlogBlock from './BlogBlock'
import message from "@/components/Notifications/Message";

export default function LoadingMore(props) {
  const [blogList, setBlogContent] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1)
  const [refresh, setRefresh] = useState(false)
  const {
    firstLoadingSize,
    searchParams
  } = props
  const { label } = searchParams

  useEffect(() => {
    window.onscrollend = () => {
      if (isScrollButtom()) {
        setRefresh(prevValue => {
          return !prevValue
        })
      }
    };
  }, [])

  // 加载事件
  useEffect(() => {
    if(loading) return
    setLoading(true)
    loadingEvent()
  }, [refresh])

  const loadingEvent = debounce(() => {
    getBlogList({
      limit: firstLoadingSize,
      offset: firstLoadingSize * pageNum,
      label: label
    })
      .then(res => {
        if (res.data.length === 0) {
          message.info('没有更多内容啦！')
        }
        else {
          setPageNum(pageNum + 1)
          setBlogContent(blogList.concat(res.data))
        }
      })
      .finally(() => {
        setLoading(false)
      })
  })

  return <>
    {blogList.map(blog => {
      return <BlogBlock
        blog={blog}
        key={blog.id}
      />
    })}
    {
      loading && <div class="w-full border-y bg-white hover:shadow p-5 mb-2">
        <div class="animate-pulse flex max-w-2xl w-full mx-auto">
          <div class="flex-1 space-y-3 py-1">
            <div class="h-4 w-40 bg-slate-200 rounded"></div>
            <div class="h-2 w-36 bg-slate-200 rounded"></div>
            <div class="h-2 w-72 bg-slate-200 rounded"></div>
            <div class="h-2 w-32 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    }
  </>
}