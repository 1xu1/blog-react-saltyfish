import { NextResponse } from 'next/server';
import { getBlogComment } from '@/db/sql.js'

export async function GET(request, context) {
  const { searchParams } = new URL(request.url)

  const blogId = searchParams.get('id')
  try {
    const data = await getBlogComment(blogId)
    return NextResponse.json({ data })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error}, { status: 500 })
  }
}

