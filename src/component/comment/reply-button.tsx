"use client";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import type { Comment } from "@prisma/client";
import CommentTextAreaReply from "./comment-textarea-reply";
import { HiMiniArrowUturnDown } from "react-icons/hi2";
import { BiSolidLike } from "react-icons/bi";
import { CommentLikes } from "~/server/api/queries/like";

interface CommentTextAreaFormProps {
    comment: Comment;
    user?: {
        image?: string,
        id: string,
    },
    isLiked: boolean;
    countLikes: number;
    topicId: string;
};

export default function ReplyButton({ comment, user, isLiked, countLikes, topicId }: CommentTextAreaFormProps) {
    const [isClicked, setIsClicked] = useState(false);

    const handleLikeComment = async () => {
        await CommentLikes(comment.id, topicId);
    }

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
                            onClick={handleLikeComment}
                        >
                            {isLiked ?
                                <BiSolidLike size={24} className=" w-full h-full text-gray-500 fill-emerald-600" />
                                :
                                <AiOutlineLike size={24} className=" w-full h-full text-gray-500 fill-black" />
                            }
                            <span className="text-sm">{countLikes}</span>
                            <p className="text-sm">{countLikes > 0 ? "likes" : "like"}</p>
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