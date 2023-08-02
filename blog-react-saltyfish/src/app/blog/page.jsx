import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'

import BlogBlock from './BlogBlock'
import LableCloud from './LableCloud'

import { getBlogList, getBlogLabels } from '@/service/blog.js'

async function getData() {
  try {
    const res = await getBlogList()
    return res.data
  } catch (error) {
    return undefined
  }
}

export default async function Page(  ) {
  const blogList = await getData() || []

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
          {blogList.map(blog=>{
            return <BlogBlock
              blogTitle={blog.blogTitle}
              blogContent={blog.blogContent}
              blogTime={blog.blogTime}
              blogId={blog.id}
              key={blog.id}
            />
          })}
        </div>
        <div>

        </div>
      </main>
    </MainLayout>
  )
}
