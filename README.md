# GigFlow

GigFlow is a production-style MERN lead management dashboard built for an internship assignment. It includes JWT authentication, Admin/Sales RBAC, lead CRUD, filtering, search, pagination, CSV export, and a responsive React dashboard.

## Highlights

| Feature | Status |
|---|---|
| JWT registration and login | Complete |
| Protected routes | Complete |
| Admin/Sales RBAC | Complete |
| Lead CRUD | Complete |
| Combined filtering | Complete |
| Debounced search | Complete |
| Pagination, limit 10 | Complete |
| CSV export | Complete |
| Responsive dashboard | Complete |
| Docker setup | Complete |

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, TailwindCSS |
| State/Data | Zustand, TanStack Query, Axios |
| Forms | React Hook Form, Zod |
| UI | Sonner, Lucide React |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT, bcrypt |
| Tooling | Docker, Postman, Newman |

## Architecture Overview

```text
frontend/
  React dashboard, auth state, API services, reusable UI components

backend/
  Express routes, controllers, services, Mongoose models, middleware, validators
```

Backend request flow:

```text
Route -> Auth Middleware -> RBAC Middleware -> Zod Validation -> Controller -> Service -> Mongoose -> MongoDB
```

Frontend data flow:

```text
Page -> React Query -> Service -> Axios Client -> Backend API
```

## Folder Structure

```text
gigflow/
  backend/
    src/
      config/
      controllers/
      middlewares/
      models/
      routes/
      services/
      types/
      utils/
      validators/
    postman/
    API_DOCUMENTATION.md
    Dockerfile

  frontend/
    src/
      components/
      hooks/
      lib/
      pages/
      services/
      stores/
      types/
      utils/
    Dockerfile
    nginx.conf

  docker-compose.yml
```

## Environment Variables

Backend: create `backend/.env`.

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
```

Frontend: create `frontend/.env`.

```env
VITE_API_URL=http://localhost:5000/api
```

For Docker Compose, create a root `.env`.

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
VITE_API_URL=http://localhost:5000/api
```

## Local Development

Install backend dependencies:

```bash
cd backend
npm install
npm run dev
```

Install frontend dependencies:

```bash
cd frontend
npm install
npm run dev
```

Local URLs:

| App | URL |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:5000/api` |
| Health Check | `http://localhost:5000/health` |

## Docker Setup

Run the full app:

```bash
docker compose up --build
```

Docker URLs:

| Service | URL |
|---|---|
| Frontend | `http://localhost:3000` |
| Backend API | `http://localhost:5000/api` |

Stop containers:

```bash
docker compose down
```

## API Documentation

Detailed endpoint documentation is available here:

[Backend API Documentation](backend/API_DOCUMENTATION.md)

Postman collection:

```text
backend/postman/GigFlow.postman_collection.json
backend/postman/GigFlow.local.postman_environment.json
```

Run API tests with Newman:

```bash
cd backend
npm run postman:test
```

## RBAC

| Feature | Admin | Sales |
|---|---:|---:|
| Create lead | Yes | Yes |
| View leads | Yes | Yes |
| Update lead | Yes | Yes |
| Delete lead | Yes | No |
| Export CSV | Yes | No |

The backend enforces RBAC. The frontend also hides restricted actions for Sales users.

## Filtering and Search

The leads API supports combined filters:

```text
/api/leads?status=Qualified&source=Instagram&search=rahul&page=1&sort=latest
```

Supported query params:

| Query | Purpose |
|---|---|
| `status` | Filter by `New`, `Contacted`, `Qualified`, `Lost` |
| `source` | Filter by `Website`, `Instagram`, `Referral` |
| `search` | Search by name or email |
| `sort` | `latest` or `oldest` |
| `page` | Paginated page number |

Frontend search is debounced by 500ms to avoid excessive API calls while typing.

## Deployment

Suggested deployment approach:

| Layer | Option |
|---|---|
| Frontend | Vercel, Netlify, or Docker static host |
| Backend | Render, Railway, Fly.io, or Docker host |
| Database | MongoDB Atlas |

Deployment placeholders:

| Resource | Link |
|---|---|
| Live Frontend | `https://your-frontend-url.example.com` |
| Live Backend | `https://your-backend-url.example.com/api` |
| Loom Demo | `https://your-demo-video.example.com` |

## Screenshots

Add screenshots before submission:

| Screen | Preview |
|---|---|
| Login | Pending |
| Dashboard | Pending |
| Leads table | Pending |
| Create/update modal | Pending |
| Mobile view | Pending |

## Build Verification

Backend:

```bash
cd backend
npm run build
```

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

## Recruiter Notes

GigFlow demonstrates a complete full-stack workflow: secure authentication, role-based access, real API integration, reusable frontend architecture, validation on both client and server, production build support, Docker setup, API documentation, and Postman testing.
