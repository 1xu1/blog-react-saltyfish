import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    name:'1'
  }

  return NextResponse.json({ data })
}

export async function POST() {
  // ...
  return NextResponse.json({
      // ...
  })
}
