import { NextRequest, NextResponse } from 'next/server'
import pdfParse from 'pdf-parse'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as Blob
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const data = await pdfParse(buffer)
  return NextResponse.json({ text: data.text })
}