"use client";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import type { Comment } from "@prisma/client";
import CommentTextAreaReply from "./comment-textarea-reply";
import { HiMiniArrowUturnDown } from "react-icons/hi2";

interface CommentTextAreaFormProps {
    comment: Comment;
    user?: {
        image?: string,
        id: string,
    }
};

export default function ReplyButton({ comment, user }: CommentTextAreaFormProps) {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <div className="flex items-center mt-2 ">
            {isClicked ?
                <div className="w-full mt-2">
                    {comment.userId &&
                        <CommentTextAreaReply
                            userId={user?.id ?? ""} 
                            topicId={comment.topicId} topicUserIcon={user?.image ?? ""}
                            parentId={comment.id} 
                            ancestorId={comment.ancestorId ?? comment.parentId}
                            leafId={!!comment.parentId ? comment.leafId ?? comment.id : null}
                            defaultStyle={true} setIsOpen={setIsClicked}
                        />
                    }
                </div>
                :
                <>
                    {/* Likes */}
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="rounded-md bg-transparent hover:bg-gray-100 p-2 flex items-center gap-1"
                        >
                            <AiOutlineLike size={24} className=" w-full h-full text-gray-500" />
                            <span className="text-sm">3</span>
                            <p className="text-sm">likes</p>
                        </button>
                    </div>

                    {/* comments */}
                    <div className={`flex items-center`}>
                        {(!!comment.ancestorId && !!comment.parentId && comment.isLast) || (!!!comment.ancestorId && !!!comment.parentId)
                            || (comment.isLast)
                            ?
                            <button
                                type="button"
                                className="rounded-md bg-transparent hover:bg-gray-100 p-2 flex items-center gap-1"
                                onClick={() => setIsClicked(true)}
                            >
                                <FaRegComment size={24} className=" w-full h-full text-gray-500" />
                                <p className="text-sm">reply</p>
                            </button>
                            :
                            <button
                                type="button"
                                className="rounded-md bg-transparent p-2 flex items-center gap-1 cursor-not-allowed"
                            >
                                <HiMiniArrowUturnDown size={24} className=" w-full h-full text-gray-500" />
                                <p className="text-sm">Thread</p>
                            </button>
                        }
                    </div>
                </>
            }
        </div >
    )
}