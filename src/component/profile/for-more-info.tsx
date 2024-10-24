"use client";
import Image from "next/image";
import Link from "next/link";
import { BsCake2 } from "react-icons/bs";
import PostDateFormatter from "../common/post-date-format";
import { IoReceiptOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import type { User, Topic } from "@prisma/client";
import { useState } from "react";
import TopicList from "./topic-list";
import paths from "~/server/paths";

export type ForMoreInfoTopicsType = Topic & {
    _count: {
        comments: number;
    }
}

type UserInfoAndTopicsType = User & {
    _count: {
        topics: number;
    },
    topics: ForMoreInfoTopicsType[];
}

interface ForMoreInfoProps {
    userInfoAndTopics: UserInfoAndTopicsType;
    totalComments: number;
    userId: string;
}

export default function ForMoreInfo({ userInfoAndTopics, totalComments, userId }: ForMoreInfoProps) {
    const [moreInfo, setMoreInfo] = useState(false);

    return (
        <>
            <div className="w-full bg-black" style={{ background: "linear-gradient(180deg, #000000, 8rem, transparent 8rem)" }}>
                <div className="sm:pt-16 pt-7 md:px-4 py-4 max-w-[1024px] text-base w-full mx-auto my-0 grid grid-cols[1fr] gap-4 ">
                    <div className="mt-2 bg-white md:rounded-md text-black lg:-p-6 sm:-p-4 -p-3 md:text-center">
                        <div className="md:-mt-16 -mt-8 md:mb-3 mb-4 px-4 relative z-0">
                            <div className="md:p-2 md:w-32 w-16 md:h-32 h-16 bg-black p-1 rounded-full inline-block">
                                {/* UserImage */}
                                {userInfoAndTopics.image ?
                                    <Image
                                        src={userInfoAndTopics.image}
                                        alt={userInfoAndTopics.name ?? ""}
                                        width={128}
                                        height={128}
                                        className="h-full w-full rounded-full align-bottom inline-block object-cover aspect-1/1"
                                    />
                                    :
                                    <div className="w-full h-full rounded-full align-bottom inline-block bg-lime-500" />
                                }
                            </div>

                            {/* Edit or Follow */}
                            <div className="absolute md:top-16 top-8 right-0 left-0 flex justify-end pt-6 pr-6">
                                {userId === userInfoAndTopics.id ?
                                    <Link
                                        href={paths.profileEditPage(userId)}
                                        className="py-2 px-4 text-base inline-block rounded-md leading-base font-[500] flex items-center shadow-md bg-blue-600 hover:bg-blue-800 text-white cursor-pointer"
                                    >
                                        Edit Profile
                                    </Link>
                                    :
                                    <button
                                        type="button"
                                        className="py-2 px-4 text-base inline-block rounded-md leading-base font-[500] flex items-center shadow-md bg-green-500 hover:bg-green-800 text-white cursor-pointer"
                                    >
                                        Follow
                                    </button>
                                }
                            </div>
                        </div>

                        <div className="p-4">
                            {/* User Name */}
                            <div className="mb-2 flex md:justify-center items-center">
                                <h1 className="md:text-3xl text-2xl leading-sm text-black font-[700] min-h-10">
                                    {userInfoAndTopics.name}
                                </h1>
                            </div>

                            {/* bio */}
                            <p className="md:text-lg text-base max-w-75 mb-4 mx-auto text-gray-800">
                                {userInfoAndTopics.bio}
                            </p>

                            {/* Date */}
                            <div className="flex md:justify-center items-center flex-wrap md:ml-0 mb-2 -ml-1 text-sm text-gray-700 ">
                                <div className="flex md:justify-center items-center gap-2 md:px-3 md:py-1 p-2 w-full ">
                                    <BsCake2 size={24} className="ml-2 shrink-0" />
                                    <span className="">
                                        <PostDateFormatter date={userInfoAndTopics.createdAt} className="text-base">
                                            Joined On
                                        </PostDateFormatter>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* More Info */}
                        <div className={`md:hidden p-3 w-full  text-base text-black font-[700] ${moreInfo ? "hidden" : "block"} `}>
                            <button
                                type="button"
                                className="my-3 w-full py-2 px-4 text-center border-2 border-solid border-gray-200 rounded-md hover:bg-gray-100 "
                                onClick={() => setMoreInfo(true)}
                            >
                                More info about @{userInfoAndTopics.name}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:pt-0 pt-4 mx-auto my-0 md:p-4 grid gap-2 md:grid-cols-[2fr_5fr] max-w-[1024px] text-base">
                {/* number of published articles, comments, and tags followed */}
                <div className={`w-full md:block ${moreInfo ? "block" : "hidden"}`}>
                    <div className={`md:grid md:grid-4`}>
                        <ul className="p-4 bg-white text-black shadow-md rounded-md">
                            <li className="flex mb-4 items-center">
                                <IoReceiptOutline size={24} className="mr-3 align-bottom text-gray-500" />
                                <div className="flex gap-1">
                                    <span>{userInfoAndTopics._count.topics}</span>
                                    {userInfoAndTopics._count.topics > 1 ? "posts" : "post"} published
                                </div>
                            </li>
                            <li className="flex mb-4 items-center">
                                <FaRegComment size={24} className="mr-3 align-bottom text-gray-500" />
                                <div className="flex gap-1">
                                    <span>{totalComments}</span>
                                    {totalComments > 1 ? "comments" : "comment"} written
                                </div>
                            </li>
                            <li className="flex items-center">
                                <FaTag size={24} className="mr-3 align-bottom text-gray-500" />
                                <div className="flex gap-1">
                                    <span>0</span>
                                    tag followed
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* topic lists */}
                <div className="min-w-0 w-full">
                    {/* Map */}
                    {userInfoAndTopics.topics.map((topic) => {
                        return (
                            <TopicList key={topic.id} topic={topic}
                                user={{ id: userInfoAndTopics.id, name: userInfoAndTopics.name ?? "", image: userInfoAndTopics.image ?? "" }} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}