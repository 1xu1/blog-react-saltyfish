import { NextResponse } from 'next/server';
import { getBlogLabels } from '@/db/sql.js'

// 增加缓存机制
const revalidate = 60; // 60秒
let chache = {
  data: null,
  time: 0
}


export async function GET() {
  try {
    const data = getData()
    return NextResponse.json({ data })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}

export async function getData() {
  const now = new Date().getTime()
  if(now - chache.time > revalidate * 1000 && chache.data){
    return chache.data
  }
  const labels = await getBlogLabels()
  const data = generalLabelData(labels)
  chache.data = data
  return data
}

function generalLabelData(labels) {
  const returnData = {}
  labels.forEach(label => {
    const labelKeys = label.label.split('#')
    for (let key of labelKeys) {
      if (!key) {
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
  const labelArray = []
  for (let item in returnData) {
    labelArray.push({
      name: item,
      num: returnData[item]
    })
  }
  labelArray.sort((a, b) => {
    return b.num - a.num
  })
  return labelArray
}