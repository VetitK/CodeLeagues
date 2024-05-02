"use server";
import { createClient } from "@/utils/supabase/server";

export const fetchAssignments = async () => {
    "use server";
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
        .from("student_assignment")
        .select("id, due_date, status, teacher, student, users:teacher(name), courses:course(name, level), assignments:assignment(name)")
        .eq("student", user!.id).order("due_date", { ascending: true });
    // generate type from data to be used in another file
    if (error) {
        throw new Error("Could not fetch assignments")
    }

    if (!data) {
        return []
    }

    return data;
}

export const getUserRole = async () => {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from("users").select("role").eq("id", user!.id);
    if (error) {
        alert("Could not fetch user role")
    }
    return data![0].role || "student";
}

export const getUserInfo = async () => {
    const supabase = createClient();
    try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) throw new Error("Authentication failed");

        const { data, error } = await supabase.from("users").select("*").eq("id", user!.id);
        if (error) throw error;

        if (data.length === 0) throw new Error("No user data found");

        return data[0];
    }
    catch (error: any) {
        console.error('Failed to fetch user info:', error.message)
        throw error
    }
}

export const fetchCourses = async () => {
    "use server";

    const supabase = createClient();
    const { data: course_info } = await supabase.from('courses').select();

    if (!course_info) {
        return []
    }

    return course_info
}

export const fetchCourseInfo = async (course_id: string) => {
    "use server";
    const supabase = createClient();
    const { data: course_info } = await supabase.from('courses').select().eq("id", course_id).limit(1).single();

    if (!course_info) {
        return null
    }

    return course_info
}

export const fetchEnrolledCourse = async () => {
    "use server";
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data: courses } = await supabase.from('student_course_instance').select('courses!inner(*)').eq("student", user!.id);

    if (!courses) {
        return null
    }

    return courses
}

export const isEnrolled = async (courseID: string) => {
    "use server";
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data: enrollment } = await supabase.from('student_course_instance').select('student, course').eq("student", user!.id).eq("course", courseID);

    if (enrollment?.length === 0) {
        return false
    }

    return true
}

export const fetchStudentEnrolledOnCourse = async ({ course_id }: { course_id: string }) => {
    "use server";
    const supabase = createClient();
    let { data: students, error } = await supabase
        .from('student_course_instance')
        .select('users!inner(*)')
        .eq("course", course_id);


    if (!students) {
        return []
    }

    return students
}

export const enrolledCourse = async (courseID: string) => {
    "use server";
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { status, statusText } = await supabase.from('student_course_instance').insert({ student: user!.id, course: courseID });

    return { status, statusText }
}

export const markAsDone = async (assignmentID: string) => {
    "use server";
    const supabase = createClient();
    const { status, statusText } = await supabase.from('student_assignment').update({ status: "completed" }).eq("id", assignmentID);

    return { status, statusText }
}