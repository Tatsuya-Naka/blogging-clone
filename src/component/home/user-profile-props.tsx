"use client";
import Link from "next/link";
import Image from "next/image";
import type { User } from "@prisma/client";
import PostDateFormatter from "../common/post-date-format";
import { useState } from "react";
import paths from "~/server/paths";

interface ProfilePopupProps {
    date: Date;
    user: User;
    visitId: string;
}

export default function ProfilePupUp({ date, user, visitId }: ProfilePopupProps) {
    const [isMouseOn, setIsMounseOn] = useState(false);
    
    const popup = () => {
        return (
            <div className="absolute z-10 sm:w-[360px] shadow-md grid p-4 gap-4 bg-white rounded-md border-t-[2rem] border-t-solid border-t-black">
                {/* User info */}
                <div className="-mt-8">
                    {/* User profile */}
                    <Link
                        href={paths.profilePage(user.id)}
                        className="flex"
                    >
                        <span className="mr-2 shrink-0 w-12 h-12 inline-block rounded-full bg-green-500 align-middle">
                            {user.image ?
                                <Image
                                    src={user.image ?? ""}
                                    alt="icon"
                                    width={100}
                                    height={100}
                                    className="rounded-full w-full h-full inline-block align-bottom object-cover aspect-1/1"
                                />
                                :
                                <div className="rounded-full w-full h-full bg-lime-500" />
                            }
                        </span>
                        <span className="mt-5 text-black sm:text-2xl text-xl sm:leading-base font-[700]">
                            {user.name}
                        </span>
                    </Link>
                </div>

                {/* Follow or Edit */}
                <Link href={visitId === user.id ? paths.profileEditPage(user.id) : paths.profilePage(user.id)} className="w-full py-2 px-4 text-base block rounded-md leading-base font-[500] text-center cursor-pointer bg-blue-800 hover:opacity-60 text-lime-50">
                    {visitId === user.id ? "Edit Profile" : "Follow"}
                </Link>

                {/* Bio */}
                <p className="text-gray-500">{user.bio}</p>

                {/* Date or st */}
                <div className="">
                    <ul>
                        <li className="mb-0 flex items-center gap-2">
                            <span className="text-sm font-[700] text-black uppercase">Joined</span>
                            <PostDateFormatter date={user.createdAt} />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className="mr-2">
            {/* Go to the user profile */}
            <Link
                href={paths.profilePage(user.id)}
                className="md:hidden font-[500] text-black p-1 cursorpointer "
            >
                {user.name}
            </Link>
            <div className="md:inline-block hidden relative font-[500]"
                onMouseEnter={() => setIsMounseOn(true)}
                onMouseLeave={() => setIsMounseOn(false)}
            >
                <p
                    className="text-sm p-1 cursor-pointer -ml-1 -my-2 bg-transparent hover:bg-gray-50 text-black rounded-md"
                >
                    {user.name}
                </p>

                {/* Pop up */}
                {isMouseOn &&
                    <>
                        {popup()}
                    </>
                }
            </div>

            {/* Date created */}
            <Link href="/" className="text-sm text-black">
                <PostDateFormatter date={date} />
            </Link>
        </div>
    )
}