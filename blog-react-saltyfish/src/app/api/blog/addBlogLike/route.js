import { NextResponse } from 'next/server';
import { addBlogLike } from '@/db/sql.js'

export async function POST(request) {
  const {
    id,
    num
  } = await request.json()

  try {
    await addBlogLike(id, num)
    return NextResponse.json({ data: 'success' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}