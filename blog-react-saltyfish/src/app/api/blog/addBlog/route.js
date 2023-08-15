import { db } from '@/db/index.js'
import { m_blog } from '@/db/schema.js'
import { NextResponse } from 'next/server';

export async function POST(request, context) {
  const {
    blogContent,
    blogLabel,
    blogTitle
  } = await request.json()
  try {
    const data = await db.insert(m_blog)
      .values({
        blogContent: blogContent,
        blogLabel: blogLabel,
        blogTitle: blogTitle,
        blogVisibility: 0,
        blogWriterId: 1
      })
      .returning({ id: m_blog.id });

    return NextResponse.json({ data: data[0] })
  } catch (error) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}