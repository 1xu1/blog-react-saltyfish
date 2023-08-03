import { db } from '@/db/index.js'
import { m_blog } from '@/db/schema.js'
import { NextResponse } from 'next/server';
import { desc } from "drizzle-orm";

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit') || 10
  const offset = searchParams.get('offset') || 0

  try {
    const data = await db.select().from(m_blog).orderBy(desc(m_blog.blogTime)).limit(limit).offset(offset)
    return NextResponse.json({ data:data })
  } catch (error) {
    return NextResponse.json({ error: error?.message ?? error}, { status: 500 })
  }
}