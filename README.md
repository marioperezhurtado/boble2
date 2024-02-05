# BOBLE Web Chat

Chat with your friends and family from any device.

## Table of Contents

- [Tech and tools](#tech-and-tools)
- [External services](#external-services)
- [Project structure](#project-structure)
- [End-to-end encryption](#end-to-end-encryption)
- [WebSockets](#websockets)
- [Installation](#installation)
- [Environment variables](#environment-variables)
- [Database setup](#database-setup)
- [Email setup](#email-setup)
- [Developing](#developing)
- [Deployment](#deployment)
- [Visualize bundle](#visualize-bundle)
- [List of commands](#list-of-commands)

## Tech and tools

**App**
- [Svelte](https://svelte.dev/): Front-end library that compiles declarative components into fast and lean web apps.
- [SvelteKit](https://kit.svelte.dev/): Framework for rapidly developing robust, performant web applications using Svelte. 
- [TailwindCSS](https://tailwindcss.com/): Utility-first, component driven CSS framework.
- [tRPC](https://trpc.io/): End-to-end typesafe APIs made easy.

**WebSocket**
- [Socket.io](https://socket.io/): Library that enables low-latency, bidirectional and event-based communication between a client and a server.

**Database**
- [PostgreSQL](https://www.postgresql.org/): Powerfull, open source object-relational database system.
- [DrizzleORM](https://orm.drizzle.team/): TypeScript ORM that feels like writing SQL.

**Authentication**
- [Lucia](https://lucia-auth.com/): Simple and flexible auth library for TypeScript.

**Email**
- [Nodemailer](https://nodemailer.com/): Send emails from Node.js.
- [Svelte-email](https://svelte-email.vercel.app/docs/overview/svelte-email): Build emails using Svelte components.

**Testing**
- [Vitest](https://vitest.dev/): Next generation testing framework powered by Vite.
- [Playwright](https://playwright.dev/): Reliable end-to-end testing for modern web apps. 

## External services

- [SendGrid](https://sendgrid.com/): SMTP provider.
- [Giphy](https://developers.giphy.com/): GIF & sticker API.
- [Amazon S3](https://aws.amazon.com/s3/): Object storage.

## Project structure

```
/
├── drizzle/
│   └── SQL migrations.
├── tests/
│   └── Tests.
├── s3/
│   └── Fake S3 server used for development.
├── static/
│   └── Static assets to be served.
│   
├── src/
│   ├── lib/
│   │   ├── auth/
│   │   │   └── Authentication using lucia.
│   │   ├── db/
│   │   │   └── Database config, schemas and queries using drizzle.
│   │   ├── trpc/
│   │   │   └── tRPC config, routers and procedures.
│   │   ├── socket/
│   │   │   └── WebSockets using socket.io. 
│   │   ├── email/
│   │   │   └── Email config, templates and functions.
│   │   ├── file-upload/
│   │   │   └── File uploads using Amazon S3 SDK.
│   │   ├── ui/
│   │   │   └── Reusable UI components.
│   │   ├── actions/
│   │   │   └── Reusable element behaviors.
│   │   └── utils/
│   │       └── Helper functions.
│   │
│   └── routes/
│       └── Routes of your application and co-located components and files.
│   
└── Config files.
```

[Reference](https://kit.svelte.dev/docs/project-structure)

## End-to-end encryption

End-to-End Encryption (E2EE) ensures that only the intended participants can
access the content of a conversation. Because the content of the messages is
encrypted using a shared secret that only both ends know, no one else can
read the messages, not even the server.

This project uses the native [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) to
implement end-to-end encryption. You can find the implementation at `src/lib/utils/encryption.ts`.

### [ECDH](https://en.wikipedia.org/wiki/Elliptic-curve_Diffie%E2%80%93Hellman)

Elliptic-curve Diffie–Hellman (ECDH) is an anonymous key agreement protocol that allows two parties, each having an elliptic-curve public–private key pair, to establish a shared secret over an insecure channel.

We use the [P-256](https://neuromancer.sk/std/nist/P-256) curve, which is the most widely supported curve in browsers, and has a good balance between security and performance.

### [AES-GCM](https://en.wikipedia.org/wiki/Galois/Counter_Mode)

AES-GCM is an authenticated encryption with associated data (AEAD) cipher. It is
based on the Advanced Encryption Standard (AES) algorithm and the Galois/Counter
Mode (GCM) block mode. It provides both encryption and message authentication.

The simplistic implementation of end-to-end encryption in this project is based on the
following steps:

1. User generates a public/private key pair.

2. User sends their public key, and the private key encrypted with their
password, to the server. Account is created.

3. User logs in. Server sends the encrypted private key to the user.

4. User decrypts the private key with their password.

5. User generates a shared secret using their private key and the other user's
public key. (Diffie-Hellman key exchange)

6. User stores shared secrets locally. (localStorage)

7. Both users in chat encrypt and decrypt messages using the shared secret.

8. User logs out. Private and shared keys are deleted from localStorage.

This implementation is not perfect, and it has some flaws:

- One private key per account.
- One shared secret per chat.
- No key rotation.
- No forward secrecy.

## WebSockets

This project uses [Socket.io](https://socket.io/) to enable real-time, bidirectional and event-based communication between the client and the server.

As of today, SvelteKit does not have native support for WebSockets.

One solution is to create a separate server, but we can build a solution to
integrate it into our SvelteKit server.

### WebSockets for development

In development, we use a simple vite plugin to hook into the development server.

(See `vite.config.js`)

### WebSockets for production

With SvelteKit node adapter, we can create a [custom
server](https://kit.svelte.dev/docs/adapter-node#custom-server) to handle WebSockets.

(See `server.js`)


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
# Private
# SMTP
SENDGRID_API_KEY=""
SENDER_ADDRESS=""
SENDER_NAME=""

# GIF 
GIPHY_API_KEY=""

# S3
S3_ACCESS_KEY_ID="S3RVER"
S3_SECRET_ACCESS_KEY="S3RVER"

# Public
PUBLIC_SITE_URL="http://localhost:5173"

PUBLIC_S3_URL="http://localhost:5000"
PUBLIC_S3_BUCKET_URL="http://localhost:5000/<bucket-name>"
```

You can create a copy of the `.env.example` file to `.env` and populate it with your secrets.

```
cp .env.example .env
```

## Database setup

This project uses [PostgreSQL](https://www.postgresql.org/) and [DrizzleORM](https://orm.drizzle.team/).

- Install postgres in your local machine.

- Log-in to and create your database.

```
sudo -u postgres psql
```

```
CREATE DATABASE db_name;
```

- Populate your .env with your database connection string.

```
DATABASE_URL="postgres://username:password@host:port/db_name",
```

The first time you run this project, and every time you make a change in your db
schema, you will neeed to push the changes to your database (or create one if it doesn't exist yet):

```
npm run db:push
```

You can check your tables and data using drizzle studio:

```
npm run db:studio
```

## Email setup

This project uses [Nodemailer](https://nodemailer.com/) to send emails, and [SendGrid](https://sendgrid.com/) as a SMTP provider.

There are several alternatives that you could use as SMPT provider ([Mailgun](https://www.mailgun.com/), [AWS SES](https://aws.amazon.com/es/ses/), etc).

If you choose to use SendGrid:

- Create your account.
- Create a verified single sender. (You can choose a real email, or setup your domain, e.g. noreply@your-domain.com)
- Create your API key.
- Populate your .env.

[Reference](https://midnightgamer.medium.com/how-to-use-sendgrid-with-nodemailer-to-send-mails-a289f30af622)

If you choose a different provider, you might need to change the email config at
`src/lib/email/email.ts`.

## Developing

Once you've created a project and installed dependencies with npm install *(or
pnpm, yarn, bun etc)*, populated your environment variables and followed the
previous steps,

Start a development server:

```
npm run dev
```

Start a fake S3 server:

```
npm run s3
```

## Deployment

This project is deployed to [Railway](https://railway.app/).

### Set up your S3 bucket for production:

- Create an account in AWS.
- Create a new S3 bucket with public access.
- Create a new IAM user with programmatic access and S3 full access.
- Set up your bucket policy: 

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<bucket-name>/*"
        }
    ]
}
```

- Set up your CORS configuration:

```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

- Copy your access key and secret key to your `.env` file.

[Reference](https://youtu.be/_DRklnnJbig)

### Set up your Postgres database

Depending on where you deploy to, this part can be different.

In Railway:

- Go to your project.
- Right click > Add New Service > Database.
- Add PostgreSQL.
- Click on your repository > Variables > Shared Variable.
- Add DATABASE_URL.
- Deploy.


## Visualize bundle

This project uses
[rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer) to
analyze your bundle and see which modules are taking up space.

To visualize your bundle, run:

```
npm run build
```

Then open the generated html file in your browser. You can find it
in `.svelte-kit/output/client/stats.html`.

## List of commands

| Command | Description | 
| -------- | -------- | 
| dev | Start a development server on port 5173 | 
| build | Create a production version of your app |
| preview | Preview your production build |
| start | Start a production server |
| s3 | Start a fake S3 server on port 5000 |
| check | Run diagnostic checks |
| lint | Lint your project |
| format | Format your project |
| db:generate | Generate a SQL migration file |
| db:push | Push your changes to your database |
| db:studio | Launch a visual editor for your database on local.drizzle.studio |
| test | Run all tests |
| test:unit | Run unit tests |
| test:integration | Run integration tests |
