"use client";
import Image from "next/image";
import Link from "next/link";
import paths from "~/server/paths";
import { FaRegComment } from "react-icons/fa";
import TopicListsDateFormat from "../home/topic-date-format";
import type { ForMoreInfoTopicsType } from "./for-more-info";

interface TopicListProsp {
    topic: ForMoreInfoTopicsType;
    user: {
        id: string;
        name: string;
        image?: string;
    }
}

export default function TopicList({topic, user}: TopicListProsp) {
    return (
        <div className="md:p-5 sm:p-4 px-4 pt-4 pb-3 mb-2 rounded-md text-xl sm:text-2xl bg-white shadow-md ">
            <div className="">
                {/* User info */}
                <div className="md:mb-2 mb-3 flex items-center text-sm leading-sm">
                    {/* User icon */}
                    <Link className="mr-2 shrink-0" href={paths.profilePage(user.id)}>
                        {user.image ?

                            <Image
                                src={user.image}
                                alt={user.name ?? ""}
                                width={90}
                                height={90}
                                className="rounded-full h-8 w-8 inline-block"
                            />
                            :
                            <div className="w-8 h-8 rounded-full inline-block bg-lime-500" />
                        }
                    </Link>

                    <div className="flex flex-col">
                        <p className="md:inline-block sm:mb-0 mb-4 font-[500]">
                            {user.name}
                        </p>
                        {/* Topic page */}
                        <Link
                            href="/"
                            className="text-xs text-black"
                        >
                            {topic.updatedAt &&
                                <TopicListsDateFormat date={topic.updatedAt} />
                            }
                        </Link>
                    </div>
                </div>

                {/* Topic */}
                <div className="md:pl-10">
                    {/* Title */}
                    <h2 className="mb-1 text-black hover:text-blue-600 leading-sm ">
                        <Link
                            href={paths.topicPage(topic.id ?? "")}
                            className="text-2xl font-[700]"
                        >
                            {topic.title}
                        </Link>
                    </h2>
                    <div className="flex items-center justify-between text-sm leading-sm">
                        {/* Comments */}
                        <div className="flex -ml-2">
                            <Link
                                href={paths.topicPage(topic.id ?? "")}
                                className="px-2 py-3 rounded-md text-sm text-center leading-base bg-transparent hover:bg-gray-100 flex text-xs"
                            >
                                <FaRegComment size={24} className="mr-1" />
                                <span className="sm:flex hidden items-center">Add comment</span>
                            </Link>
                        </div>

                        <div className="flex items-center">
                            <p className="text-xs mr-2 text-black">1 min read</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}