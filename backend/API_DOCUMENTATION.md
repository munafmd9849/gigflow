# GigFlow Backend API Documentation

Production-style REST API for lead management, built with Node.js, Express, TypeScript, MongoDB, JWT authentication, RBAC, validation, filtering, pagination, and CSV export.

| Area | Stack |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Language | TypeScript |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Validation | Zod |
| Testing | Postman + Newman |

## Table of Contents

- [Project Overview](#project-overview)
- [Quick Start](#quick-start)
- [Deployment URLs](#deployment-urls)
- [Base URL](#base-url)
- [Architecture Overview](#architecture-overview)
- [Authentication](#authentication)
- [Security Features](#security-features)
- [Response Format](#response-format)
- [Auth Endpoints](#auth-endpoints)
- [Lead Endpoints](#lead-endpoints)
- [Filtering, Search, Sorting, and Pagination](#filtering-search-sorting-and-pagination)
- [RBAC Permissions](#rbac-permissions)
- [Validation Rules](#validation-rules)
- [Error Codes](#error-codes)
- [CSV Export](#csv-export)
- [Testing](#testing)
- [Scalability and Engineering Decisions](#scalability-and-engineering-decisions)
- [Highlights](#highlights)

## Project Overview

GigFlow API is the backend for a sales lead management platform. It supports secure user authentication, role-aware access control, lead CRUD workflows, query-based discovery, pagination, and CSV reporting.

The project is structured as a maintainable backend service rather than a monolithic route file. Business logic is separated from HTTP handling, middleware is reusable, and API contracts are validated before data reaches controllers.

## Quick Start

Install dependencies:

```bash
cd backend
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Environment variables:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/gigflow
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Run compiled build:

```bash
npm start
```

## Deployment URLs

| Service | URL |
|---|---|
| Frontend | `https://your-frontend-deployment.example.com` |
| Backend API | `https://your-backend-deployment.example.com/api` |
| Local API | `http://localhost:5000/api` |
| Health Check | `http://localhost:5000/health` |

## Base URL

```text
http://localhost:5000/api
```

All endpoint paths below are relative to the base URL.

## Architecture Overview

| Layer | Responsibility |
|---|---|
| Routes | Define endpoint paths and compose middleware |
| Controllers | Handle request/response flow |
| Services | Own business logic and database operations |
| Models | Define MongoDB schemas, indexes, and persistence rules |
| Middleware | Authentication, RBAC, validation, and error handling |
| Types | Shared TypeScript contracts for API data |

Request flow:

```text
Client -> Express Route -> Auth Middleware -> RBAC Middleware -> Zod Validation -> Controller -> Service -> Mongoose Model -> MongoDB
```

Key flows:

| Flow | Implementation |
|---|---|
| Controller/service separation | Controllers stay thin; services handle persistence and business logic. |
| Middleware flow | Authentication runs before protected controllers; RBAC runs before restricted actions. |
| Validation flow | Zod validates body, params, and query input before controller execution. |
| RBAC flow | `req.user.role` is checked against allowed roles for each restricted route. |

## Authentication

🔐 GigFlow uses JWT Bearer authentication. Login and register responses include a token. Protected routes require that token in the `Authorization` header.

```http
Authorization: Bearer <token>
```

JWT payload:

```json
{
  "userId": "6650f6f2c8a5a4b8a1c01234"
}
```

Roles:

| Role | Access Summary |
|---|---|
| `Admin` | Full access, including delete and CSV export |
| `Sales` | Create, read, and update leads |

## Security Features

| Feature | Purpose |
|---|---|
| bcrypt password hashing | Stores hashed passwords instead of plain text |
| JWT authentication | Stateless access control for protected routes |
| Protected routes | Blocks unauthenticated access to user and lead resources |
| RBAC | Restricts sensitive actions by role |
| Zod validation | Prevents malformed input from reaching business logic |
| Centralized error handling | Keeps API errors consistent and prevents raw server errors from leaking |

## Response Format

Success:

```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {}
}
```

Paginated success:

```json
{
  "success": true,
  "message": "Leads fetched successfully",
  "data": {
    "leads": []
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 24,
    "pages": 3
  }
}
```

Error:

```json
{
  "success": false,
  "message": "Unauthorized: invalid token"
}
```

## Auth Endpoints

### 🟢 Register User

| Property | Value |
|---|---|
| Method | `POST` |
| Path | `/auth/register` |
| Access | Public |
| Purpose | Create a user and return an auth token |

Headers:

```http
Content-Type: application/json
```

Request body:

```json
{
  "name": "Aarav Mehta",
  "email": "aarav.mehta@gigflow.dev",
  "password": "Password123",
  "role": "Admin"
}
```

Validation:

| Field | Required | Rules |
|---|---:|---|
| `name` | Yes | Trimmed string, 2-80 characters |
| `email` | Yes | Valid email, lowercased |
| `password` | Yes | Minimum 8 characters |
| `role` | No | `Admin` or `Sales`; defaults to `Sales` |

Success response: `201 Created`

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "6650f6f2c8a5a4b8a1c01234",
      "name": "Aarav Mehta",
      "email": "aarav.mehta@gigflow.dev",
      "role": "Admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

Error examples:

```json
{
  "success": false,
  "message": "Password must be at least 8 characters"
}
```

```json
{
  "success": false,
  "message": "Email is already registered"
}
```

### 🟢 Login User

| Property | Value |
|---|---|
| Method | `POST` |
| Path | `/auth/login` |
| Access | Public |
| Purpose | Authenticate a user and return an auth token |

Headers:

```http
Content-Type: application/json
```

Request body:

```json
{
  "email": "aarav.mehta@gigflow.dev",
  "password": "Password123"
}
```

Validation:

| Field | Required | Rules |
|---|---:|---|
| `email` | Yes | Valid email, lowercased |
| `password` | Yes | Non-empty string |

Success response: `200 OK`

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "6650f6f2c8a5a4b8a1c01234",
      "name": "Aarav Mehta",
      "email": "aarav.mehta@gigflow.dev",
      "role": "Admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

Error example:

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### 🔒 Get Current User

| Property | Value |
|---|---|
| Method | `GET` |
| Path | `/auth/me` |
| Access | Authenticated |
| Purpose | Return the current authenticated user |

Headers:

```http
Authorization: Bearer <token>
```

Request body: none

Success response: `200 OK`

```json
{
  "success": true,
  "message": "Authenticated user fetched successfully",
  "data": {
    "user": {
      "id": "6650f6f2c8a5a4b8a1c01234",
      "name": "Aarav Mehta",
      "email": "aarav.mehta@gigflow.dev",
      "role": "Admin"
    }
  }
}
```

Error examples:

```json
{
  "success": false,
  "message": "Unauthorized: token missing"
}
```

```json
{
  "success": false,
  "message": "Unauthorized: invalid token"
}
```

## Lead Endpoints

Lead enums:

| Field | Values |
|---|---|
| `status` | `New`, `Contacted`, `Qualified`, `Lost` |
| `source` | `Website`, `Instagram`, `Referral` |

### 🔒 Create Lead

| Property | Value |
|---|---|
| Method | `POST` |
| Path | `/leads` |
| Access | `Admin`, `Sales` |
| Purpose | Create a new lead |

Headers:

```http
Authorization: Bearer <token>
Content-Type: application/json
```

Request body:

```json
{
  "name": "Rahul Sharma",
  "email": "rahul.sharma@pixelcraft.in",
  "status": "New",
  "source": "Instagram"
}
```

Validation:

| Field | Required | Rules |
|---|---:|---|
| `name` | Yes | Trimmed string, 2-120 characters |
| `email` | Yes | Valid email, lowercased |
| `status` | No | Valid lead status; defaults to `New` |
| `source` | Yes | Valid lead source |

Success response: `201 Created`

```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "lead": {
      "id": "66510188f3e4c8c1a5d02468",
      "name": "Rahul Sharma",
      "email": "rahul.sharma@pixelcraft.in",
      "status": "New",
      "source": "Instagram",
      "createdAt": "2026-05-17T09:30:00.000Z",
      "updatedAt": "2026-05-17T09:30:00.000Z"
    }
  }
}
```

Error examples:

```json
{
  "success": false,
  "message": "Invalid email address"
}
```

```json
{
  "success": false,
  "message": "Forbidden"
}
```

### 🔒 List Leads

| Property | Value |
|---|---|
| Method | `GET` |
| Path | `/leads` |
| Access | `Admin`, `Sales` |
| Purpose | Fetch paginated leads with optional filters and search |

Headers:

```http
Authorization: Bearer <token>
```

Query params:

| Param | Required | Description | Example |
|---|---:|---|---|
| `page` | No | Positive page number | `page=2` |
| `status` | No | Filter by lead status | `status=Qualified` |
| `source` | No | Filter by lead source | `source=Instagram` |
| `search` | No | Search name or email | `search=rahul` |
| `sort` | No | `latest` or `oldest` | `sort=latest` |

Example request:

```http
GET /api/leads?status=Qualified&source=Instagram&search=rahul&page=1&sort=latest
Authorization: Bearer <token>
```

Success response: `200 OK`

```json
{
  "success": true,
  "message": "Leads fetched successfully",
  "data": {
    "leads": [
      {
        "id": "66510188f3e4c8c1a5d02468",
        "name": "Rahul Sharma",
        "email": "rahul.sharma@pixelcraft.in",
        "status": "Qualified",
        "source": "Instagram",
        "createdAt": "2026-05-17T09:30:00.000Z",
        "updatedAt": "2026-05-17T10:15:00.000Z"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

Error example:

```json
{
  "success": false,
  "message": "Invalid option: expected one of \"New\"|\"Contacted\"|\"Qualified\"|\"Lost\""
}
```

### 🔒 Get Lead By ID

| Property | Value |
|---|---|
| Method | `GET` |
| Path | `/leads/:id` |
| Access | `Admin`, `Sales` |
| Purpose | Fetch a single lead by ID |

Headers:

```http
Authorization: Bearer <token>
```

Path params:

| Param | Required | Rules |
|---|---:|---|
| `id` | Yes | Non-empty lead ID |

Success response: `200 OK`

```json
{
  "success": true,
  "message": "Lead fetched successfully",
  "data": {
    "lead": {
      "id": "66510188f3e4c8c1a5d02468",
      "name": "Rahul Sharma",
      "email": "rahul.sharma@pixelcraft.in",
      "status": "Qualified",
      "source": "Instagram",
      "createdAt": "2026-05-17T09:30:00.000Z",
      "updatedAt": "2026-05-17T10:15:00.000Z"
    }
  }
}
```

Error example:

```json
{
  "success": false,
  "message": "Lead not found"
}
```

### 🔒 Update Lead

| Property | Value |
|---|---|
| Method | `PATCH` |
| Path | `/leads/:id` |
| Access | `Admin`, `Sales` |
| Purpose | Update one or more lead fields |

Headers:

```http
Authorization: Bearer <token>
Content-Type: application/json
```

Path params:

| Param | Required | Rules |
|---|---:|---|
| `id` | Yes | Non-empty lead ID |

Request body:

```json
{
  "status": "Qualified",
  "source": "Referral"
}
```

Validation:

| Field | Required | Rules |
|---|---:|---|
| `name` | No | Trimmed string, 2-120 characters |
| `email` | No | Valid email, lowercased |
| `status` | No | Valid lead status |
| `source` | No | Valid lead source |

At least one field is required.

Success response: `200 OK`

```json
{
  "success": true,
  "message": "Lead updated successfully",
  "data": {
    "lead": {
      "id": "66510188f3e4c8c1a5d02468",
      "name": "Rahul Sharma",
      "email": "rahul.sharma@pixelcraft.in",
      "status": "Qualified",
      "source": "Referral",
      "createdAt": "2026-05-17T09:30:00.000Z",
      "updatedAt": "2026-05-17T10:15:00.000Z"
    }
  }
}
```

Error example:

```json
{
  "success": false,
  "message": "At least one field is required"
}
```

### 🔒 Delete Lead

| Property | Value |
|---|---|
| Method | `DELETE` |
| Path | `/leads/:id` |
| Access | `Admin` only |
| Purpose | Permanently delete a lead |

Headers:

```http
Authorization: Bearer <token>
```

Path params:

| Param | Required | Rules |
|---|---:|---|
| `id` | Yes | Non-empty lead ID |

Success response: `200 OK`

```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

Error examples:

```json
{
  "success": false,
  "message": "Forbidden"
}
```

```json
{
  "success": false,
  "message": "Lead not found"
}
```

### 🔒 Export Leads CSV

| Property | Value |
|---|---|
| Method | `GET` |
| Path | `/leads/export/csv` |
| Access | `Admin` only |
| Purpose | Download all leads as a CSV file |

Headers:

```http
Authorization: Bearer <token>
```

Response headers:

```http
Content-Type: text/csv
Content-Disposition: attachment; filename="leads.csv"
```

CSV output:

```csv
ID,Name,Email,Status,Source,Created At,Updated At
66510188f3e4c8c1a5d02468,Rahul Sharma,rahul.sharma@pixelcraft.in,Qualified,Instagram,2026-05-17T09:30:00.000Z,2026-05-17T10:15:00.000Z
```

Error example:

```json
{
  "success": false,
  "message": "Forbidden"
}
```

## Filtering, Search, Sorting, and Pagination

The lead list API is designed for dashboard tables and debounced search inputs.

Example combined query:

```http
GET /api/leads?status=Qualified&source=Instagram&search=rahul&page=1&sort=latest
Authorization: Bearer <token>
```

| Feature | Behavior |
|---|---|
| Combined filters | `status`, `source`, and `search` can be used together |
| Search | Case-insensitive match against lead `name` and `email` |
| Pagination | Fixed page size of 10 leads |
| Latest sort | `createdAt` descending |
| Oldest sort | `createdAt` ascending |

Useful examples:

```http
GET /api/leads?page=2&sort=oldest
GET /api/leads?status=Contacted
GET /api/leads?source=Referral
GET /api/leads?search=enterprise
GET /api/leads?status=Qualified&source=Instagram&search=rahul&page=1&sort=latest
```

## RBAC Permissions

| Feature | Admin | Sales |
|---|---:|---:|
| Register | Yes | Yes |
| Login | Yes | Yes |
| View current user | Yes | Yes |
| Create lead | Yes | Yes |
| List leads | Yes | Yes |
| View lead by ID | Yes | Yes |
| Update lead | Yes | Yes |
| Delete lead | Yes | No |
| Export CSV | Yes | No |

## Validation Rules

| Area | Rules |
|---|---|
| Email | Must be valid and is normalized to lowercase |
| Required fields | Required body fields are enforced before controller execution |
| Enums | `role`, `status`, `source`, and `sort` must match allowed values |
| Pagination | `page` is coerced to a number and must be a positive integer |
| Update lead | At least one updatable field is required |

## Error Codes

| Status | Meaning | Common Cause |
|---:|---|---|
| `400` | Bad Request | Invalid body, params, or query values |
| `401` | Unauthorized | Missing, invalid, or expired token |
| `403` | Forbidden | Role does not permit the action |
| `404` | Not Found | Route or lead resource does not exist |
| `409` | Conflict | Email already registered |
| `500` | Internal Server Error | Unexpected server failure |

## CSV Export

CSV export is restricted to Admin users and is intended for reporting or operational handoff.

| Export Detail | Value |
|---|---|
| Endpoint | `GET /leads/export/csv` |
| Access | `Admin` only |
| Filename | `leads.csv` |
| Sort | Newest first |
| Columns | `ID`, `Name`, `Email`, `Status`, `Source`, `Created At`, `Updated At` |

## Testing

Postman collection:

```text
backend/postman/GigFlow.postman_collection.json
backend/postman/GigFlow.local.postman_environment.json
```

Manual Postman flow:

1. Import the collection and local environment.
2. Set `baseUrl` to `http://localhost:5000`.
3. Register or login as an Admin user.
4. Copy the returned token into the environment token variable.
5. Test `/auth/me`, lead CRUD, filters, pagination, and CSV export.
6. Repeat with a Sales user to verify RBAC restrictions.

Newman support:

```bash
npm run postman:test
```

Generate a JSON test report:

```bash
npm run postman:test:report
```

## Scalability and Engineering Decisions

| Decision | Why It Matters |
|---|---|
| TypeScript | Provides safer request contracts, stricter service boundaries, and better refactoring support |
| Service layer | Keeps business logic reusable and independent from Express request objects |
| Centralized errors | Produces consistent API responses and simplifies controller code |
| Reusable middleware | Makes authentication, RBAC, and validation composable across modules |
| Pagination | Prevents unbounded database reads and keeps dashboard responses predictable |
| Filtering strategy | Supports practical CRM workflows without adding separate endpoints for each query |
| Controller/service split | Makes the backend easier to test, extend, and review |

## Highlights

| Highlight | Status |
|---|---|
| JWT authentication | Implemented |
| bcrypt password hashing | Implemented |
| Protected routes | Implemented |
| Admin/Sales RBAC | Implemented |
| Lead CRUD | Implemented |
| Debounced-search-ready API | Implemented |
| Advanced filtering | Implemented |
| Pagination metadata | Implemented |
| CSV export | Implemented |
| Zod validation | Implemented |
| Centralized error handling | Implemented |
| Scalable backend architecture | Implemented |

