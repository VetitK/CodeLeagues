"use client";
import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import locLogo from "@/app/static/LOCLogoNoBG.png";
import { SubmitButton } from "../login/submit-button";
import { useState, useEffect, FormEventHandler } from "react";
import { signUp } from "@/app/auth/functions";

export default function Register(
    {
        searchParams,
    }: {
        searchParams: { message: string };
    }
) {
    const [formData, setFormData] = useState<FormData>(new FormData());
    const formChangeHandler : FormEventHandler<HTMLFormElement> = (e) => {
        const inputTarget = e.target as HTMLInputElement;
        const { name, value } = inputTarget;
        formData.set(name, value);
        setFormData(formData);
    }

    return (
        <>
            <Image src={locLogo} width={200} alt="" />
            <div className="flex flex-col items-center w-full gap-4">
                <h1 className="text-md text-gray-400 text-center"> Register <br /><span className="text-foreground text-2xl"> Get Start to Code.</span></h1>
                <form className="flex flex-col w-full px-12 gap-4" onChange={formChangeHandler}>
                    <label className="input input-bordered flex items-center gap-2 bg-gray-100 border-gray-200" htmlFor="email">
                        Name
                        <input
                            className="grow"
                            type="name"
                            name="name"
                            required
                        />
                    </label>
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
                    <label className="input input-bordered flex items-center gap-2 bg-gray-100 border-gray-200">
                        Confirm Password
                        <input
                            className="grow"
                            type="password"
                            name="confirm-password"
                            required
                        />
                    </label>
                    // TODO Add password validation

                    <SubmitButton
                        formAction={signUp}
                        className="bg-primary-500 rounded-md px-4 py-3 text-primary-25"
                        pendingText="Logging In..."
                    >
                        Register
                    </SubmitButton>
                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                            {searchParams.message}
                        </p>
                    )}
                </form>
                <p className="divider px-12">OR</p>
                <p> Already have an account? <Link href="/login" className="text-primary-700 hover:underline hover:text-primary-500"> Login </Link> </p>
            </div>
            <p className="text-md"> Privacy Policy </p>
        </>
    )
}



