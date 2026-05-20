import { NextResponse } from "next/server";
import { isAllowedEmail } from "@/lib/auth";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || typeof email !== "string" || !isAllowedEmail(email)) {
    // Always returns generic 200 to avoid enumerating the allowed email
    return NextResponse.json({ ok: true });
  }

  const supabase = await createServerClient();
  const origin = new URL(request.url).origin;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${origin}/api/auth/callback` },
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
