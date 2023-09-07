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
              <a key={label.name} className=' me-2 p-1 hover:bg-slate-100 rounded-md transition duration-300 ease-in-out'>
                <span>{`${label?.name ?? ''}`}</span>
                <span>{`${label?.num ?? ''}`}</span>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  );
}