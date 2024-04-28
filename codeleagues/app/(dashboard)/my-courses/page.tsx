import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import Image from "next/image";
import locLogo from "@/app/static/LOCLogoNoBG.png";
import loginImage from "@/app/static/classroom.jpeg"
import { CourseCard } from "./course-card"

export default function MyCourses() {

  return (
    <>
      <h1 className="text-3xl">Courses</h1>
      <section aria-labelledby="current-courses" className="grid grid-cols-3 gap-6 my-4">
        <h2 id="current-courses" className="col-span-3 text-2xl">Current Courses</h2>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </section>
      <section aria-labelledby="completed-courses" className="grid grid-cols-3 gap-6 my-4">
        <h2 id="completed-courses" className="col-span-3 text-2xl">Completed Courses</h2>
        <CourseCard />
        <CourseCard />
      </section>
    </>
  );
}
