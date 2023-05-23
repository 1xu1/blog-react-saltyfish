import React, { useState, useEffect } from 'react';

export default function BlogBlock(props) {
  const [state, setState] = useState(0);

  const {
    labels,
    onClickLable
  } = props

  return (
    <div className="w-full border bg-white">
      <div>
        <p className=' text-2xl font-semibold'>标签云</p>
        <div className='flex flex-row flex-wrap'>
          {labels.map(label => {
            return (
              <a onClick={onClickLable} className='text-sm p-px border rounded-lg border-cyan-500 hover:border-cyan-50'>
                <span className='text-cyan-500'>{`${label?.name ?? ''}`}</span>
                <span className='text-cyan-500'>{`${label?.num ?? ''}`}</span>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  );
}