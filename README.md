# DevPulse

DevPulse is a backend API project for an internal issue tracker. Users can register, login, create issues, view issues, and maintainers can manage the issues.

## Live URL

https://devpulse-o72j.onrender.com

## Features

- User registration and login
- Passwords are hashed before saving
- JWT authentication
- Contributor and maintainer roles
- Contributors can create bug reports and feature requests
- Anyone can view the issue list and single issue details
- Issue filtering by type and status
- Issue sorting by newest or oldest first
- Contributors can update their own open issues
- Maintainers can update and delete issues
- Maintainers can view basic system metrics

## Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- pg package
- Raw SQL with `pool.query()`
- bcrypt
- jsonwebtoken

## Setup

First install all packages:

```bash
npm install
```

Then create a `.env` file in the root folder:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
```

Run this command to create the database tables:

```bash
npm run db:init
```

Start the server in development mode:

```bash
npm run dev
```

For production build:

```bash
npm run build
```

Run the built project:

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

For protected routes, send the token like this:

```txt
Authorization: <JWT_TOKEN>
```

## Query Parameters

The `GET /api/issues` endpoint supports these query parameters:

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
| password | hashed password |
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

This project can be deployed on Render.

Environment variables needed in Render:

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

Before testing the deployed API, the database tables should be created:

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
