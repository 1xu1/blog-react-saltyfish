import { NextResponse } from 'next/server';

import { getUserSql } from '@/db/sql.js';
import { getToken } from '@/lib/jwt.js'

export async function POST(request, context) {
  const {
    name,
    password
  } = await request.json()

  try {
    const userInfo = await getUserSql(name, password)
    if(userInfo === null){
      return NextResponse.json({ error: '用户名或密码错误' })
    }

    const token = getToken(userInfo)
    return NextResponse.json({ data: token })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}


