# DevSubmitClient — Frontend

Next.js (App Router) frontend for the DevSubmit project submission & review dashboard.

**Stack:** Next.js 16 · React 19 · TypeScript · TailwindCSS v4 · ShadCN (Base UI) · TanStack Query · TanStack Form · Zod

---

## Overview

Two-role application:

- **Student** — sign up, submit one project (name, repo URL, optional live link, description), track review status in real time.
- **Mentor** — paginated dashboard, filters (status / search), approve/reject with reason, aggregate stats.

Both share a single JWT-authenticated session; `ProtectedRoute` enforces role at the page level.

---

## Setup

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9
- Backend running (see [DevSubmitServer](https://github.com/nurulamin092/DevSubmitServer))

### Install

```bash
pnpm install
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL (default http://localhost:5000/api/v1)
pnpm dev
```
