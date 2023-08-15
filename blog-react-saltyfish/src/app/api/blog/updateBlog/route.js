import { db } from '@/db/index.js'
import { m_blog } from '@/db/schema.js'
import { NextResponse, NextRequest } from 'next/server';
import { eq } from "drizzle-orm";

export async function POST(request, context) {
  const {
    id,
    blogContent,
    blogLable,
    blogTitle,
    blogVisibility
  } = await request.json()

  try {
    await db
      .update(m_blog)
      .set({
        blogContent: blogContent,
        blogLabel: blogLable,
        blogVisibility: blogVisibility,
        blogTitle: blogTitle,
        blogTime: new Date(),
      })
      .where(eq(m_blog.id, id))

    return NextResponse.json({ data: 'success' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}