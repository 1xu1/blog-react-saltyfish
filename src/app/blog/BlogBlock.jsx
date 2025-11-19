import React from 'react';
import { getFormatTime } from '@/lib/time.js'
import Link from 'next/link'
import TechBadge from '@/components/Badge/TechBadge.jsx'

export default function BlogBlock(props) {

  const {
    blogTitle,
    blogTime,
    id,
    blogLabel,
    blogRead,
    blogLike
  } = props.blog

  const blogLabelArr = blogLabel.split("#").filter(i => i)

  return (
    <article className="group relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-md">

      <div className="absolute left-0 top-0 h-full w-1 bg-slate-200 transition-colors duration-300 group-hover:bg-indigo-500" />

      <div className="flex flex-col gap-4 pl-2">

        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-800 transition-colors group-hover:text-indigo-600 md:text-xl leading-tight">
            <Link href={`/blog/${id}`} className="focus:outline-none">
              {blogTitle}
            </Link>
          </h2>

          <Link href={`/blog/${id}`} className="focus:outline-none">
            <div className="flex h-8 w-8 flex-shrink-0 -translate-x-2 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </div>
          </Link>
        </div>

        <div className="relative z-10 flex flex-wrap gap-2">
          {blogLabelArr.map((item, index) => (
            <TechBadge
              key={index}
              text={item}
              href={`/blog/t/${item}`}
              isClickable={true}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 border-t border-slate-300 pt-3 text-xs font-medium text-slate-500">
          <time dateTime={blogTime}>{getFormatTime(blogTime)}</time>

          <span className="h-0.5 w-0.5 rounded-full bg-slate-300"></span>

          <div className="flex items-center gap-1" title="阅读量">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            {blogRead}
          </div>

          <div className="flex items-center gap-1" title="点赞数">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            {blogLike}
          </div>
        </div>

      </div>
    </article>
  );
}