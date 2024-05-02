"use client";
import Image from "next/image";
import locLogo from "@/app/static/LOCLogoNoBG.png";
import { signOut } from "../supabase/auth/functions";
import { useEffect, useState, useContext, useRef, use, Suspense, createContext } from "react";
import { getUserRole, getUserInfo } from "../supabase/db/functions";
import { Database } from "@/types/supabase";
// import svg
import assignmentIcon from "@/app/static/book-open-02.svg";
import coursesIcon from "@/app/static/graduation-hat-02.svg";
import settingIcon from "@/app/static/settings-01.svg";
import logoutIcon from "@/app/static/log-out-03.svg";
import Link from "next/link";

export const UserContext = createContext<Database["public"]["Tables"]["users"]["Row"] | null>(null);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  const userInfo = useRef<Database["public"]["Tables"]["users"]["Row"] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getUserInfo();
        userInfo.current = result;
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);


  return (
    <UserContext.Provider value={userInfo.current}>
      <div className="grid grid-cols-12">
        <header className="col-span-2 h-screen bg-gray-100 p-6 flex flex-col justify-between sticky top-0">
          <div>
            <Image src={locLogo} width={200} alt="" className="mb-8" />
            <nav aria-label="user navigation">
              <ul className="flex flex-col gap-2">
                <li><Link href="/my-courses" className="gap-4 flex hover:bg-gray-200 p-2 py-2 rounded-md"><Image src={coursesIcon} width={24} alt="" className="inline" /> Courses</Link></li>
                <li><Link href="/assignments" className="gap-4 flex hover:bg-gray-200 p-2 py-2 rounded-md"><Image src={assignmentIcon} width={24} alt="" className="inline" /> Assignments </Link></li>
                {loading ? <div className="loading-dots loading ml-2 py-2 loading-md"></div> :
                  userInfo.current?.role === "teacher" &&
                  <li>
                    <Link
                      href="/dispatch-assignment"
                      className="gap-4 flex hover:bg-gray-200 px-2 py-2 rounded-md">
                      <Image src={assignmentIcon} width={24} alt="" className="inline" />
                      Dispatch Assignments
                    </Link>
                  </li>
                }
              </ul>
            </nav>
          </div>

          <div>
            <nav aria-label="general navigation">
              <ul className="flex flex-col gap-none">
                <li><Link href="/courses" className="gap-4 flex hover:bg-gray-200 p-2 py-1 rounded-md"><Image src={coursesIcon} width={24} alt="" className="inline" /> All Courses</Link></li>
                <li><Link href="#" className="gap-4 flex hover:bg-gray-200 p-2 py-1 rounded-md"><Image src={settingIcon} width={24} alt="" className="inline" /> Settings</Link></li>
                <li><Link href="#" onClick={e => signOut()} className="gap-4 flex hover:bg-gray-200 p-2 py-1 rounded-md"><Image src={logoutIcon} width={24} alt="" className="inline" /> Logout</Link></li>
              </ul>
            </nav>
            {loading ? <div className="loading-dots loading mt-8 loading-md ml-2"></div> :
              <Link href="#">
                <div className="avatar items-center gap-4 mt-8 placeholder">
                  <div className="w-10 rounded-full bg-neutral text-neutral-content">
                    <span className="text-xs">{userInfo.current?.name![0]}</span>
                  </div>
                  <p>{userInfo.current?.name!}</p>
                </div>
              </Link>
            }

          </div>
        </header>
        <main className="col-span-10 p-6">
          {children}
        </main>
      </div>
    </UserContext.Provider>
  );
}
