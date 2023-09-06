import { getBlogSql } from '@/app/api/blog/getBlog/route.js'
import { addBlogRead } from '@/db/sql'
import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import BlogContent from './BlogContent'

async function getData(params) {
  try {
    const blogId = params['id']
    const data = await getBlogSql(blogId)
    addBlogRead()
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export default async function Page({ params }) {

  const blog = await getData(params) || {}

  return (
    <MainLayout>
      <div className='mx-auto w-full max-w-3xl bg-white p-8'>
        <BlogContent
          blogContent={blog.blogContent}>
        </BlogContent>
      </div>
    </MainLayout>
  );
}
