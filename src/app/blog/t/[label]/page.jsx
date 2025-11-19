import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop'

import LableCloud from '../../LableCloud'
import BlogList from '../../BlogList'

import { Suspense } from 'react'

export default async function Page(props) {
  const firstLoadingSize = 10
  const {
    params
  } = props

  const resolvedParams = await params
  const { label } = resolvedParams

  const loadingSkeleton = () => {
    const content = []
    for (let i = 0; i < firstLoadingSize; i++) {
      content.push(<div className="w-full border-y bg-white hover:shadow p-5 mb-2">
        <div className="animate-pulse flex max-w-2xl w-full mx-auto">
          <div className="flex-1 space-y-3 py-1">
            <div className="h-4 w-40 bg-slate-200 rounded"></div>
            <div className="h-2 w-36 bg-slate-200 rounded"></div>
            <div className="h-2 w-72 bg-slate-200 rounded"></div>
            <div className="h-2 w-32 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>)
    }
    return content
  }

  return (
    <MainLayout>
      <main className="flex min-h-screen flex-row justify-center mx-auto my-4">
        <aside className='max-lg:hidden w-1/4 max-w-xs'>
          <Suspense fallback={<div className="w-full border bg-white p-4 rounded-md	">
            <div>
              <p className=' text-2xl font-semibold mb-2'>标签云</p>
              <div className='flex flex-row flex-wrap gap-y-2'>
                <div className="animate-pulse flex max-w-2xl w-full mx-auto">
                  <div className="flex-1 space-y-3 py-1">
                    <div className="h-4 w-full bg-slate-200 rounded"></div>
                    <div className="h-4 w-full bg-slate-200 rounded"></div>
                    <div className="h-4 w-full bg-slate-200 rounded"></div>
                    <div className="h-4 w-full bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>}>
            <LableCloud />
          </Suspense>

        </aside>
        <div className="w-full max-w-3xl flex flex-col mx-4">
          <Suspense fallback={loadingSkeleton()}>
            <BlogList label={decodeURI(label)} firstLoadingSize={firstLoadingSize} />
          </Suspense>
        </div>
        <aside className='max-lg:hidden w-1/4 max-w-xs'>
        </aside>
        <div>
        </div>
        <ScrollToTop />
      </main>
    </MainLayout>
  )
}
