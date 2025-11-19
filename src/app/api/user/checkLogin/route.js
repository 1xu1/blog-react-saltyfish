import { NextResponse } from 'next/server';

import { checkToken } from '@/lib/jwt.js'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET() {

  try {
    const headersList = await headers()
    const token = headersList.get('Authorization')

    const userInfo = checkToken(token)
    if (!userInfo?.id) {
      return NextResponse.json({ error: '登录状态已过期，请重新登陆' })
    }

    return NextResponse.json({
      data: {
        status: 'success',
      }
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}


