import { db } from '@/db/index.js'
import { m_blog } from '@/db/schema.js'
import { NextResponse } from 'next/server';
import { eq } from "drizzle-orm";

export async function POST(request, context) {
  const {
    id,
    blogContent,
    blogLable,
    blogVisibility,
    blogTitle
  } = await request.json()

  const value = {
    id,
    blogContent,
    blogLable,
    blogVisibility,
    blogTitle
  }

  try {
    const id = await db.insert(users)
      .value({
        blogContent: blogContent,
        blogLable: blogLable,
        blogTitle: blogTitle,
        blogVisibility: 0
      })
      .returning(m_blog.id);

    return NextResponse.json({ data: id })
  } catch (error) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}