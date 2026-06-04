# Todo App

Full-stack Todo application with React client and Express + Prisma server.

## Project Structure

- `client/` - React frontend built with Vite and Tailwind CSS.
- `server/` - Express backend with Prisma, PostgreSQL, authentication, and task APIs.
- `client/package.json` - Frontend package manifest.
- `server/package.json` - Backend package manifest.

> Root directory contains only `client/`, `server/`, and `.gitignore`.

## Features

- User registration and login with JWT stored in HTTP-only cookies.
- Task CRUD operations connected to PostgreSQL via Prisma.
- Protected API routes for authenticated users.
- Client-side routing with React Router.

## Prerequisites

- Node.js 18+ (recommended)
- npm
- PostgreSQL database

## Environment Variables

Create a `.env` file in the project root or in `server/` with at least:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
ACCESS_TOKEN_SECRET=your_secret_here
NODE_ENV=development
```

> `DATABASE_URL` must match your PostgreSQL connection.
> `ACCESS_TOKEN_SECRET` is used to sign JWT tokens.

## Setup

### 1. Install server dependencies

From the `server/` folder:

```bash
cd "d:\\Full Stack AI\\todo-app\\server"
npm install
```

### 2. Install client dependencies

From the `client/` folder:

```bash
cd "d:\Full Stack AI\todo-app\client"
npm install
```

### 3. Configure the database

Make sure the PostgreSQL database exists and `DATABASE_URL` is correct.

If you need to run Prisma migrations, use the `server` package or root package depending on your setup.

## Running the App

### Start the server

From the `server/` folder:

```bash
cd "d:\\Full Stack AI\\todo-app\\server"
npm run dev
```

This will start the Express backend at port `5000` by default.

### Start the client

From the `client/` folder:

```bash
cd "d:\\Full Stack AI\\todo-app\\client"
npm run dev
```

The React app runs on port `3000` and proxies `/api` requests to the backend.

## Available Scripts

### Server

From `server/`:

- `npm start` - Run production server with `node ./server/server.js`.
- `npm run dev` - Run server in watch mode with environment file support.

### Client

From `client/`:

- `npm run dev` - Start Vite development server.
- `npm run build` - Build frontend for production.
- `npm run preview` - Preview built frontend.
- `npm run lint` - Run ESLint on the client code.

## Notes

- The server reads cookies using `cookie-parser` and validates JWTs in `server/middleware/auth.js`.
- Task operations are implemented in `server/controllers/taskController.js` and are scoped by `req.user.id`.
- The frontend authenticates using `credentials: "include"` to send cookies with API requests.

## Troubleshooting

- If login returns `401`, confirm the backend is running and `ACCESS_TOKEN_SECRET` matches between the token creation and verification.
- If database access fails, verify `DATABASE_URL` and that PostgreSQL accepts connections.
- If frontend cannot reach APIs, ensure the client proxy in `client/vite.config.js` is configured to `http://localhost:5000`.
