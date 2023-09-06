import { NextResponse } from 'next/server';
import { getBlogLabels } from '@/db/sql.js'

export async function GET(request, context) {
  try {
    const labels = await getBlogLabels()
    const data = generalLabelData(labels)
    return NextResponse.json({ data })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}

function generalLabelData(labels) {
  const returnData = {}
  labels.forEach(label => {
    const labelKeys = label.label.split('#')
    for (let key of labelKeys) {
      if(!key){
        continue
      }
      if (returnData[key]) {
        returnData[key]++
      }
      else {
        returnData[key] = 1
      }
    }
  })
  return returnData
}