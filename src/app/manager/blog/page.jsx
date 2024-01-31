import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import { getBlogList } from '@/db/sql.js'
import Table from '@/components/Table/Table.jsx'
import { getFormatTime } from '@/lib/time.js'
import Link from 'next/link'

async function getData() {
  let data = []
  try {
    data = await getBlogList(500, 0)
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
      title: '创建时间',
      render: (time) => {
        return getFormatTime(time)
      }
    },
    {
      dataIndex: 'blogVisibility',
      title: '状态',
      render: (visibility) => {
        return visibility === 1 ? '公开' : '隐藏'
      }
    },
    {
      dataIndex: 'oprate',
      title: '操作',
      render: (text, record) => {
        return (
          <Link className='text-sky-500' href={`/blog/edit?id=${record.id}`}>编辑</Link>
        )
      }
    },
  ]

  return (
    <MainLayout>
      <Table
        className='mx-auto'
        dataSource={data}
        columns={columns}
      />
      
    </MainLayout>
  )
}
