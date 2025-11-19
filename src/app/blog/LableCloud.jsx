import React from 'react';
import { getData as getLabelData } from '@/app/api/blog/getBlogLabels/route.js'
import TechBadge from '@/components/Badge/TechBadge.jsx'

async function getData() {
  try {
    const result = await getLabelData()
    return result
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export default async function LableCloud() {
  const labels = await getData() || []

  return (
    <div className="group sticky top-4 z-20 w-full overflow-hidden rounded-xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-lg">
      
      {/* 2. 左侧装饰线条：默认灰色，Hover 时变为强调色 (Indigo) */}
      <div className="absolute left-0 top-0 h-full w-1 bg-slate-200 transition-colors duration-300 group-hover:bg-indigo-500" />

      <div className="pl-2">
        {/* 3. 标题区域：增加图标，调整字号 */}
        <div className="mb-5 flex items-center gap-2">
          {/* 装饰性图标：Tag Icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="h-5 w-5 text-slate-400 transition-colors group-hover:text-indigo-500"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
          </svg>
          
          <h3 className="text-lg font-bold text-slate-800 transition-colors group-hover:text-indigo-900">
            标签云
          </h3>
        </div>

        {/* 4. 标签列表：间距微调 */}
        <div className="flex flex-wrap gap-2">
          {labels.map((label, index) => {
            return (
              <TechBadge 
                key={label.name || index} 
                text={label?.name ?? ''} 
                index={index}
                href={`/blog/t/${label.name}`} 
                isClickable={true} 
                count={label?.num ?? 0}
                // 这里可以传入额外的 className 给 TechBadge 组件，让它更适配白色背景
                // 例如：bg-slate-100 (如果组件支持的话)
                className="mr-0" // 移除原本的 mr-2，改为父级 flex gap 控制，布局更整齐
              />
            )
          })}
        </div>
      </div>

    </div>
  );
}