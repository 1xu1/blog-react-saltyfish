import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop'

import LableCloud from './LableCloud'
import BlogList from './BlogList'

import { Suspense } from 'react'

export async function generateMetadata() {
  return {
    title: `跋鱼寻盐的技术博客 | 博文列表`,
  }
}

export default function Page(props) {
  const firstLoadingSize = 10
  const {
    searchParams
  } = props

  const { label } = searchParams


  return (
    <MainLayout>
      <main className="flex min-h-screen flex-row justify-center mx-auto my-4">
        <aside className='max-lg:hidden w-1/4 max-w-xs'>
          <Suspense fallback={<div className="w-full rounded-2xl border border-white/50 bg-white/90 p-4 shadow-xl backdrop-blur-md">
            <div>
              <p className=' text-2xl font-semibold mb-3'>标签云</p>
              <div className='flex flex-row flex-wrap gap-2'>
                <div className="animate-pulse">
                  <div className="flex flex-wrap gap-2">
                    <div className="h-7 w-24 bg-slate-200 rounded-full"></div>
                    <div className="h-7 w-20 bg-slate-200 rounded-full"></div>
                    <div className="h-7 w-16 bg-slate-200 rounded-full"></div>
                    <div className="h-7 w-28 bg-slate-200 rounded-full"></div>
                    <div className="h-7 w-18 bg-slate-200 rounded-full"></div>
                    <div className="h-7 w-22 bg-slate-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>}>
            <LableCloud />
          </Suspense>

        </aside>
        <div className="w-full max-w-3xl flex flex-col mx-4">
          <BlogList label={label} firstLoadingSize={firstLoadingSize} />
        </div>
        <aside className='max-lg:hidden w-1/4 max-w-xs'>
        </aside>

        <ScrollToTop />
      </main>
    </MainLayout>
  )
}
