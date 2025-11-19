import React from 'react';

// 1. 升级颜色配置
// 每个配置包含：icon颜色、Hover时的文字颜色、Hover时的背景色、Hover时的边框色
const colorVariants = [
  { icon: 'text-red-400', hoverText: 'group-hover:text-red-600', hoverBg: 'hover:bg-red-50', hoverBorder: 'hover:border-red-200' },
  { icon: 'text-orange-400', hoverText: 'group-hover:text-orange-600', hoverBg: 'hover:bg-orange-50', hoverBorder: 'hover:border-orange-200' },
  { icon: 'text-amber-400', hoverText: 'group-hover:text-amber-600', hoverBg: 'hover:bg-amber-50', hoverBorder: 'hover:border-amber-200' },
  { icon: 'text-green-400', hoverText: 'group-hover:text-green-600', hoverBg: 'hover:bg-green-50', hoverBorder: 'hover:border-green-200' },
  { icon: 'text-teal-400', hoverText: 'group-hover:text-teal-600', hoverBg: 'hover:bg-teal-50', hoverBorder: 'hover:border-teal-200' },
  { icon: 'text-blue-400', hoverText: 'group-hover:text-blue-600', hoverBg: 'hover:bg-blue-50', hoverBorder: 'hover:border-blue-200' },
  { icon: 'text-indigo-400', hoverText: 'group-hover:text-indigo-600', hoverBg: 'hover:bg-indigo-50', hoverBorder: 'hover:border-indigo-200' },
  { icon: 'text-purple-400', hoverText: 'group-hover:text-purple-600', hoverBg: 'hover:bg-purple-50', hoverBorder: 'hover:border-purple-200' },
  { icon: 'text-pink-400', hoverText: 'group-hover:text-pink-600', hoverBg: 'hover:bg-pink-50', hoverBorder: 'hover:border-pink-200' },
];

const getRandomVariant = (index) => {
  return colorVariants[index % colorVariants.length];
};

export default function TechBadge({ text, index = 0, href, isClickable = false, count, className = "" }) {
  const variant = getRandomVariant(index);

  // 基础样式：确保文字垂直居中，过渡平滑
  // group 类用于控制内部元素（如 # 号）随父元素 hover 变化
  const baseClasses = "group inline-flex items-center text-xs font-medium transition-all duration-300 ease-out";
  
  const getVariantClasses = () => {
    if (isClickable) {
      // 可点击样式 (Tag Cloud / Blog List)
      // 默认：bg-slate-50 (极淡灰), border-slate-200 (淡灰边框), text-slate-600 (深灰字)
      // Hover：加载对应的 variant 颜色
      return `
        px-3 py-1.5 rounded-full border shadow-sm cursor-pointer
        bg-slate-50 border-slate-200 text-slate-600
        ${variant.hoverBg} ${variant.hoverBorder} ${variant.hoverText}
        hover:shadow-md hover:-translate-y-0.5
      `;
    } else {
      // 不可点击徽章样式 (用于展示，不强调交互)
      // 稍微加深一点背景 bg-slate-100，保持稳重
      return "px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-transparent ring-1 ring-slate-900/5 cursor-default";
    }
  };
  
  // 合并 className
  // 注意：移除原来的 flex gap 控制，由外部或 className 传入
  const classes = `${baseClasses} ${getVariantClasses()} ${className}`;

  const renderContent = () => {
    return (
      <>
        {isClickable && (
          // # 号样式
          // 默认显示彩色 (variant.icon)，Hover时可能随文字变深，或者保持原样
          //mr-1.5: 给文字留点距离
          <span className={`mr-1 font-bold opacity-80 ${variant.icon} group-hover:opacity-100`}>
            #
          </span>
        )}
        
        <span className="relative z-10">{text}</span>
        
        {count !== undefined && (
          // 数量样式
          // 默认淡灰色，Hover时稍微变深
          <span className="ml-1.5 text-[10px] text-slate-400 group-hover:text-slate-500 bg-white/50 px-1 rounded-md">
            {count}
          </span>
        )}
      </>
    );
  };

  if (isClickable && href) {
    return (
      <a className={classes} href={href}>
        {renderContent()}
      </a>
    );
  }

  return (
    <span className={classes}>
      {renderContent()}
    </span>
  );
}