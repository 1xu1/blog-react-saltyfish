import { NextResponse } from 'next/server';
import { addBlogRead } from '@/db/sql.js'

export async function POST(request) {
  const {
    id
  } = await request.json()

  try {
    await addBlogRead(id)
    return NextResponse.json({ data: 'success' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}