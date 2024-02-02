/* global
  Promise
*/
import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop'

import BlogBlock from './BlogBlock'
import LableCloud from './LableCloud'
import LoadingMore from './LoadingMore'
import { getBlogListFront } from '@/db/sql.js'
import { getData as getLabelData } from '@/app/api/blog/getBlogLabels/route.js'

async function getData(firstLoadingSize, label = '') {
  try {
    const result = await Promise.all([
      getBlogListFront(firstLoadingSize, 0, label ?? ''),
      getLabelData()
    ])
    return {
      blogList: result[0],
      labelCloud: result[1]
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export default async function Page(props) {
  const firstLoadingSize = 10
  const {
    searchParams
  } = props

  const { label } = searchParams

  const {
    blogList = [],
    labelCloud = []
  } = await getData(firstLoadingSize, label) || {}

  return (
    <MainLayout>
      <main className="flex min-h-screen flex-row justify-center mx-auto my-4">
        <aside className='max-lg:hidden w-1/4 max-w-xs'>
          <LableCloud
            labels={labelCloud}
            onClickLable={() => { }}
          />
        </aside>
        <div className="w-full max-w-3xl flex flex-col mx-4">
          {blogList.map(blog => {
            return <BlogBlock
              blog={blog}
              key={blog.id}
            />
          })}
          <LoadingMore searchParams={searchParams} firstLoadingSize={firstLoadingSize} />
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
