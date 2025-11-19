"use client"

import { getBlogList } from '@/service/blog.js'
import { useEffect, useState, useCallback, useRef } from 'react';
import { debounce, isScrollButtom } from '@/lib/utils.js';
import BlogBlock from './BlogBlock'
import message from "@/components/Notifications/Message";

export default function LoadingMore(props) {
  const [blogList, setBlogContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true); // 标记是否还有更多内容
  const { firstLoadingSize, label } = props;
  const observerTargetRef = useRef(null); // 用于Intersection Observer的目标元素

  // 当label变化时，重置状态
  useEffect(() => {
    setPageNum(1);
    setBlogContent([]);
    setHasMore(true);
  }, [label]);

  // 加载更多文章的核心逻辑
  const loadingEvent = useCallback(() => {
    // 如果正在加载或没有更多内容，则不执行
    if (loading || !hasMore) return;

    setLoading(true);
    getBlogList({
      limit: firstLoadingSize,
      offset: firstLoadingSize * pageNum,
      label: label
    })
      .then(res => {
        if (res.data.length === 0) {
          setHasMore(false);
          // 只在确实没有更多内容时才显示提示
          if (blogList.length > 0) {
            message.info('没有更多内容啦！');
          }
        } else {
          setPageNum(prevPageNum => prevPageNum + 1);
          setBlogContent(prevList => prevList.concat(res.data));
        }
      })
      .catch(error => {
        message.error('加载失败，请稍后重试');
        console.error('加载文章失败:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading, hasMore, pageNum, firstLoadingSize, label, blogList.length]);

  // 使用Intersection Observer实现滚动加载
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 当目标元素进入视口且不在加载状态且还有更多内容时，触发加载
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadingEvent();
        }
      },
      {
        rootMargin: '0px 0px 100px 0px', // 提前100px触发加载
        threshold: 0.1
      }
    );

    const target = observerTargetRef.current;
    if (target) {
      observer.observe(target);
    }

    // 清理函数
    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [loading, hasMore, loadingEvent]);

  // 备用的滚动监听实现（使用debounce优化性能）
  const handleScroll = useCallback(
    debounce(() => {
      if (isScrollButtom() && !loading && hasMore) {
        loadingEvent();
      }
    }, 200), // 200ms防抖延迟
    [loading, hasMore, loadingEvent]
  );

  // 添加滚动事件监听
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // 加载骨架屏
  const loadingSkeleton = () => {
    const content = [];
    for (let i = 0; i < firstLoadingSize; i++) {
      content.push(
        <article key={`loadingMore-index${i}`} className="group relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur-sm transition-all duration-300">
          <div className="absolute left-0 top-0 h-full w-1 bg-slate-200"></div>
          <div className="flex flex-col gap-4 pl-2">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-slate-800 leading-tight animate-pulse">
                <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
              </h2>
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-50">
                <div className="h-4 w-4 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2 animate-pulse">
              <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
              <div className="h-6 w-24 bg-slate-200 rounded-full"></div>
              <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-100 pt-3 text-xs font-medium text-slate-500 animate-pulse">
              <div className="h-4 w-24 bg-slate-200 rounded"></div>
              <span className="h-0.5 w-0.5 rounded-full bg-slate-300"></span>
              <div className="flex items-center gap-1">
                <div className="h-3.5 w-3.5 bg-slate-200 rounded"></div>
                <div className="h-4 w-8 bg-slate-200 rounded"></div>
              </div>
              <span className="h-0.5 w-0.5 rounded-full bg-slate-300"></span>
              <div className="flex items-center gap-1">
                <div className="h-3.5 w-3.5 bg-slate-200 rounded"></div>
                <div className="h-4 w-8 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </article>
      );
    }
    return content;
  };

  return (
    <>

      {blogList.map(blog => (
        <BlogBlock
          blog={blog}
          key={blog.id}
        />
      ))}


      {/* 加载骨架屏 */}
      {loading && loadingSkeleton()}

      {/* 用于Intersection Observer的目标元素 */}
      <div ref={observerTargetRef} className="h-10 w-full"></div>
      {/* 手动加载更多按钮（当没有更多内容时隐藏） */}
      {!loading && hasMore && (
        <div className="flex justify-center my-4">
          <button
            onClick={loadingEvent}
            className="cursor-pointer px-6 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            加载更多
          </button>
        </div>
      )}

      {/* 没有更多内容的提示 */}
      {!hasMore && blogList.length > 0 && (
        <div className="flex justify-center my-4 text-gray-100">
          <span>没有更多内容啦！</span>
        </div>
      )}
    </>
  );
}