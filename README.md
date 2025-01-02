## Prisma

[tutorial](https://dev.to/skipperhoa/how-to-build-a-crud-app-with-nextjs-and-prisma-postgresql-4l79)

```bash
# update database with new prisma schema
npx prisma migrate dev
# edit data
npx prisma studio
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### What I learned

- Prisma generates TypeScript types for your models based on the schema. This ensures your frontend and backend code use the same types, reducing the likelihood of type mismatches.
- Prisma simplifies database migrations by generating migration files based on schema changes
- Updating the local state first and syncing with the server afterward is preferred over refreshing the entire list from the server considering it's a todo list.
- "use client"
