import React from 'react';
import Link from 'next/link'

export default function LableCloud(props) {

  const {
    labels
  } = props

  return (
    <div className="w-full border bg-white p-4 rounded-md	">
      <div>
        <p className=' text-2xl font-semibold mb-2'>标签云</p>
        <div className='flex flex-row flex-wrap gap-y-2'>
          {labels.map(label => {
            return (
              <Link href={`/blog/t/${label.name}`} key={label.name} className=' me-2 p-1 hover:bg-slate-100 rounded-md transition duration-300 ease-in-out border'>
                <span>{`${label?.name ?? ''}`}</span>
                <span>{`${label?.num ?? ''}`}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}