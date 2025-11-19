import { getBlogTitle } from '@/db/sql.js'
import { getBlogSql } from '@/app/api/blog/getBlog/route.js'
import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import BlogContent from './BlogContent'
import BlogHeader from './BlogHeader'
import WebsiteCounter from '@/components/WebsiteCounter/index'
import LeftSide from './LeftSide'
import CommentBlock from './CommentBlock'

async function getData(params) {
  const blogId = params['id']
  try {
    const data = await getBlogSql(blogId)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export async function generateMetadata({ params }) {
  const id = params.id
  const blog = await getBlogTitle(id)
  return {
    title: `${blog.blogTitle} --- 跋鱼寻盐的技术博客`,
  }
}

export default async function Page({ params }) {

  const blogId = params['id']
  const blog = await getData(params) || {}

  return (
    <MainLayout>
      <div className='flex min-h-screen flex-row justify-center mx-auto'>
        <aside className='max-lg:hidden w-1/4 max-w-xs flex-shrink-0'>
          <div className='sticky top-8 mt-8 self-start'>
            <LeftSide likeNum={blog.blogLike} id={blog.id} />
          </div>
        </aside>
        <div className="w-full max-w-3xl">
          <div className='w-full bg-white p-4 sm:p-6 md:p-8 grid-background-img tracking-wide'>
            <BlogHeader blog={blog} />
            <BlogContent
              blogContent={blog.blogContent}>
            </BlogContent>
          </div>

          <div className='w-full bg-white p-4 sm:p-6 md:p-8 my-4'>
            <CommentBlock blogId={blogId}></CommentBlock>
          </div>
        </div>
        <aside className='max-lg:hidden w-1/4 max-w-xs'>
        </aside>
      </div>
      <WebsiteCounter id={blogId} />
    </MainLayout>
  );
}
