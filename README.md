# JobApplier Web App

A Next.js + TypeScript web application that serves as a “Job & Internship Application Copilot.” The app helps you:

- **Parse** your resume into structured JSON
- **Scrape** job postings from target sites (LinkedIn, Handshake)
- **Generate** tailored cover letters using Google’s Gemini API
- **Manage** job applications (status tracking, saved jobs, cover-letter drafts)

This repository contains all necessary code for the frontend UI, backend API routes, database schema, and authentication setup.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Folder Structure](#folder-structure)  
4. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Clone & Install](#clone--install)  
   - [Environment Variables](#environment-variables)  
   - [Database Setup](#database-setup)  
   - [Run Locally](#run-locally)  
5. [Usage](#usage)  
   - [Authentication](#authentication)  
   - [Resume Parser](#resume-parser)  
   - [Job Scraper](#job-scraper)  
   - [Cover Letter Generator](#cover-letter-generator)  
   - [Application Dashboard](#application-dashboard)  
6. [Deployment](#deployment)  
7. [Troubleshooting & Tips](#troubleshooting--tips)  
8. [Contributing](#contributing)  
9. [License](#license)  

---

## Features

- **Resume Parsing**  
  Upload a PDF/DOCX resume. Our API extracts structured sections (Education, Experience, Skills) and returns JSON.

- **Job Scraping**  
  Enter keywords/location and fetch recent job listings from LinkedIn or Handshake via a Puppeteer/Playwright-based scraper.

- **Cover Letter Generation**  
  Send your parsed resume data + selected job description to Gemini (Google Generative Language API). Receive a polished, tailored cover letter draft.

- **Application Management**  
  - View scraped jobs in a card list  
  - Click “Draft Letter” to generate and preview your cover letter  
  - Save jobs to your Dashboard (status: Drafted, Applied, Starred)  
  - Export a summary (CSV) of all tracked applications  

- **Authentication**  
  NextAuth integration (GitHub provider) to keep each user’s data separated and secure.

---

## Tech Stack

- **Framework**:  
  - Next.js (App Router, TypeScript)  
  - Tailwind CSS + Shadcn/ui for styling

- **Backend API Routes** (Serverless functions in Next.js)  
  - `app/api/resume-parser/route.ts` → PDF/DOCX → JSON  
  - `app/api/job-scraper/route.ts` → Puppeteer-based scraping  
  - `app/api/cover-letter/route.ts` → Gemini API call  

- **Database & ORM**  
  - Prisma (SQLite in development; easily switch to PostgreSQL in production)  
  - Schema models: `User`, `Job`, `Application`

- **AI/LLM**  
  - Google Generative Language API (Gemini) via `@google-ai/generativelanguage`  
  - LangChain (for chaining prompts, if extended)

- **Authentication**  
  - NextAuth (GitHub provider)  
  - Adapter: `@next-auth/prisma-adapter`

- **Scraping**  
  - Puppeteer (or Playwright) for headless browser automation

- **Utilities**  
  - `pdf-parse` for PDF text extraction  
  - `docx` or similar library for DOCX parsing  
  - Zod for request validation (optional)

---
