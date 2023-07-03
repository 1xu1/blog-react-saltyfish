import { db } from '@/db/index.js'
import { m_blog } from '@/db/schema.js'
import { NextResponse } from 'next/server';
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.select().from(m_blog).orderBy(desc(m_blog.blogTime))
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: error?.message ?? error}, { status: 500 })
  }
}