import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import locLogo from "@/app/static/LOCLogoNoBG.png";
import loginImage from "@/app/static/classroom.jpeg"
import { CourseCard } from "./course-card"
import { CourseCardProps } from "@/types/types";

export default function MyCourses() {

  // Query the database for the courses that the user is currently enrolled in

  const cards_info: CourseCardProps[] = [
    {
      title: "Python 2",
      description: "Learn the intermediate of programming with Python",
      image: "https://images.unsplash.com/photo-1622838321164-5c3f5f1e4c7d",
      course: "Python",
      difficulty: "Intermediate",
      class_type: "Live",
      avatar_url: ["https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"]
    },
    {
      title: "Python 3",
      description: "Learn the advance of programming with Python",
      image: "https://images.unsplash.com/photo-1622838321164-5c3f5f1e4c7d",
      course: "Python",
      difficulty: "Advance",
      class_type: "Live",
      avatar_url: ["https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"]
    },
    
  ]

  const completed_cards_info: CourseCardProps[] = [
    {
      title: "Python 1",
      description: "Learn the basics of programming with Python",
      image: "https://images.unsplash.com/photo-1622838321164-5c3f5f1e4c7d",
      course: "Python Level 1",
      difficulty: "Beginner",
      class_type: "Live",
      avatar_url: ["https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"]
    },
    
  ]

  return (
    <>
      <h1 className="text-3xl">Courses</h1>
      <section aria-labelledby="current-courses" className="grid grid-cols-3 gap-6 my-4">
        <h2 id="current-courses" className="col-span-3 text-2xl">Current Courses</h2>
        {
          cards_info.map((card, index) => {
            return <CourseCard key={index} {...card} />
          })
        }
      </section>
      <section aria-labelledby="completed-courses" className="grid grid-cols-3 gap-6 my-4">
        <h2 id="completed-courses" className="col-span-3 text-2xl">Completed Courses</h2>
        {
          completed_cards_info.map((card, index) => {
            return <CourseCard key={index} {...card} />
          })
        }
      </section>
    </>
  );
}
