"use client";
import { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/server";
import { CourseCard } from "@/components/course-card"
import { fetchCourseInfo, isEnrolled, enrolledCourse } from "@/app/supabase/db/functions";
import { useRouter } from 'next/navigation'
import { Database } from '@/types/supabase';
import coursePicture from "@/app/static/js-lv2.webp";
import Image from "next/image";

export default function CoursesPage({ params }: { params: { course_id: string } }) {

  const [courseInfo, setCourseInfo] = useState<Database["public"]["Tables"]["courses"]["Row"] | null>(null);
  const [enrollStatus, setEnrollStatus] = useState<boolean>(false);
  const router = useRouter()

  useEffect(() => {
    fetchCourseInfo(params.course_id).then((data) => setCourseInfo(data))
    isEnrolled(params.course_id).then((data) => setEnrollStatus(data)
    )
  }, []);

  return (
    <>
      <section aria-label='Course Information' className='bg-gray-100 grid grid-cols-2 gap-16 p-10 rounded-tl-xl rounded-tr-xl'>
        <div className='flex flex-col gap-[10px] justify-center'>
          <h1 className='text-6xl font-semibold'>{courseInfo?.name}</h1>
          <p>{courseInfo?.description_short}</p>
          {enrollStatus ?
            <p className='bg-gray-50 w-fit text-gray-400 text-xl font-medium px-4 py-2 rounded-md'>Enrolled</p> :
            <button onClick={(e) => { enrolledCourse(params.course_id).then(() => window.location.reload()); }} className='bg-primary-800 w-fit text-white text-xl font-medium px-4 py-2 rounded-md'>Enroll</button>}
        </div>
        <Image src={coursePicture} alt='' className='rounded-2xl'></Image>
      </section>
      <section aria-label='Course Content' className='my-6'>
        {enrollStatus ? <p className='max-w-prose'>{courseInfo?.description_long}</p> : <p className='bg-gray-50 text-6xl text-gray-300 font-semibold h-screen p-8 text-center'>Enroll to the course to see the content.</p>}
      </section>
    </>)
}