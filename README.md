# Trackflow Panel - B2B Admin Dashboard

A full-featured admin dashboard built with Next.js 14, TypeScript, Supabase, and shadcn/ui.

## Features

- **Data Table** with sorting, filtering, search, and pagination (TanStack Table)
- **Role-based UI** - admins see user management + analytics; users see only their own shipments
- **Full CRUD** on shipments via Next.js API routes + Supabase
- **Profile Management** - update name, company, avatar preview
- **User Management** - invite users, change roles, remove users (admin only)
- **Analytics Dashboard** - shipment stats, status breakdown, recent activity, top routes (admin only)
- **All forms**: Zod validation, loading states, success/error feedback
- **Mobile responsive** sidebar with drawer navigation

## Tech Stack

- **Next.js 14** (App Router) · **TypeScript**
- **Tailwind CSS** · **shadcn/ui**
- **NextAuth v5** (JWT sessions)
- **Supabase** (PostgreSQL + RLS)
- **TanStack Table** (headless table logic)
- **Zod** + **React Hook Form**

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase-setup.sql` in the Supabase SQL Editor
3. Copy `.env.local.example` to `.env.local` and fill in your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
NEXTAUTH_URL=http://localhost:3000
```

Generate `NEXTAUTH_SECRET` with:
```bash
openssl rand -base64 32
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (panel)/           # Authenticated dashboard
│   │   ├── app/           # Shipments table (all roles)
│   │   ├── account/       # Profile settings
│   │   └── admin/         # Admin-only routes
│   │       ├── users/     # User management
│   │       └── analytics/ # Stats + metrics
│   ├── api/               # API routes
│   │   ├── shipments/     # CRUD for shipments
│   │   ├── users/         # List users (admin)
│   │   └── account/       # Profile update
│   └── auth/login/        # Login page
├── components/
│   ├── layout/            # Sidebar, Topbar, MobileNav
│   ├── shipments/         # Table, filters, form, badge
│   ├── users/             # Users table, invite form
│   ├── account/           # Profile, avatar, password forms
│   └── ui/                # shadcn/ui components
├── hooks/                 # useShipments, useUsers, useDebounce
├── lib/                   # Supabase client, Zod schemas, utils
├── types/                 # TypeScript type definitions
└── auth.ts                # NextAuth configuration
```

## Authentication

The app uses NextAuth v5 with Supabase credentials provider. Set up test users in your Supabase project's Authentication section.

### Security Layers
1. **Middleware** - checks for valid session token on protected routes
2. **Admin layout guard** - server-side role check redirects non-admins
3. **API route checks** - every admin API route verifies role server-side
4. **Supabase RLS** - row-level security enforces data access at the database level

## What I fixed manually after generation

- TanStack Table column helper types needed explicit generic parameters
- Supabase typed client `.update()`/`.insert()` strict mode required `as any` cast on the client
- Zod schemas with `.default()` caused RHF type mismatches - removed defaults, set in `defaultValues`
- `toggleSorting()` expected `boolean | undefined` but `getIsSorted()` returns `false | 'asc' | 'desc'` - wrapped with `!!`
- Supabase client generic typing required explicit `<Database>` on all client instances

## Deploy

```bash
npm run build
vercel deploy
```

Add your environment variables in the Vercel dashboard.
