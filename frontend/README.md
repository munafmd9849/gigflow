# GigFlow Frontend

React + TypeScript dashboard for the GigFlow lead management API.

## Features

| Feature | Status |
|---|---|
| Login/register pages | Complete |
| Protected dashboard routes | Complete |
| Zustand auth persistence | Complete |
| Token rehydration via `/auth/me` | Complete |
| Axios 401 auto-logout | Complete |
| Leads table | Complete |
| Filters and debounced search | Complete |
| Pagination | Complete |
| Create/update modals | Complete |
| Admin-only delete/export UI | Complete |
| Responsive layout | Complete |

## Tech Stack

- React
- TypeScript
- Vite
- TailwindCSS
- React Router
- Axios
- Zustand
- TanStack Query
- React Hook Form
- Zod
- Sonner
- Lucide React

## Environment

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Local Development

```bash
npm install
npm run dev
```

Default URL:

```text
http://localhost:5173
```

## Build

```bash
npm run lint
npm run build
```

## Docker

From the repo root:

```bash
docker compose up --build
```

The frontend is served through Nginx at:

```text
http://localhost:3000
```
