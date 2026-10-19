# Family Movie Watchlist API

A Node.js and Express API for family movie watchlists. It includes JWT authentication and role-based modification permissions for parents and children.

## Setup

1. Copy `.env.example` to `.env`.
2. Set a private `JWT_SECRET` in `.env`.
3. Install dependencies and start the API.

```bash
npm install
npm start
```

The server defaults to port 3000.

## Login

Send `POST /api/auth/login` with JSON containing `username` and `password`. A successful response includes a JWT `token`. Supply it to watchlist endpoints using `Authorization: Bearer <token>`.

Seeded accounts use these credentials for local lab testing:

| Username | Password | Role |
| --- | --- | --- |
| `dad_miller` | `parent456` | parent |
| `mom_miller` | `parent123` | parent |
| `jake_miller` | `child123` | child |
| `sophie_miller` | `child456` | child |

## Endpoints

- `POST /api/auth/login` — obtain an access token.
- `GET /api/watchlist/:userId` — read a family member's watchlist for any authenticated user.
- `POST /api/watchlist/:userId/movies` — add a movie.
- `PUT /api/watchlist/:userId/movies/:movieId` — update a movie.
- `DELETE /api/watchlist/:userId/movies/:movieId` — delete a movie.

Parents may modify every family member's list. Children may modify their own list only.

> This repository's seeded accounts and credentials are for local educational testing only. Set a unique random JWT secret before deployment.
