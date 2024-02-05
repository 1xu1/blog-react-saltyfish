import React from 'react';
import { getBlogListFront } from '@/db/sql.js'
import BlogBlock from './BlogBlock'
import LoadingMore from './LoadingMore'

async function getData(firstLoadingSize, label = '') {
  try {
    const result = getBlogListFront(firstLoadingSize, 0, label ?? '')
    return result
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export default async function LableCloud(props) {
  const {
    firstLoadingSize = 10,
    label = ''
  } = props
  const blogList = await getData(firstLoadingSize, label) || []

  return (
    <>
      {
        blogList.map(blog => {
          return <BlogBlock
            blog={blog}
            key={blog.id}
          />
        })
      }
      <LoadingMore label={label} firstLoadingSize={firstLoadingSize} />
    </>
  );
}