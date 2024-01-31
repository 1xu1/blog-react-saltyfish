import { NextResponse } from 'next/server';
import { getBlogComment } from '@/db/sql.js'

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const blogId = searchParams.get('id')
  const offset = searchParams.get('offset') ?? 0
  let limit = searchParams.get('limit') ?? 100
  if (limit > 100) {
    limit = 100
  }

  try {
    const data = await getBlogComment(blogId, limit, offset)
    return NextResponse.json({ data })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}

