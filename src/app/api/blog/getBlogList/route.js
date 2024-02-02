import { NextResponse } from 'next/server';
import { getBlogListFront } from '@/db/sql.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit') || 10
  const offset = searchParams.get('offset') || 0
  const label = searchParams.get('label') || ''

  try {
    const data = await getBlogListFront(limit, offset, label)
    return NextResponse.json({ data: data })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}