"use client"

import { getBlogList } from '@/service/blog.js'
import { useEffect, useState } from 'react';
import { isScrollButtom } from '@/lib/utils.js';
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
    window.onscroll = () => {
      if (isScrollButtom()) {
        setRefresh(prevValue => {
          return !prevValue
        })
      }
    };
  }, [])

  // 加载事件
  useEffect(() => {
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
  }, [refresh])

  return <>
    {blogList.map(blog => {
      return <BlogBlock
        blog={blog}
        key={blog.id}
      />
    })}
  </>
}