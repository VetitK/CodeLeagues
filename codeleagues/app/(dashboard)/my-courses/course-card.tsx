"use client";
import { CourseCardProps } from "@/types/types";

export function CourseCard(props: CourseCardProps) {
    return (
        <article className="card border-solid border-2 px-10 py-6 gap-3">
            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-lg" />
            <div className="card-actions justify-start">
                <p className="badge badge-outline px-3 py-2 h-fit bg-gray-50">{props.course || "Python"}</p>
                <p className="badge badge-outline px-3 py-2 h-fit">{props.difficulty || "Beginner"}</p>
                <p className="badge badge-outline px-3 py-2 h-fit">{props.class_type || "Live"}</p>
            </div>

            <div className="avatar-group -space-x-2 rtl:space-x-reverse">
                {
                    props.avatar_url.map((avatar, index) => {
                        return (
                            <div className="avatar border-0" key={index}>
                                <div className="w-12">
                                    <img src={avatar} />
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            <h3 className="card-title">
                {props.title || "?"}
            </h3>
            <p>{props.description || "?"}</p>
        </article>
    );
}
