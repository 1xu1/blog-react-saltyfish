import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import { getBlogComment } from '@/db/sql.js'

async function getData() {
  try {
    const data = await getBlogComment(0)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export default async function Page(props) {

  const data = await getData() || []

  return (
    <MainLayout>
      {data}
    </MainLayout>
  )
}
