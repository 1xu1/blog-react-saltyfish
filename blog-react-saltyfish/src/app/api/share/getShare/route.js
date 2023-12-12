import { NextResponse } from 'next/server';
import { selectShare } from '@/db/sql.js'

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  let limit = searchParams.get('limit') || 10
  const offset = searchParams.get('offset') || 0
  const label = searchParams.get('label') || ''
  if (limit > 100) {
    limit = 100
  }

  try {
    const data = await selectShare(limit, offset, label)
    return NextResponse.json({ data })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}

