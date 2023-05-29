"use client"

import Image from 'next/image'

import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'

import BlogBlock from './BlogBlock'
import LableCloud from './LableCloud'
import { useEffect } from 'react'

import { getBlogList } from '@/api/blog.js'

export default function Home() {

  useEffect( () => {
    getBlogList()
  } )

  return (
    <MainLayout>
      <main className="flex min-h-screen flex-row justify-between">
        <div className='max-lg:hidden w-1/4 cursor-pointer	'>
          <LableCloud 
            labels={[{
              name:'测试',
              num: 12
            }]}
            onClickLable={()=>{}}
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
