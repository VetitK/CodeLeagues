"use client";

export function CourseCard() {

    return (
        <article className="card border-solid border-2 px-10 py-6 gap-3">
            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes"className="rounded-lg"/>
                <div className="card-actions justify-start">
                    <p className="badge badge-outline px-3 py-2 h-fit bg-gray-50">Python</p>
                    <p className="badge badge-outline px-3 py-2 h-fit">ผู้เริ่มต้น</p>
                    <p className="badge badge-outline px-3 py-2 h-fit">คลาสสด</p>
                </div>

                <div className="avatar-group -space-x-2 rtl:space-x-reverse">
                    <div className="avatar border-0">
                        <div className="w-12">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <div className="avatar border-0">
                        <div className="w-12">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                </div>

                <h3 className="card-title">
                Python เลเวล 2
                </h3>
                <p>คลาสสด Python ระดับเริ่มต้นไม่มีพื้นฐานก็เรียนได้</p>
        </article>
    );
}
