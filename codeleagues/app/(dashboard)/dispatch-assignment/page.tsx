"use client"
import { fetchCourses, fetchStudentEnrolledOnCourse } from "@/app/supabase/db/functions";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

interface AssignmentData {
    [key: string]: FormDataEntryValue | string[];
}

export default function DispatchAssignments() {
    const [courses, setCourses] = useState<Database["public"]["Tables"]["courses"]["Row"][]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [students, setStudents] = useState<{ users: Database["public"]["Tables"]["users"]["Row"] }[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    const router = useRouter();
    useEffect(() => {
        fetchCourses().then((data) => {
            setCourses(data as any)
            setSelectedCourse(data[0].id)
        })
    }, [])

    useEffect(() => {
        if (selectedCourse !== null) {
            fetchStudentEnrolledOnCourse({ course_id: selectedCourse }).then((data) => {
                setStudents(data)
            })
        }
    }, [selectedCourse])

    const submitAssignment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const candidateStudent = formData.getAll("students")
        setSelectedStudents(candidateStudent as string[])
        if (candidateStudent.length === 0) {
            alert("Please select at least one student")
            return
        }
        // const initialdata: AssignmentData = {};
        // formData.forEach((value, key) => {
        //     if (initialdata.hasOwnProperty(key)) {
        //         // If the key already exists, it means there are multiple values for this key
        //         if (Array.isArray(initialdata[key])) {
        //             // If it's already an array, just push the new value
        //             (initialdata[key] as string[]).push(value.toString());
        //         } else {
        //             // If it's not an array, convert it into an array with the current and new value
        //             initialdata[key] = [initialdata[key] as string, value.toString()];
        //         }
        //     } else {
        //         // Set the value as is (first occurrence)
        //         initialdata[key] = value;
        //     }
        // });

        const supabase = createClient()
        const { data: assignmentData, error } = await supabase.from('assignments').insert([
            {
                name: formData.get("assignment-name") as string,
            }]).select()
        if (error) {
            alert("Could not create assignment")
        }
        let toAdd = []
        const { data: teacher } = await supabase.auth.getUser()
        const { data: assigned, error: assignError } = await supabase.from('student_assignment').insert(
            Array.from(candidateStudent as string[]).map((student) => {
                return {
                    assignment: assignmentData![0].id,
                    student: student,
                    teacher: teacher.user?.id,
                    due_date: formData.get("due-date") as string,
                    status: "incomplete",
                    course: selectedCourse

                }
            }

            )
        ).select()
        router.refresh()
    }



    function MultiSelectDropdown({ formFieldName, options }: { formFieldName: string; options: { users: Database["public"]["Tables"]["users"]["Row"] }[] }) {
        return (
            <label className="relative my-6">
                <input type="checkbox" className="hidden peer" />
                <div className="cursor-pointer after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform">
                    Select Students
                </div>

                <div className="absolute bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
                    <ul>
                        {options.map((option, i) => {
                            return (
                                <li key={option.users.id}>
                                    <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                                        <input
                                            type="checkbox"
                                            name={formFieldName}
                                            value={option.users.id}
                                            className="cursor-pointer"
                                        />
                                        <span className="ml-1">{option.users.name}</span>
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </label>
        );
    }
    return (
        <div>
            <h1 className="text-3xl">Dispatch Assignments</h1>
            <h2 className="text-xl my-4">Give Assignments to Students</h2>
            <form className="my-4" name="dispatch-assignment" onSubmit={submitAssignment}>
                <label className="block" htmlFor="course-selection">Select a course</label>
                <select className="select select-primary w-full max-w-xs bg-slate-100 my-4" id="course-selection" onChange={(e) => (setSelectedCourse(e.target.value))}>
                    {courses.map((course) => {
                        return (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                        );

                    })
                    }
                </select>

                <label className="block" htmlFor="assignment-name">Assignment Name</label>
                <input className="input input-primary w-full max-w-xs bg-slate-100 my-4" type="text" id="assignment-name" name="assignment-name" />
                <label className="block" htmlFor="assignment-details">Assignment Details</label>
                <textarea className="input input-primary w-full max-w-xs bg-slate-100 my-4" id="assignment-details" name="assignment-details" />
                <label className="block" htmlFor="due-date">Due Date</label>
                <input className="input input-primary w-full max-w-xs bg-slate-100 my-4" type="date" id="due-date" name="due-date" />
                <MultiSelectDropdown formFieldName="students" options={students} />
                <button className="btn bg-primary-500 border-none text-white hover:bg-primary-600" type="submit">Submit</button>
            </form>
        </div>

    )
}