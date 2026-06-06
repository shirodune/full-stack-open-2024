# Full Stack Open 2024

My solutions to [Full Stack Open](https://fullstackopen.com/) — University of
Helsinki's open MOOC on modern JavaScript full-stack development (2024 cohort).

**Result:** Grade 5/5 · 7 ECTS credits · 153 exercises (parts 0–7).

## Contents

| Part | Topic | Main tech |
|------|-------|-----------|
| 0 | Fundamentals of web apps | HTML, HTTP, sequence diagrams |
| 1 | Introduction to React | React, Vite |
| 2 | Communicating with a server | React, axios |
| 3 | Node/Express backend → [separate repo](https://github.com/shirodune/full-stack-open-2024-part3) | Node, Express, MongoDB |
| 4 | Testing the backend & user admin | Express, JWT, node:test |
| 5 | Testing React apps | React Testing Library, Playwright |
| 6 | Advanced state management | Redux, React Query |
| 7 | Router, custom hooks, styling | React Router, Tailwind CSS |

> **Why is Part 3 in its own repo?** It's deployed to a PaaS (Fly.io), which
> deploys from the repository root — so the backend needs to be a standalone repo.

## Running an app

Each `partN/<app>/` is a standalone project with its own `package.json`:

```bash
cd part2/phonebook && npm install && npm run dev
```
