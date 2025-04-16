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
      {toc.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-md max-w-sm">
          <h3 className="text-lg font-bold mb-2">目录</h3>
          <nav>
            {toc.map((item, index) => (
              <a
                key={index}
                href={`#${item.id}`}
                onClick={(e) => scrollToHeading(e, item.id)}
                className={`block hover:text-blue-500 ${item.level === 3 ? 'ml-4' : ''
                  } mb-2 ${activeId === item.id ? 'text-blue-500 font-medium' : 'text-gray-700'
                  }`}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      )}
      <div className='flex justify-end'>
        <div className="relative mt-4 cursor-pointer w-8 h-8 bg-white p-2 flex items-center justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-400" onClick={onClickLike}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
          </svg>
          <span className=' w-5 h-5 absolute -top-2 -right-2 rounded-full bg-red-700 text-white text-sm align-middle text-center select-none'>
            {likeNumIn}
          </span>
        </div>
      </div>

    </div>
  );
}

