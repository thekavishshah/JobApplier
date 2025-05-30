import { TextServiceClient } from '@google-ai/generativelanguage'

const client = new TextServiceClient()

export async function generateCoverLetter(resumeData: any, jobDesc: string): Promise<string> {
  const promptText = `Write a 3-paragraph cover letter for the following job description:\n${jobDesc}\n\nUse this resume data:\n${JSON.stringify(resumeData)}`
  const request = {
    model: 'models/chat-bison-001',
    prompt: { text: promptText },
    temperature: 0.7,
    candidateCount: 1,
    maxOutputTokens: 1024
  }
  const [response] = await client.generateText(request)
  return response.candidates?.[0]?.output || ''
}