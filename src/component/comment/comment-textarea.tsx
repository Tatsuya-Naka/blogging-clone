"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBold } from "react-icons/fa6";
import { FaItalic } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useFormState } from "react-dom";
import * as actions from "~/actions";
import CreateCommentButton from "./create-comment-button";

interface CommentTextAreaFormProps {
    userId: string;
    topicId: string;
    topicUserIcon?: string;
    defaultStyle: boolean;
    parentId?: string | null;
    ancestorId?: string | null;
    leafId?: string | null;
};

export default function CommentTextAreaForm({ userId, topicId, topicUserIcon, defaultStyle, parentId, ancestorId, leafId }: CommentTextAreaFormProps) {
    const [formState, action] = useFormState(actions.CreateComment.bind(null, { userId, topicId, parentId, ancestorId, leafId }), { errors: {} });
    console.log("Parent - ", parentId);
    console.log("AncestorId - ", ancestorId);

    const [clicked, setClicked] = useState(defaultStyle);
    const [comment, setComment] = useState("");

    const handleInputComment = (e: React.FormEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setComment(e.currentTarget.value);
    };

    useEffect(() => {
        if (formState.success) {
            setComment("");
            setClicked(false);
            formState.success = false;
        }
    }, [formState.success])

    return (
        <form className="flex mb-4" action={action}>
            <span
                className="mr-2 shrink-0 md:w-8 w-5 md:h-8 h-5 inline-block rounded-full align-middle"
            >
                {topicUserIcon ?

                    <Image
                        src={topicUserIcon}
                        alt="Icon Image"
                        width={32}
                        height={32}
                        className="rounded-full h-full w-full object-cover aspect-1/1"
                    />
                    :
                    <div className="shrink-0 md:w-8 w-5 md:h-8 h-5 bg-lime-500 rounded-full" />
                }
            </span>

            <div className="flex flex-col w-full">
                {/* Comment area */}
                <div className={`${clicked && "relative"} flex flex-col flex min-w-0 mb-3 ${formState.errors.comment ? "bg-red-300" : "bg-white"} border-1 border-solid border-gray-200 rounded-md w-full`}>
                    <textarea
                        name="comment"
                        className={`${clicked ? "resize-y min-h-32 rounded-t-md" : "max-h-[40vh] min-h-16 resize-none rounded-md"} outline-none  w-full leading-base text-base p-2 border-2`}
                        placeholder="Add to the discussion"
                        onClick={() => setClicked(true)}
                        onChange={handleInputComment}
                        value={comment}
                    />
                    {clicked &&
                        <div className="abolute bottom-0 left-0 right-0 rounded-b-md h-10 w-full bg-white border-2 shadow-sm border-solid border-gray-100 flex items-cenmter justify-between">
                            <div className="flex items-center gap-5 px-3 py-1">
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                >
                                    <FaBold size={24} className="align-bottom font-[500]" />
                                </button>
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                >
                                    <FaItalic size={24} className="align-bottom font-[500]" />
                                </button>
                            </div>

                            <div className="px-2 py-1 flex items-center">
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                >
                                    <HiDotsVertical size={24} className="align-bottom font-[500]" />
                                </button>
                            </div>
                        </div>
                    }
                    {!!formState.errors.comment && <div className="bg-red-300 tect-white w-full px-2 py-1 rounded-md">{formState.errors.comment}</div>}
                </div>
                {!!formState.errors._form && <div className="bg-red-500 text-white px-2 py-1 rounded-md w-full mb-2">{formState.errors._form}</div>}
                {/* Submit & Preview Button */}
                {clicked &&
                    <div className="flex items-center gap-3">
                        <CreateCommentButton comment={comment} />
                        <button
                            type="button"
                            className={`px-3 py-2 ${!!!comment ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-700 cursor-not-allowed"} text-white rounded-md text-black`}
                            disabled={!!!comment}
                        >
                            Preview
                        </button>
                    </div>
                }
            </div>
            
        </form>
    )
}