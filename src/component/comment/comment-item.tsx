import type { Comment } from "@prisma/client";
import Image from "next/image";
import CommentEditItem from "./comment-edit-item";

type CommentLikesType = {
    id: string;
    userId: string;
}

type CommentType = Comment & {
    _count: {
        commentlikes: number;
    }
    commentlikes: CommentLikesType[];
};

interface CommentItemProps {
    comment: CommentType;
    user?: {
        image?: string,
        id: string,
    },
    topicId: string;
}

export default async function CommentItem({ comment, user, topicId }: CommentItemProps) {
    const isLiked = comment.commentlikes[0] && user ? comment.commentlikes[0]?.userId === user.id : false;

    return (
        <div className={`flex mb-4 ${!!comment.parentId && !!!comment.ancestorId && "pl-3"} ${!!comment.parentId && !!comment.ancestorId && "pl-6"}`}>
            <span
                className="mr-2 shrink-0 md:w-8 w-5 md:h-8 h-5 inline-block rounded-full align-middle"
            >
                {comment.deleted ?
                    <div className="shrink-0 md:w-8 w-5 md:h-8 h-5 bg-transparent rounded-full" />
                :
                    <>
                        {
                            comment.userIcon ?

                                <Image
                                    src={comment.userIcon}
                                    alt="Icon Image"
                                    width={32}
                                    height={32}
                                    className="rounded-full h-full w-full object-cover aspect-1/1"
                                />
                                :
                                <div className="shrink-0 md:w-8 w-5 md:h-8 h-5 bg-lime-500 rounded-full" />
                        }
                    </>
                }
            </span>

            <CommentEditItem comment={comment} user={user} countLikes={comment._count.commentlikes} isLiked={isLiked} topicId={topicId} />
        </div>
    )
}