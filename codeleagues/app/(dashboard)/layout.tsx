"use client";
import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import locLogo from "@/app/static/LOCLogoNoBG.png";
import loginImage from "@/app/static/classroom.jpeg"
import { signOut } from "../auth/functions";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="grid grid-cols-12">
      <header className="col-span-2 h-screen bg-gray-100 p-6 flex flex-col justify-between sticky top-0">
        <div>
          <Image src={locLogo} width={200} alt="" className="mb-8" />
          <nav aria-label="user navigation">
            <ul className="flex flex-col gap-3">
              <li><a href="/my-courses"><Image src={locLogo} width={50} alt="" className="inline" /> Courses</a></li>
              <li><a href="/assignments"><Image src={locLogo} width={50} alt="" className="inline" /> Assignments</a></li>
            </ul>
          </nav>
        </div>

        <div>
          <nav aria-label="general navigation">
            <ul className="flex flex-col gap-3">
              <li><a href="#"><Image src={locLogo} width={50} alt="" className="inline" /> All Courses</a></li>
              <li><a href="#"><Image src={locLogo} width={50} alt="" className="inline" /> Settings</a></li>
              <li><a href="#" onClick={e => signOut()}><Image src={locLogo} width={50} alt="" className="inline" /> Logout</a></li>
            </ul>
          </nav>

          <a href="#">
            <div className="avatar items-center gap-4 mt-8">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
              <p>น้องเจได</p>
            </div>
          </a>
        </div>
      </header>
      <main className="col-span-10 p-6">
        {children}
      </main>
    </div>
  );
}
