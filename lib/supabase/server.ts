import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client for use in Route Handlers, Server
// Actions, and Server Components. Currently uses the same public key
// as the browser client (protected by RLS policies).
//
// If you later need to bypass RLS for trusted server-only work (e.g.
// an admin dashboard, or verifying payments from a webhook), create a
// SEPARATE client using the `service_role` key, and only ever read
// that key from a server-only env var (no NEXT_PUBLIC_ prefix) so it
// is never sent to the browser.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Check your .env.local file."
  );
}

export function createServerSupabaseClient() {
  return createClient(supabaseUrl, supabaseKey);
}
