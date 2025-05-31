Job Copilot Web App

A Next.js web application that automates job and internship applications using Google’s Gemini (Generative Language API) for cover letter generation. Users can upload their resume, search for jobs on LinkedIn/Handshake, and generate tailored cover letters. The app stores jobs and applications in a SQLite database via Prisma.

🧩 Tech Stack

Next.js 14+ (React framework with App Router)

TypeScript

Tailwind CSS for styling

Prisma ORM with SQLite (for development)

NextAuth.js (GitHub OAuth) for authentication

Google Gemini (Generative Language API) for generating cover letters

Puppeteer for job scraping

pdf-parse for resume text extraction

🔑 Features

User Authentication

GitHub OAuth via NextAuth.js

Only authenticated users can access dashboard and APIs

Resume Upload & Parsing

Upload a PDF resume

Extract plain text using pdf-parse

Return structured text for frontend display or JSON

Job Search (Scraping)

Scrape LinkedIn or Handshake using Puppeteer

Filter by keywords and location

Return a list of { title, company, url, description }

Cover Letter Generation

Send parsed resume data & job description to Google Gemini

Generate a three-paragraph, tailored cover letter

Database & Persistence

Prisma schema defines User, Job, and Application models

Store scraped jobs and generated applications in SQLite

Use Prisma Client in API routes

Dashboard UI

Upload resume, search for jobs, view results

“Draft Letter” button on each job to open a modal

Modal triggers Gemini-based generation and displays result

📁 Repository Structure

job-copilot-webapp/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts      # NextAuth.js route
│   │   ├── resume-parser/route.ts           # PDF upload → text extraction
│   │   ├── job-scraper/route.ts             # Puppeteer scraping
│   │   └── cover-letter/route.ts            # Gemini API call
│   ├── layout.tsx                           # App layout & global providers
│   └── page.tsx                             # Dashboard page (client component)
├── components/
│   ├── ResumeUploader.tsx                   # Upload PDF files
│   ├── JobCard.tsx                          # Display individual job results
│   └── CoverLetterModal.tsx                 # Modal for generating/displaying cover letters
├── lib/
│   ├── prisma.ts                            # Prisma Client wrapper
│   └── gemini.ts                            # Google Gemini helper function
├── prisma/
│   └── schema.prisma                        # Prisma schema (User, Job, Application)
├── styles/
│   └── globals.css                          # Tailwind CSS imports
├── public/
│   └── (static assets, if needed)
├── next-env.d.ts                             # Next.js TypeScript types
├── next.config.js                            # Next.js configuration
├── tsconfig.json                             # TypeScript configuration
├── postcss.config.js                         # PostCSS + Tailwind config
├── tailwind.config.js                        # Tailwind CSS config
├── package.json                              # Dependencies & scripts
└── README.md                                 # Project documentation (this file)

🚀 Getting Started

1. Clone the Repo

git clone https://github.com/thekavishshah/JobCopilotWebApp.git
cd JobCopilotWebApp

2. Install Dependencies

Make sure you have Node.js (v18+) installed.

npm install

3. Set Up Environment Variables

Create a file named .env.local in the project root with these values:

# Database (SQLite for development)
DATABASE_URL="file:./dev.db"

# NextAuth (GitHub OAuth)
GITHUB_ID=<your_github_oauth_client_id>
GITHUB_SECRET=<your_github_oauth_client_secret>
NEXTAUTH_SECRET=<a random string for encryption>
NEXTAUTH_URL=http://localhost:3000

# Google Gemini (Generative Language API)
GOOGLE_APPLICATION_CREDENTIALS="/path/to/your-service-account.json"

DATABASE_URL: Prisma uses SQLite by default. This string points Prisma to ./dev.db.

GITHUB_ID & GITHUB_SECRET: Create a GitHub OAuth App at GitHub Developer Settings.

NEXTAUTH_SECRET: A random string for NextAuth’s internal encryption. You can generate one with openssl rand -base64 32.

GOOGLE_APPLICATION_CREDENTIALS: Path to your Google service account key file. Learn more here.

4. Initialize Prisma & Migrate

npx prisma generate
npx prisma migrate dev --name init

This will:

Generate the Prisma Client

Create the dev.db SQLite file and apply the initial schema

5. Run the Development Server

npm run dev

Open http://localhost:3000 in your browser. You should see the login screen (GitHub OAuth). After signing in, you’ll land on the dashboard.

🛠️ Usage

Log In

Click “Sign in with GitHub.” GitHub will ask you to authorize the app.

Upload Resume

On the dashboard, click “Upload Resume” and select a PDF file.

The app extracts the text and stores it in state.

Search for Jobs

Use the search form: enter keywords (e.g., “Software Engineer”) and location (e.g., “San Jose”).

Click “Search.” The backend uses Puppeteer to scrape LinkedIn search results.

Job cards appear in a grid.

Generate a Cover Letter

On any job card, click “Draft Letter.” A modal appears.

Click “Generate Letter.” The app sends your resume data + job title/description to Google Gemini.

Wait a few seconds. The generated cover letter appears in the modal.

Save or Apply (Future Expansion)

You can expand the UI to include “Save to DB” or “Mark as Applied.”

For now, you can copy/paste the generated text and apply manually.

🗃️ Database Schema

Here’s a quick overview of the Prisma models in prisma/schema.prisma:

User

id, email, name

Relations: jobs (list of Job)

Job

id, title, company, url, description, userId

Relations: applications (list of Application)

Application

id, jobId, coverLetter, status, createdAt

NextAuth uses additional tables (Account, Session, VerificationToken).

🌐 Deployment

You can deploy this app on Vercel for easy hosting of Next.js serverless functions.

Push your code to a GitHub repository.

Go to Vercel and import the GitHub repo.

In Vercel’s “Environment Variables” settings, add the same keys from your .env.local:

DATABASE_URL

GITHUB_ID, GITHUB_SECRET, NEXTAUTH_SECRET, NEXTAUTH_URL

If you want to use Google Gemini in production, ensure your service account key is stored securely (e.g., in GitHub Secrets). Use GOOGLE_APPLICATION_CREDENTIALS accordingly.

Deploy. Vercel automatically runs npm install, npx prisma generate, and npx prisma migrate deploy.

Visit your deployed URL.

🚨 SQLite in Production

SQLite is fine for testing or small-scale apps. For production, switch to PostgreSQL or MySQL:

Update DATABASE_URL in Vercel to a Postgres connection string (e.g., postgresql://USER:PASSWORD@HOST:PORT/DATABASE).

Locally, update .env.local to your Postgres URL.

Run npx prisma migrate dev --name pg-init to create migrations for Postgres.

Redeploy. Vercel will run the migrations.

📝 Further Improvements

Application Manager: Allow users to save “Drafted” letters, mark status (Drafted, Applied, Interviewing, etc.), and view a history of past applications.

Form Autofill Extension: Build a Chrome extension to auto-fill common application forms with data from user’s profile & resume.

Custom Cover Letter Prompts: Let users tweak tone, length, or key bullet points for each letter.

Mobile-Responsive UI: Improve styling for smaller screens.

Testing: Add unit tests for API routes and React components (e.g., Jest + React Testing Library).

Caching & Rate Limiting: Cache recent Gemini responses & throttle repeated requests.

🤝 Contributing

Fork the repository

Create a feature branch (git checkout -b feature/my-feature)

Commit your changes (git commit -m "feat: add new feature"
)

Push to the branch (git push origin feature/my-feature)

Open a Pull Request

Please follow the existing code style and ensure all tests pass before submitting.

Happy Job Hunting!

Built with ❤️ by Kavish Shah

