# Trackflow Panel — B2B Admin Dashboard

A full-featured admin dashboard for shipment tracking and team management. Built with Next.js 16, TypeScript 6, Supabase, and shadcn/ui.

## Features

- **Data Table** — sorting, filtering, search, and pagination (TanStack Table)
- **Role-based UI** — admins see user management + analytics; users see only their own shipments
- **Full CRUD** on shipments via Next.js API routes + Supabase
- **Profile Management** — update name, company, avatar preview
- **User Management** — invite users, change roles, remove users (admin only)
- **Analytics Dashboard** — shipment stats, status breakdown, recent activity, top routes (admin only)
- **Form validation** — Zod schemas with React Hook Form, loading states, success/error feedback
- **Mobile responsive** sidebar with drawer navigation

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Auth | NextAuth v5 (credentials + JWT) |
| Database | Supabase (PostgreSQL + RLS) |
| Table | TanStack Table v8 |
| Forms | React Hook Form + Zod 4 |
| Icons | Lucide React |

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
├── auth.ts                         # NextAuth v5 config (credentials + JWT)
├── app/
│   ├── globals.css                 # Tailwind v4 + dark theme tokens
│   ├── layout.tsx                  # Root layout (DM Sans + JetBrains Mono)
│   ├── page.tsx                    # Redirects to /app
│   ├── (panel)/
│   │   ├── layout.tsx              # Auth guard, passes session to PanelShell
│   │   ├── PanelShell.tsx          # Client shell: Sidebar + Topbar + MobileNav
│   │   ├── app/
│   │   │   └── page.tsx            # Shipments table (all roles)
│   │   ├── account/
│   │   │   └── page.tsx            # Profile settings (all roles)
│   │   └── admin/
│   │       ├── layout.tsx          # Admin-only guard
│   │       ├── users/
│   │       │   └── page.tsx        # User management (admin)
│   │       └── analytics/
│   │           └── page.tsx        # Stats + metrics (admin)
│   ├── api/
│   │   ├── account/route.ts        # GET/PATCH profile
│   │   ├── auth/[...nextauth]/     # NextAuth handler
│   │   ├── shipments/
│   │   │   ├── route.ts            # GET (list), POST (create)
│   │   │   └── [id]/route.ts       # PATCH, DELETE
│   │   └── users/route.ts          # GET all users (admin only)
│   └── auth/login/
│       └── page.tsx                # Credentials login form
├── components/
│   ├── layout/                     # Sidebar, Topbar, MobileNav
│   ├── shipments/                  # Table, Filters, Form, StatusBadge
│   ├── users/                      # UsersTable, InviteUserForm
│   ├── account/                    # ProfileForm, AvatarUpload, PasswordForm
│   └── ui/                         # shadcn/ui primitives
├── hooks/
│   ├── useShipments.ts             # CRUD hook with optimistic delete
│   ├── useUsers.ts                 # Users list with abort controller
│   └── useDebounce.ts              # Generic debounce for search
├── lib/
│   ├── supabase.ts                 # Browser client + server client (service role)
│   ├── validations.ts              # Zod schemas
│   └── utils.ts                    # cn(), formatDate(), getStatusColor(), timeAgo(), getInitials()
└── types/
    ├── index.ts                    # Shipment, Profile, ApiResponse, SessionUser
    └── database.ts                 # Supabase Database type
```

## Authentication

The app uses NextAuth v5 with a Supabase credentials provider. Set up test users in your Supabase project's Authentication section.

### Security Layers
1. **Middleware** — checks for valid session token on protected routes
2. **Panel layout** — server-side session check, redirects unauthenticated users
3. **Admin layout guard** — server-side role check redirects non-admins
4. **API route checks** — every admin API route verifies role server-side
5. **Supabase RLS** — row-level security enforces data access at the database level

## License

MIT © 2026 Amos Masarira
