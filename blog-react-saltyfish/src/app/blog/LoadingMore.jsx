"use client"

import { getBlogList } from '@/service/blog.js'
import { useEffect } from 'react';
import {isScrollButtom} from '@/lib/utils.js';

export default function LoadingMore(props) {
  const [blogList, setBlogContent] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    firstLoadingSize
  } = props

  useEffect(()=>{
    window.onscroll = () => {
      if(isScrollButtom()){

      }
    };
  },[])

  return <>
    {blogList.map(blog => {
      return <BlogBlock
        blogTitle={blog.blogTitle}
        blogContent={blog.blogContent}
        blogTime={blog.blogTime}
        blogId={blog.id}
        key={blog.id}
      />
    })}
  </>
}