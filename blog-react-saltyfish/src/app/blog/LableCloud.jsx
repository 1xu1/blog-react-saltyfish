import React from 'react';

export default function LableCloud(props) {

  const {
    labels
  } = props

  return (
    <div className="w-full border bg-white">
      <div>
        <p className=' text-2xl font-semibold'>标签云</p>
        <div className='flex flex-row flex-wrap'>
          {labels.map(label => {
            return (
              <a key={label.name} className='text-sm p-px border rounded-lg border-cyan-500 hover:border-cyan-50'>
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