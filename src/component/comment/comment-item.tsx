import type { Comment } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import paths from "~/server/paths";
import { LuDot } from "react-icons/lu";
import TopicListsDateFormat from "../home/topic-date-format";
import { BsThreeDots } from "react-icons/bs";
import ReplyButton from "./reply-button";

interface CommentItemProps {
    comment: Comment;
    user?: {
        image?: string,
        id: string,
    }   
}

export default async function CommentItem({comment, user}: CommentItemProps) {
    return (
        <div className={`flex mb-4 ${!!comment.parentId && !!!comment.ancestorId && "pl-3"} ${!!comment.parentId && !!comment.ancestorId && "pl-6"}`}>
            <span
                className="mr-2 shrink-0 md:w-8 w-5 md:h-8 h-5 inline-block rounded-full align-middle"
            >
                {comment.userIcon ?

                    <Image
                        src={comment.userIcon}
                        alt="Icon Image"
                        width={32}
                        height={32}
                        className="rounded-full h-full w-full"
                    />
                    :
                    <div className="shrink-0 md:w-8 w-5 md:h-8 h-5 bg-lime-500 rounded-full" />
                }
            </span>

            <div className="flex flex-col w-full">
                <div className="flex flex-col w-full">
                    {/* Comment area */}
                    <div className={`flex flex-col flex min-w-0 bg-white border-1 border-solid border-gray-200 rounded-md w-full`}>
                        <div className="max-h-[40vh] overflow-y-scroll min-h-16 rounded-md w-full leading-base text-base px-3 py-2 border-2">
                            {/* Header */}
                            <div className="h-10 w-full flex items-center justify-between text-base text-gray-600">
                                <div className="flex items-center gap-0.5">
                                    <Link
                                        href={paths.profilePage(comment.userId)}
                                        className="text-black"
                                    >
                                        {comment.userName}
                                    </Link>
                                    <span>
                                        <LuDot size={24} />
                                    </span>
                                    <TopicListsDateFormat date={comment.updatedAt} />
                                </div>

                                <div className="hover:bg-gray-100 rounded-full p-2">
                                    <BsThreeDots size={24} className="rounded-full cursor-pointer " />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="text-base ">
                                {comment.content}
                            </div>
                        </div>
                    </div>
                </div>

                {/* The number of likes and comments */}
                <ReplyButton comment={comment} user={user}/>
            </div>

        </div>
    )
}