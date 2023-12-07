import { NextResponse } from 'next/server';
import { addComment } from '@/db/sql.js'
import { checkToken } from '@/lib/jwt.js'
import { headers } from 'next/headers'

export async function POST(request) {
  const {
    content,
    blogId
  } = await request.json()
  const headersList = headers()
  const token = headersList.get('Authorization')
  try {
    let userId = null
    if(token){
      userId = checkToken(token)?.id ?? null 
    }
    const data = addComment({
      content,
      userId,
      blogId
    })
    return NextResponse.json({ data: data[0] })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}

