import { db } from '@/db/index.js'
import { m_blog } from '@/db/schema.js'
import { NextResponse } from 'next/server';
import { checkTokenRole } from '@/lib/jwt.js'
import { headers } from 'next/headers'

export async function POST(request) {
  const {
    blogContent,
    blogLabel,
    blogTitle,
    blogWriterId
  } = await request.json()
  const headersList = headers()
  const token = headersList.get('Authorization')
  try {
    if (!checkTokenRole(token, 'admin')) {
      return NextResponse.json({ error: '您无新增权限' })
    }
    const data = await db.insert(m_blog)
      .values({
        blogContent: blogContent,
        blogLabel: blogLabel,
        blogTitle: blogTitle,
        blogVisibility: 0,
        blogWriterId: blogWriterId ?? 1
      })
      .returning({ id: m_blog.id });

    return NextResponse.json({ data: data[0] })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}