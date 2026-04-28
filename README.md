# DevPulse

GitHub analytics dashboard that turns any GitHub profile into a clean, 
shareable page — contribution trends, language breakdown, top repos, and stats.

**Live:** [https://devpulse.vercel.app](https://devpulse-amber.vercel.app/)

DevPulse Dashboard<img width="1512" height="863" alt="Screenshot 2026-04-27 at 11 10 13 PM" src="https://github.com/user-attachments/assets/fddfc4dd-8696-44c3-86bd-23981239ea54" />

## What it does

- Visualizes monthly contribution history using GitHub's GraphQL API
- Aggregates language usage across all public repos
- Shows PR merge rate, total stars, forks, and follower stats
- Every profile has a public shareable URL — /[username]
- GitHub OAuth login to view your own dashboard instantly

## Stack

- Next.js 14 (App Router)
- GitHub REST + GraphQL API via Octokit
- NextAuth.js for GitHub OAuth
- Recharts for data visualization
- Tailwind CSS
- Deployed on Vercel

## Running locally

1. Clone the repo
2. Create `.env.local` with these values:

   GITHUB_ID=your_github_oauth_client_id
   GITHUB_SECRET=your_github_oauth_client_secret
   NEXTAUTH_SECRET=any_random_string
   NEXTAUTH_URL=http://localhost:3000
   GITHUB_TOKEN=your_github_personal_access_token

3. Create a GitHub OAuth app at github.com/settings/developers
   - Callback URL: http://localhost:3000/api/auth/callback/github

4. Run:

   npm install
   npm run dev

## GitHub token scopes needed

- read:user
- repo
