# BOBLE Web Chat

Chat with your friends and family from any device.

## Table of Contents

- [Tech and tools](#tech-and-tools)
- [Project structure](#project-structure)
- [Environment variables](#environment-variables)
- [Database setup](#database-setup)
- [Developing](#developing)
- [Deployment](#deployment)
- [List of commands](#list-of-commands)

## Tech and tools

**App**
- [Svelte](https://svelte.dev/): Front-end library that compiles declarative components into fast and lean web apps.
- [SvelteKit](https://kit.svelte.dev/): Framework for rapidly developing robust, performant web applications using Svelte. 
- [TailwindCSS](https://tailwindcss.com/): Utility-first, component driven CSS framework.

**WebSocket**
- [Socket.io](https://socket.io/): Library that enables low-latency, bidirectional and event-based communication between a client and a server.

**Database**
- [SQLite](https://www.sqlite.org/): Small, fast, self-contained, high-reliability, full-featured, SQL database engine.
- [Better-sqlite3](https://github.com/WiseLibs/better-sqlite3): The fastest and simplest library for SQLite3 in Node.js.
- [DrizzleORM](https://orm.drizzle.team/): TypeScript ORM that feels like writing SQL.

**Authentication**
- [Lucia](https://lucia-auth.com/): Simple and flexible auth library for TypeScript.

**Testing**
- [Vitest](https://vitest.dev/): Next generation testing framework powered by Vite.
- [Playwright](https://playwright.dev/): Reliable end-to-end testing for modern web apps. 

## Project structure

```
/
├── static/
│   └── Static assets to be served.
├── src/
│   ├── lib/
│   │   ├── auth/
│   │   │   └── Authentication using lucia.
│   │   ├── db/
│   │   │   └── Database config, schemas and queries using drizzle.
│   │   ├── socket/
│   │   │   └── WebSocket server using socket.io. 
│   │   ├── ui/
│   │   │   └── Reusable UI components.
│   │   └── utils/
│   │       └── Helper functions.
│   └── routes/
│       └── Routes of your application and co-located components and files.
│   
└── Config files.
```

## Installation

Clone this repository:

```
git clone https://github.com/marioperezhurtado/boble2.git
cd boble2
```

Install dependencies:

```
npm install
```

## Environment variables

To run this project, you will need to add the following environment variables to your `.env` file

```
# Oauth providers
GITHUB_ID=""
GITHUB_SECRET=""
```

You can create a copy of the `.env.example` file to `.env` and populate it with your secrets.

```
cp .env.example .env
```

## Database setup

This project uses SQLite with better-sqlite3, and DrizzleORM.

Your database will be stored in a single `sqlite.db` file at the root of your project, and your SQL migrations will be stored under the `drizzle/` folder.

The first time you run this project, and every time you make a change in your db schema, you will need to run the following commands to apply changes:

Generate a SQL migration file:

```
npm run db:generate
```

Push the changes to your database (or create one if it doesn't exist yet):

```
npm run db:push
```

You can check your tables and data using drizzle studio:

```
npm run db:studio
```

## Developing

Once you've created a project and installed dependencies with npm install *(or pnpm install or yarn, bun etc)*, populated your environment variables and set up your database, start a development server:

```
npm run dev
```

And start a WebSocket server:

```
npm run socket
```

## Deployment

TBD...

## List of commands

| Command | Description | 
| -------- | -------- | 
| dev | Start a development server on port 5173 | 
| socket | Start a websocket server on port 8000 |
| build | Create a production version of your app |
| preview | Preview your production build |
| check | Run diagnostic checks |
| lint | Lint your project |
| format | Format your project |
| db:generate | Generate a SQL migration file |
| db:push | Push your changes to your database |
| db:studio | Launch a visual editor for your database |
| test | Run all tests |
| test:unit | Run unit tests |
| test:integration | Run integration tests |

