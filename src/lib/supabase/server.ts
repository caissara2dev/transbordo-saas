import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

function getConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase public environment variables are missing.");
  }

  return { url, key };
}

export async function getSupabaseServerClient() {
  const cookieStore = await cookies();
  const { url, key } = getConfig();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const cookie of cookiesToSet) {
            cookieStore.set(cookie.name, cookie.value, cookie.options);
          }
        } catch {
          // Route handlers can write cookies. Server components can ignore.
        }
      }
    }
  });
}
