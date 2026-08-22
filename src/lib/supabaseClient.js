import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Surfaces a clear error in the console/build instead of a confusing "fetch failed" from deep inside
  // supabase-js if the .env (or repo/CI secrets) haven't been set up yet.
  console.error(
    "Missing Supabase env vars. Copy .env.example to .env and fill in " +
    "VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY from your Supabase project's Settings -> API page."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
