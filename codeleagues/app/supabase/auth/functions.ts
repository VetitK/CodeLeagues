"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
export const signOut = async () => {

  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export const signUp = async (formData: FormData) => {
  "use server";

  const origin = headers().get("origin");
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        name: name,
      },
    },
  });

  if (error) {
    return redirect("/register?message=Could not create user");
  } else {
    const { user } = data;
    // if (user && user.email) {
    //   const { error } = await supabase
    //     .from('users')
    //     .upsert([
    //       {
    //         name: name,
    //       },
    //     ])
    //   if (error) {
    //     throw error
    //   }
    // }
  }
  return redirect("/login?message=Check email to continue sign in process");
};