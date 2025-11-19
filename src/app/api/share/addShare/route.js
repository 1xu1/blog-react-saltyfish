import { NextResponse } from 'next/server';
import { addShare } from '@/db/sql.js'
import { checkTokenRole } from '@/lib/jwt.js'
import { headers } from 'next/headers'

export async function POST(request) {
  const {
    title,
    description,
    url,
    icon,
    label
  } = await request.json()
  const headersList = await headers()
  const token = headersList.get('Authorization')

  try {
    if (!checkTokenRole(token, 'admin')) {
      return NextResponse.json({ error: '您无新增权限' })
    }
    await addShare({
      title,
      description,
      url,
      icon,
      label
    })
    return NextResponse.json({ data: 'success' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}