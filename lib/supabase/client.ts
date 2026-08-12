import { createClient } from "@supabase/supabase-js";

// Browser-side Supabase client. Uses the public (anon/publishable) key,
// which is safe to expose to the client — access is controlled by
// Row Level Security (RLS) policies on each table in Supabase, not by
// keeping this key secret.
//
// Use this in Client Components ("use client") — e.g. for the
// newsletter form, sign-in forms, or any client-side read/write.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Check your .env.local file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
