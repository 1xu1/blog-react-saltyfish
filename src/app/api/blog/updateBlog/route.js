import { db } from '@/db/index.js'
import { m_blog } from '@/db/schema.js'
import { NextResponse } from 'next/server';
import { headers } from 'next/headers'
import { eq } from "drizzle-orm";
import { getBlogWriterId } from '@/db/sql.js'
import { checkTokenUserId } from '@/lib/jwt.js'

export async function POST(request) {
  const {
    id,
    blogContent,
    blogLabel,
    blogTitle,
    blogVisibility
  } = await request.json()

  const headersList = headers()
  const token = headersList.get('Authorization')

  try {
    const blogWriter = await getBlogWriterId(id)
    if (!checkTokenUserId(token, blogWriter)) {
      return NextResponse.json({ error: '您无编辑权限' })
    }
    const blog = await db
      .update(m_blog)
      .set({
        blogContent: blogContent,
        blogLabel: blogLabel,
        blogVisibility: blogVisibility,
        blogTitle: blogTitle,
        blogTime: new Date(),
      })
      .where(eq(m_blog.id, id))
      .returning()

    return NextResponse.json({ data: blog[0] })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}