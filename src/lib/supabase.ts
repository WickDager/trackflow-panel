import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Browser client - uses public keys, subject to RLS
export const browserClient: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  anonKey
);

// Server client - uses service role key, bypasses RLS
// ONLY use in API routes and server components
export const serverClient: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  serviceRoleKey
);

// Helper to get server client with typed database
export function getServerClient(): SupabaseClient<Database> {
  return createClient<Database>(supabaseUrl, serviceRoleKey);
}
