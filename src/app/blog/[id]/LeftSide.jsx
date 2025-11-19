"use client"
import { useState, useEffect } from 'react'
import { addBlogLike } from '@/service/blog'

export default function LeftSide(props) {
  const {
    likeNum,
    id
  } = props

  const [likeNumIn, setLikeNumIn] = useState(likeNum ?? 0)
  const [toc, setToc] = useState([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    // 获取所有的 h2 和 h3 标签
    const headings = document.querySelectorAll('h2, h3')
    const tocItems = Array.from(headings).map((heading, index) => {
      if (!heading.id) {
        const text = heading.textContent
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\u4e00-\u9fa5-]/g, '')
        heading.id = `${text}-${index}`
      }
      return {
        id: heading.id,
        text: heading.textContent,
        level: parseInt(heading.tagName.substring(1))
      }
    })
    setToc(tocItems)

    const handleScroll = () => {
      let currentActiveId = '';
      const scrollPosition = window.scrollY;

      // 找出当前视口中最上方的标题
      for (const heading of headings) {
        const element = heading;
        const { top } = element.getBoundingClientRect();
        const offset = scrollPosition + top;

        if (scrollPosition >= offset - 100) {  // 100px 的偏移量，可以根据需要调整
          currentActiveId = element.id;
        }
      }

      setActiveId(currentActiveId);
    };

    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll);
    // 初始化时执行一次
    handleScroll();

    // 清理函数
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  const onClickLike = () => {
    setLikeNumIn(likeNumIn + 1)
    addBlogLike({ id: Number(id), num: 1 })
  }

  const scrollToHeading = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      // 更新 URL，但不触发页面跳转
      history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <div className='flex flex-col mr-4'>
      {toc.length > 0 ? (
        <div className="bg-white/95 rounded-xl border border-slate-200 p-4 max-w-sm min-w-[200px] shadow-sm backdrop-blur-sm transition-all duration-300">
          <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
            目录
          </h3>
          <nav className="space-y-1">
            {toc.map((item, index) => (
              <a
                key={index}
                href={`#${item.id}`}
                onClick={(e) => scrollToHeading(e, item.id)}
                className={`block py-1.5 px-2 rounded-md transition-all duration-300 ease-in-out ${item.level === 3 ? 'ml-5 text-sm' : 'text-base'}
                  } ${activeId === item.id 
                    ? 'bg-blue-50 text-blue-700 font-medium pl-3 border-l-2 border-blue-500' 
                    : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:pl-3'}
                  `}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      ) : (
        <div className="bg-white/95 rounded-xl border border-slate-200 p-4 max-w-sm min-w-[200px] shadow-sm backdrop-blur-sm transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="w-5 h-5 bg-slate-200 rounded animate-pulse mr-2"></div>
            <div className="h-6 w-24 bg-slate-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse ml-5"></div>
            <div className="h-4 w-4/5 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse ml-5"></div>
            <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>
      )}
      <div className='flex justify-end'>
        <div className="relative mt-4 cursor-pointer w-10 h-10 bg-white/95 border border-slate-200 rounded-full flex items-center justify-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-50 hover:text-blue-600 active:scale-95" onClick={onClickLike}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
          </svg>
          <span className='w-6 h-6 absolute -top-2 -right-2 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center shadow-md'>
            {likeNumIn}
          </span>
        </div>
      </div>

    </div>
  );
}

