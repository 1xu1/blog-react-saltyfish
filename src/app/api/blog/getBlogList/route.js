import { db } from '@/db/index.js'
import { m_blog } from '@/db/schema.js'
import { NextResponse } from 'next/server';
import { desc, eq, like, and } from "drizzle-orm";

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit') || 10
  const offset = searchParams.get('offset') || 0
  const label = searchParams.get('label') || ''

  try {
    const data = await getBlogListSql(limit, offset, label)
    return NextResponse.json({ data: data })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}

export async function getBlogListSql(limit = 10, offset = 0, label = '') {
  const {
    // eslint-disable-next-line no-unused-vars
    blogContent,
    ...rest
  } = m_blog
  const data = await db.select({
    ...rest
  }).from(m_blog)
    .where(
      and(
        eq(m_blog.blogVisibility, 1),
        like(m_blog.blogLabel, `%${label}%`)
      ))
    .orderBy(desc(m_blog.blogTime))
    .limit(limit)
    .offset(offset)

  return data
}