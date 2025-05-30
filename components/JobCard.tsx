'use client'

import React from 'react'

interface Props { job: any; onDraft: () => void }

export default function JobCard({ job, onDraft }: Props) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-semibold">{job.title}</h2>
      <p className="text-sm text-gray-600">{job.company}</p>
      <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Job</a>
      <button onClick={onDraft} className="block mt-2 bg-green-500 text-white px-2 py-1 rounded">Draft Letter</button>
    </div>
  )
}