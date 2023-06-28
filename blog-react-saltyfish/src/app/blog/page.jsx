"use client"

import Image from 'next/image'

import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'

import BlogBlock from './BlogBlock'
import LableCloud from './LableCloud'
import { useEffect } from 'react'

import { getBlogList, getBlogLabels } from '@/service/blog.js'

export default async function Page() {

  const projects = await initAll();

  return (
    <MainLayout>
      <main className="flex min-h-screen flex-row justify-between">
        <div className='max-lg:hidden w-1/4 cursor-pointer	'>
          <LableCloud
            labels={[{
              name: '测试',
              num: 12
            }]}
            onClickLable={() => { }}
          />
        </div>
        <div className="w-full flex flex-col">
          <BlogBlock />
        </div>
        <div>

        </div>
      </main>
    </MainLayout>
  )
}

// `app` directory

// This function can be named anything
async function initAll() {
  const res = await fetch(`/api/blog/getBlogList`, { cache: 'no-store' });
  console.log('---res',res)
  const projects = await res.json();

  return projects;
}
