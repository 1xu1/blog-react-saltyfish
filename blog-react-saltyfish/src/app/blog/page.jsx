import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'

import BlogBlock from './BlogBlock'
import LableCloud from './LableCloud'
import { getBlogListSql } from '@/app/api/blog/getBlogList/route.js'

async function getData(firstLoadingSize, label = '') {
  try {
    const data = await getBlogListSql(firstLoadingSize, 0, label ?? '')
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export default async function Page(props) {
  const firstLoadingSize = 20
  const {
    searchParams
  } = props

  const { label } = searchParams

  const blogList = await getData(firstLoadingSize, label) || []

  return (
    <MainLayout>
      <main className="flex min-h-screen flex-row justify-between">
        <div className='fixed max-lg:hidden w-1/4 cursor-pointer max-w-xs'>
          <LableCloud
            labels={[{
              name: '测试',
              num: 12
            }]}
            onClickLable={() => { }}
          />
        </div>
        <div className="w-full max-w-3xl flex flex-col mx-auto">
          {blogList.map(blog => {
            return <BlogBlock
              blogTitle={blog.blogTitle}
              blogTime={blog.blogTime}
              blogId={blog.id}
              key={blog.id}
              blogLabel={blog.blogLabel}
            />
          })}
          {/* <LoadingMore firstLoadingSize={firstLoadingSize} /> */}
        </div>
        <div>
        </div>
      </main>
    </MainLayout>
  )
}
