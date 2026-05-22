# DevPulse

DevPulse is a backend API for reporting bugs, requesting features, and tracking issue status inside a software team.

## Live URL

Add deployed URL here after Render deployment.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT based authentication
- Contributor and maintainer roles
- Create bug reports and feature requests
- Public issue list and issue details
- Issue filtering by type and status
- Issue sorting by newest or oldest
- Contributor issue update rules
- Maintainer issue update, delete, and metrics access

## Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- pg
- Raw SQL
- bcrypt
- jsonwebtoken

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
```

Create database tables:

```bash
npm run db:init
```

Run in development:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run production build:

```bash
npm start
```

## API Endpoints

### Auth

```txt
POST /api/auth/signup
POST /api/auth/login
```

### Issues

```txt
POST /api/issues
GET /api/issues
GET /api/issues/:id
PATCH /api/issues/:id
DELETE /api/issues/:id
```

### Metrics

```txt
GET /api/metrics
```

## Auth Header

Protected routes need this header:

```txt
Authorization: <JWT_TOKEN>
```

## Query Parameters

`GET /api/issues` supports:

```txt
sort=newest | oldest
type=bug | feature_request
status=open | in_progress | resolved
```

Example:

```txt
/api/issues?sort=newest&type=bug&status=open
```

## Database Schema

### users

| Field | Type |
| --- | --- |
| id | auto increment integer |
| name | string |
| email | unique string |
| password | hashed string |
| role | contributor or maintainer |
| created_at | timestamp |
| updated_at | timestamp |

### issues

| Field | Type |
| --- | --- |
| id | auto increment integer |
| title | string, max 150 characters |
| description | text, min 20 characters |
| type | bug or feature_request |
| status | open, in_progress, or resolved |
| reporter_id | user id |
| created_at | timestamp |
| updated_at | timestamp |

## Deployment

Recommended deployment:

```txt
Render
```

Set these environment variables in Render:

```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
```

Render settings:

```txt
Build Command: npm install && npm run build
Start Command: npm start
```

Run the database setup before testing the deployed API:

```bash
npm run db:init
```

## Success Response

```json
{
  "success": true,
  "message": "Operation description",
  "data": {}
}
```

## Error Response

```json
{
  "success": false,
  "message": "Error description",
  "errors": "Error details"
}
```
