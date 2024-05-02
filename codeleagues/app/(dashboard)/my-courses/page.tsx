"use client";

import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import locLogo from "@/app/static/LOCLogoNoBG.png";
import loginImage from "@/app/static/classroom.jpeg"
import { CourseCard } from "@/components/course-card"
import { useEffect, useState } from 'react';
import { fetchEnrolledCourse } from "@/app/supabase/db/functions";
import { Database } from "@/types/supabase";

export default function MyCourses() {

  // Query the database for the courses that the user is currently enrolled in

  const [courseInfo, setCourseInfo] = useState<Database["public"]["Tables"]["courses"]["Row"][]>([]);

  useEffect(() => {
    fetchEnrolledCourse().then((data) => {
      const course_instance = data?.map(course => course.courses)
      if (!course_instance) {
        return;
      }
      setCourseInfo(course_instance);
    });
  }, []);

  return (
    <>
      <h1 className="text-7xl font-semibold">Courses</h1>
      <section aria-labelledby="current-courses" className="grid grid-cols-3 gap-6 my-4">
        <h2 id="current-courses" className="col-span-3 text-5xl font-semibold">Current Courses</h2>
        {
          courseInfo?.map((course) => {
            return <CourseCard key={course.id} {...course} />
          })
        }
      </section>
    </>
  );
}
