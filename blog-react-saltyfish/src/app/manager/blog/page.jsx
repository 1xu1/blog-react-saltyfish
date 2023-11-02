import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import { getBlogList } from '@/db/sql.js'
import Table from '@/components/Table/Table.jsx'

async function getData() {
  let data = []
  try {
    data = await getBlogList(50, 0)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export default async function Page() {

  const data = await getData() || []

  const columns = [
    {
      dataIndex: 'id',
      title: 'id'
    },
    {
      dataIndex: 'blogTitle',
      title: '标题'
    },
    {
      dataIndex: 'blogLabel',
      title: '标签'
    },
    {
      dataIndex: 'blogCreateTime',
      title: '创建时间'
    },
    {
      dataIndex: 'oprate',
      title: '操作'
    },
  ]

  return (
    <MainLayout>
      111
      <Table
        dataSource={data}
        columns={columns}
      />
    </MainLayout>
  )
}
