"use client";
import { Database } from "@/types/supabase";
import Link from "next/link";
import courseCover from "@/app/static/Python1_Cover.png";
import Image from "next/image";

export function CourseCard(props: Database["public"]["Tables"]["courses"]["Row"]) {
    return (
        <Link href={`/courses/${props.id}`}>
            <article className="card border-solid border-2 px-10 py-6 gap-3 transition duration-150 ease-in-out cursor-pointer hover:shadow-lg hover:shadow-gray-200">
                <Image src={courseCover} alt="CourseCover" className="rounded-lg" />
                <div className="card-actions justify-start">
                    <p className="badge badge-outline px-3 py-2 h-fit bg-gray-50">{props.program || "Python"}</p>
                    <p className="badge badge-outline px-3 py-2 h-fit">Level {props.level || "2"}</p>
                    <p className="badge badge-outline px-3 py-2 h-fit">{"Live"}</p>
                </div>

                <div className="avatar-group -space-x-2 rtl:space-x-reverse">
                    {
                        // props.avatar_url ? props.avatar_url.map((avatar, index) => {
                        //     return (
                        //         <div className="avatar border-0" key={index}>
                        //             <div className="w-12">
                        //                 <img src={avatar} />
                        //             </div>
                        //         </div>
                        //     );
                        // }) :
                        <div className="avatar border-0">
                            <div className="w-12">
                                <img src={"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                            </div>
                        </div>
                    }
                </div>

                <h3 className="card-title">
                    {props.name || "?"}
                </h3>
                <p>{props.description_short || "?"}</p>
            </article>
        </Link>
    );
}
