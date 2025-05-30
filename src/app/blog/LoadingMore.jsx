"use client"

import { getBlogList } from '@/service/blog.js'
import { useEffect, useState } from 'react';
// import { debounce } from '@/lib/utils.js';
import BlogBlock from './BlogBlock'
import message from "@/components/Notifications/Message";

export default function LoadingMore(props) {
  const [blogList, setBlogContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1)
  // const [refresh, setRefresh] = useState(false)
  const {
    firstLoadingSize,
    label
  } = props

  // useEffect(() => {
  //   setBlogContent([])
  //   window.onscrollend = () => {
  //     if (isScrollButtom()) {
  //       setRefresh(prevValue => {
  //         return !prevValue
  //       })
  //     }
  //   };
  // }, [])

  // 加载事件
  // useEffect(() => {
  //   if (loading) return
  //   loadingEvent()
  // }, [refresh])

  // 加载事件
  useEffect(() => {
    setPageNum(1)
    setBlogContent([])
  }, [label])

  const loadingSkeleton = () => {
    const content = []
    for (let i = 0; i < firstLoadingSize; i++) {
      content.push(<div key={`loadingMore-index${i}`} className="w-full border-y bg-white hover:shadow p-5 mb-2">
        <div className="animate-pulse flex max-w-2xl w-full mx-auto">
          <div className="flex-1 space-y-3 py-1">
            <div className="h-4 w-40 bg-slate-200 rounded"></div>
            <div className="h-2 w-36 bg-slate-200 rounded"></div>
            <div className="h-2 w-72 bg-slate-200 rounded"></div>
            <div className="h-2 w-32 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>)
    }
    return content
  }

  const loadingEvent = () => {
    setLoading(true)
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
  }

  return <>
    {blogList.map(blog => {
      return <BlogBlock
        blog={blog}
        key={blog.id}
      />
    })}
    {
      loading && loadingSkeleton()
    }
    {
      !loading &&
      <span className='mx-auto cursor-pointer p-2 bg-white' onClick={loadingEvent}>加载更多</span>
    }
  </>
}