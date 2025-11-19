"use client"
import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import { getBlogList } from '@/service/blog.js'
import Table from '@/components/Table/Table.jsx'
import { getFormatTime } from '@/lib/time.js'
import Link from 'next/link'
import Operate from "./operate";
import { useState, useEffect } from 'react';

export default function Page() {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const blogData = await getBlogList(500, 0);
        setData(blogData || []);
      } catch (error) {
        console.error(error);
        setData([]);
      }
    }

    fetchData();
  }, []);

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
      <div className='mx-auto w-[1000px]'>
        <Operate />
        <Table
          dataSource={data}
          columns={columns}
        />
      </div>
    </MainLayout>
  )
}
