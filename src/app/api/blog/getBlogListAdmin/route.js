import { NextResponse } from 'next/server';
import { getBlogList } from '@/db/sql.js';
import { headers } from 'next/headers'
import { checkTokenRole } from '@/lib/jwt.js'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit') || 10
  const offset = searchParams.get('offset') || 0
  const label = searchParams.get('label') || ''

  try {
    const headersList = headers()
    const token = headersList.get('Authorization')
    if (!checkTokenRole(token, 'admin')) {
      return NextResponse.json({ error: '您无查询权限' })
    }
    const data = await getBlogList(limit, offset, label)
    return NextResponse.json({ data: data })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}