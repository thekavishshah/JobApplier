'use client'

import React, { useState } from 'react'

interface Props { resumeData: any; job: any; onClose: () => void }

export default function CoverLetterModal({ resumeData, job, onClose }: Props) {
  const [coverLetter, setCoverLetter] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const generateLetter = async () => {
    setLoading(true)
    const res = await fetch('/api/cover-letter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeData, jobDesc: job.description || job.title })
    })
    const data = await res.json()
    setCoverLetter(data.coverLetter)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-3/4 max-w-2xl">
        <h3 className="text-lg font-bold mb-4">Draft Cover Letter</h3>
        <div className="mb-4">
          <button onClick={generateLetter} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
            {loading ? 'Generating...' : 'Generate Letter'}
          </button>
          <button onClick={onClose} className="ml-2 px-4 py-2">Close</button>
        </div>
        {coverLetter && <div className="whitespace-pre-wrap border p-4 bg-gray-100">{coverLetter}</div>}
      </div>
    </div>
  )
}