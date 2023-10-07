import { db } from '@/db/index.js'
import { m_blog } from '@/db/schema.js'
import { NextResponse } from 'next/server';
import { eq } from "drizzle-orm";

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const blogId = searchParams.get('id')
  try {
    const data = await getBlogSql(blogId)
    return NextResponse.json({ data })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error}, { status: 500 })
  }
}

export async function getBlogSql(blogId) {
  const data = (await db.select()
    .from(m_blog)
    .where(eq(m_blog.id, blogId)))[0]
  return data
}
