import { getBlogSql } from '@/app/api/blog/getBlog/route.js'
import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import BlogContent from './BlogContent'
import BlogHeader from './BlogHeader'
import Button from "@/components/Button/Button";
import { getGithubLoginUrl } from '@/lib/authorize'
import WebsiteCounter from '@/components/WebsiteCounter/index'
import LeftSide from './LeftSide'

async function getData(params) {
  try {
    const blogId = params['id']
    const data = await getBlogSql(blogId)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export default async function Page({ params }) {

  const blogId = params['id']
  const blog = await getData(params) || {}

  return (
    <MainLayout>
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
            <textarea className=' w-full bg-slate-100 border rounded-sm h-24 p-2 focus:bg-slate-50 focus:border-cyan-500'></textarea>
            <p className='flex flex-row-reverse items-center'>
              <Button>评论</Button>
              <a className=' mx-2' href={getGithubLoginUrl()}>Github登录</a>
            </p>
          </div>
        </div>
        <aside className='max-lg:hidden w-1/4 max-w-xs'>
        </aside>
      </div>


      <WebsiteCounter id={blogId} />
    </MainLayout>
  );
}
