import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import Image from "next/image";
import locLogo from "@/app/static/LOCLogoNoBG.png";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };



  return (

    <>
      <Image src={locLogo} width={200} alt="" />
      <div className="flex flex-col items-center w-full gap-4">
        <h1 className="text-md text-gray-400 text-center"> Welcome Back <br /><span className="text-foreground text-2xl"> Login to Continue Your Journey</span></h1>
        <form className="flex flex-col w-full px-12 gap-4">
          <label className="input input-bordered flex items-center gap-2 bg-gray-100 border-gray-200" htmlFor="email">
            Email
            <input
              className="grow"
              type="email"
              name="email"
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-gray-100 border-gray-200">
            Password
            <input
              className="grow"
              type="password"
              name="password"
              required
            />
          </label>
          <SubmitButton
            formAction={signIn}
            className="bg-primary-500 rounded-md px-4 py-3 text-primary-25"
            pendingText="Logging In..."
          >
            Login
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
        <p className="divider px-12">OR</p>
        <p> Don't have an account? <Link href="/register" className="text-primary-700 hover:underline hover:text-primary-500"> Register </Link> </p>
      </div>
      <p className="text-md"> Privacy Policy </p>
    </>


  );
}
