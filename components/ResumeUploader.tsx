'use client'

import React from 'react'

interface Props { onUpload: (data: any) => void }

export default function ResumeUploader({ onUpload }: Props) {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/resume-parser', { method: 'POST', body: formData })
    const data = await res.json()
    onUpload(data)
  }

  return (
    <div>
      <label className="block mb-2">Upload Resume (PDF)</label>
      <input type="file" accept="application/pdf" onChange={handleUpload} />
    </div>
  )
}