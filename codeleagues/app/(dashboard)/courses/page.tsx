"use client";
import { CourseCard } from "@/components/course-card"
import { useEffect, useState } from 'react';
import { fetchCourses } from "@/app/supabase/db/functions";
import { Database } from "@/types/supabase";

export default function Courses() {

  const [courseInfo, setCourseInfo] = useState<Database["public"]["Tables"]["courses"]["Row"][]>([]);

  useEffect(() => {
    fetchCourses().then((data) => {
      setCourseInfo(data)
    })
  }, []);

  return (
    <>
      <h1 className="text-7xl font-semibold	">Courses</h1>
      <div className="grid grid-cols-3 gap-3 my-4">
        {courseInfo?.map(course => <CourseCard key={course.id} {...course} />)}
      </div>
    </>
  );
}
