"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | undefined;

function getConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return null;
  }

  return { url, key };
}

export function getSupabaseBrowserClient() {
  const config = getConfig();
  if (!config) {
    return null;
  }

  if (!browserClient) {
    const { url, key } = config;
    browserClient = createBrowserClient(url, key);
  }

  return browserClient;
}
