import { getBlogTitle } from '@/db/sql.js'
import { getBlogSql } from '@/app/api/blog/getBlog/route.js'
import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import BlogContent from './BlogContent'
import BlogHeader from './BlogHeader'
import WebsiteCounter from '@/components/WebsiteCounter/index'
import LeftSide from './LeftSide'
import CommentBlock from './CommentBlock'
import Head from 'next/head'

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
    title: blog.blogTitle,
  }
}

export default async function Page({ params }) {

  const blogId = params['id']
  const blog = await getData(params) || {}

  return (
    <MainLayout>
      <Head>
        <title key={'title'}>{blog.blogTitle ?? '盐巴鱼的博客'}</title>
      </Head>
      <div className='flex min-h-screen flex-row justify-center mx-auto'>
        <aside className='max-lg:hidden w-1/4 max-w-xs relative'>
          <span className='sticky top-1/2 flex flex-row-reverse'>
            <LeftSide likeNum={blog.blogLike} id={blog.id} />
          </span>
        </aside>
        <div>
          <div className='mx-auto w-full max-w-3xl bg-white p-8'>
            <BlogHeader blog={blog} />
            <BlogContent
              blogContent={blog.blogContent}>
            </BlogContent>
          </div>

          <div className='mx-auto w-full max-w-3xl bg-white p-8 my-4'>
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
