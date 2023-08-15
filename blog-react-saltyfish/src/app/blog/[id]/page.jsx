import { getBlog } from '@/service/blog.js'
import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import BlogContent from './BlogContent'

async function getData(params) {
  try {
    const res = await getBlog(params)
    return res.data
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export default async function Page({ params }) {

  const blog = await getData(params) || {}

  return (
    <MainLayout>
      <div className='mx-auto w-full max-w-3xl'>
        <BlogContent
          blogContent={blog.blogContent}>
        </BlogContent>
      </div>
    </MainLayout>
  );
}
