import { getBlog } from '@/service/blog.js'
import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import BlogContent from './BlogContent'

async function getData(params) {
  try {
    const res = await getBlog(params)
    return res.data
  } catch (error) {
    return undefined
  }
}

export default async function Page({ params }) {

  const blog = await getData(params) || {}

  return (
    <MainLayout>
      <BlogContent
        blogContent={blog.blogContent}>
      </BlogContent>
    </MainLayout>
  );
}
