import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import Image from "next/image";
import locLogo from "@/app/static/LOCLogoNoBG.png";
import loginImage from "@/app/static/classroom.jpeg"
import { CourseCard } from "./course-card"

export default function MyAssignments() {

  const assignments = [{
    "Name": 'A+B Hard',
    'Course': 'Python',
    'Level': '2',
    'Teacher': 'Vetit K.',
    'Due': '2 days',
    'Status': 'Incomplete',
  },
  {
    "Name": 'String 1',
    'Course': 'Python',
    'Level': '2',
    'Teacher': 'Vetit K.',
    'Due': '2 days',
    'Status': 'Incomplete',
  },
  {
    "Name": 'String 2',
    'Course': 'Python',
    'Level': '2',
    'Teacher': 'Vetit K.',
    'Due': '2 days',
    'Status': 'Incomplete',
  },
  ]

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
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
                <tr key={assignment.Name} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <p>{assignment.Name}</p>
                </td>
                <td>
                  <p>{assignment.Course}</p>
                </td>
                <td>
                  <p>{assignment.Level}</p>
                </td>
                <td>
                  <p>{assignment.Teacher}</p>
                </td>
                <td>
                  <p>{assignment.Due}</p>
                </td>
                <td>
                  <p>{assignment.Status}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
