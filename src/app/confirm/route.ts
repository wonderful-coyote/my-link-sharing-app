// src/app/confirm/route.ts

import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "../../../utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const signInPage = "/authentication/signIn";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = signInPage;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash && type) {
    const supabase = createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      // Email confirmed successfully
      redirectTo.searchParams.set("emailConfirmed", "true");
    } else {
      console.error("Verification error:", error);
      redirectTo.searchParams.set("error", "Email confirmation failed");
    }
  } else {
    redirectTo.searchParams.set("error", "Missing verification parameters");
  }

  return NextResponse.redirect(redirectTo);
}
