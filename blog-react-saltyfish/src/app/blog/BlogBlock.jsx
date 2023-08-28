import React from 'react';
import {getFormatTime} from '@/lib/time.js'
import Link from 'next/link'

export default function BlogBlock(props) {

  const {
    blogTitle,
    blogTime,
    blogId,
    blogLabel
  } = props

  let blogLabelArr = blogLabel.split("#")

  return (
    <div className="w-full border-y bg-white hover:shadow p-5 mb-2">
      <div className='max-w-2xl w-full mx-auto'>
        <Link className='text-2xl font-semibold cursor-pointer' href={`/blog/${blogId}`}>{blogTitle}</Link>
        <p className='text-sm text-slate-600'>{getFormatTime(blogTime)}</p>
        <p>
          {blogLabelArr.map((item, index) => {
            return <span key={index}>{`#${item}`}</span>
          })}
        </p>
        <p>
          <span>阅读</span>
          <span>喜欢</span>
        </p>
        {/* <div className='text-base font-normal'>{blogContent}</div> */}
      </div>
    </div>
  );
}