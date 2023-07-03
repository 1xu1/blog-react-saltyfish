import React from 'react';
import {getFormatTime} from '@/lib/time.js'
import Link from 'next/link'

export default function BlogBlock(props) {

  const {
    blogTitle,
    blogContent,
    blogTime,
    blogId
  } = props

  return (
    <div className="w-full border-y bg-white hover:shadow">
      <div className='max-w-2xl w-full mx-auto'>
        <Link className='text-2xl font-semibold cursor-pointer' href={`/blog/article/${blogId}`}>{blogTitle}</Link>
        <p className='text-sm text-slate-600'>{getFormatTime(blogTime)}</p>
        <div className='text-base font-normal'>{blogContent}</div>
      </div>
    </div>
  );
}