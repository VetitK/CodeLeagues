"use client";
import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import locLogo from "@/app/static/LOCLogoNoBG.png";
import loginImage from "@/app/static/classroom.jpeg"
import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import { fetchAssignments } from "@/app/supabase/db/functions";
import { AssignmentType } from "@/types/types";
import { markAsDone } from "@/app/supabase/db/functions";
interface AssignmentData {
  id: string | null;
  due_date: string | null;
  status: string | null;
  teacher: string | null;
  student: string | null;
  users: {
    name: string | null;
  };
  courses: {
    name: string | null;
    level: number | null;
  };
  assignments: {
    name: string | null;
  };
}

export default function MyAssignments() {
  const [assignments, setAssignments] = useState<AssignmentData[]>([])
  const [isDone, setIsDone] = useState<boolean>(false)
  const router = useRouter()
  useEffect(() => {
    fetchAssignments().then((data) => {
      setAssignments(data as any)
    })
  }, [])

  const statusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500 font-semibold capitalize";
      case "incomplete":
        return "text-red-500 capitalize";
      default:
        return "text-red-500 capitalize";
    }
  }
  return (
    <>
      <h1 className="text-3xl">Assignments</h1>
      <div className="overflow-x-auto my-4">
        <table className="table border-separate border-spacing-y-4">
          {/* head */}
          <thead className="bg-black text-white ">
            <tr className="">
              <th className="">
              </th>
              <th>Name</th>
              <th>Course</th>
              <th>Level</th>
              <th>Teacher</th>
              <th>Due</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={assignment.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <p>{assignment.assignments.name}</p>
                </td>
                <td>
                  <p>{assignment.courses.name}</p>
                </td>
                <td>
                  <p>{assignment.courses.level}</p>
                </td>
                <td>
                  <p>{assignment.users.name}</p>
                </td>
                <td>
                  <p>{new Date(assignment.due_date!).toDateString()}</p>
                </td>
                <td>
                  <p className={statusStyle(assignment.status!)}>{assignment.status}</p>
                </td>
                <td>
                  {assignment.status !== "completed" && <button className="btn btn-outline bg-green-500 text-background hover:bg-green-700 hover:text-background"
                    onClick={() => { markAsDone(assignment.id!).then(() => setIsDone(true)).then(() => router.push('/assignments')) }}>
                    Mark as Done
                  </button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isDone && <div className="toast toast-center">
        <div className="alert alert-success">
          <span className="text-background">Marked Successfully</span>
          <button className="btn btn-ghost text-background" onClick={() => setIsDone(false)}>X</button>
        </div>
      </div>}
    </>
  );
}
