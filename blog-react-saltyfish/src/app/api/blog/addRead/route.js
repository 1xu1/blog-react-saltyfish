import { NextResponse } from 'next/server';
import { addWebSiteRead } from '@/db/sql.js'

export async function POST() {
  try {
    await addWebSiteRead()
    return NextResponse.json({ data: 'success' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}