import { db } from '@/db/index.js'
import { NextResponse } from 'next/server';
import { addBlogLike } from '@/db/sql.js'

export async function POST(request, context) {
  const {
    id
  } = await request.json()

  try {
    await addBlogLike(id)
    return NextResponse.json({ data: 'success' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}