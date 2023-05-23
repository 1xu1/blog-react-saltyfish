import React, { useState, useEffect } from 'react';

export default function BlogBlock(props) {
  const [state, setState] = useState(0);

  const {

  } = props

  return (
    <div className="w-full border-y bg-white hover:shadow">
    <div className='max-w-2xl w-full mx-auto'>
      <p className=' text-2xl font-semibold'>标题</p>
      <p className='text-sm text-slate-600'>星期三,2023/5/10</p>
      <div className=' text-base font-normal'>文章内容</div>
    </div>
    </div>
  );
}