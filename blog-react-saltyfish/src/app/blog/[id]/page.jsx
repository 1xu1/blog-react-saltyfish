import { getBlog } from '@/service/blog.js'
import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'

async function getData(params) {
  const res = await getBlog(params)
  return res.data
}

export default async function Page({ params }) {
  
  const blog = await getData(params)

  return (
    <MainLayout>
      <div>{blog.blogContent}</div>
    </MainLayout>
  );
}
