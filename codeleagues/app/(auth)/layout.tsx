import loginImage from "@/app/static/classroom.jpeg"
import Image from "next/image";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main className="grid grid-cols-12 gap-4 h-screen p-4">
            <div className="col-span-4 flex flex-col items-center justify-between py-2 px-2">
                {children}
                </div>
                <div className="col-span-8 relative object-cover ">
                    <Image src={loginImage} fill={true} alt="" className="object-cover rounded-xl" />
                </div>
            </main>
        </>
    )
}