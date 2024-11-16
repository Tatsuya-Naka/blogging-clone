"use client";
import Link from "next/link";
import { LuDot } from "react-icons/lu";
import TopicListsDateFormat from "../home/topic-date-format";
import { BsThreeDots } from "react-icons/bs";
import paths from "~/server/paths";
import type { Comment } from "@prisma/client";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import ReplyButton from "./reply-button";
import { FaBold, FaItalic } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import CommentEditButton from "./comment-edit-save";
import { useFormState } from "react-dom";
import * as actions from "~/actions";
import { MdOutlineCommentsDisabled } from "react-icons/md";
import CommentDeleteForm from "./comment-delete-form";
import { FiPaperclip } from "react-icons/fi";
import { FaListOl } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { TbLetterH } from "react-icons/tb";
import { ImQuotesLeft } from "react-icons/im";
import { IoMdCode } from "react-icons/io";
import { BiCodeBlock } from "react-icons/bi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaRegImage } from "react-icons/fa6";

interface CommentEditItemProps {
    comment: Comment;
    user?: {
        image?: string,
        id: string,
    },
    isLiked: boolean;
    countLikes: number;
    topicId: string;
}

export default function CommentEditItem({ comment, user, isLiked, countLikes, topicId }: CommentEditItemProps) {
    const [editList, setEditList] = useState(false);
    const [edit, setEdit] = useState(false);
    const [content, setContent] = useState(comment.content);
    const [deleteComment, setDeleteComment] = useState(false);

    const [formState, action] = useFormState(actions.CommentEditAction.bind(null, { commentId: comment.id, topicId: comment.topicId }), { errors: {} });

    const handleInputComment = (e: React.FormEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setContent(e.currentTarget.value);
    };

    useEffect(() => {
        if (formState.success) {
            setEdit(false);
            formState.success = false;
        }
    }, [formState]);

    return (
        <div className="flex flex-col w-full">
            {edit ?
                <form action={action}>
                    {/* Comment area */}
                    <div className={`${content.length > 0 && "relative"} flex flex-col flex min-w-0 mb-3 ${formState.errors.comment ? "bg-red-300" : "bg-white"} border-1 border-solid border-gray-200 rounded-md w-full`}>
                        <textarea
                            name="comment"
                            className={`${content.length > 0 ? "resize-y min-h-32 rounded-t-md" : "max-h-[40vh] min-h-16 resize-none rounded-md"} outline-none  w-full leading-base text-base p-2 border-2`}
                            placeholder="Add to the discussion"
                            onChange={handleInputComment}
                            value={content}
                            defaultValue={comment.content}
                        />
                        {content.length > 0 &&
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
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                >
                                    <FiPaperclip size={24} className="align-bottom font-[500]" />
                                </button>
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                >
                                    <FaListOl size={24} className="align-bottom font-[500]" />
                                </button>
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                >
                                    <FaListUl size={24} className="align-bottom font-[500]" />
                                </button>
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                >
                                    <TbLetterH size={24} className="align-bottom font-[500]" />
                                </button>
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                >
                                    <ImQuotesLeft size={24} className="align-bottom font-[500]" />
                                </button>
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                >
                                    <IoMdCode size={24} className="align-bottom font-[500]" />
                                </button>
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                >
                                    <BiCodeBlock size={24} className="align-bottom font-[500]" />
                                </button>
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                >
                                    <AiOutlineThunderbolt size={24} className="align-bottom font-[500]" />
                                </button>
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                >
                                    <FaRegImage size={24} className="align-bottom font-[500]" />
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
                    {content.length > 0 &&
                        <div className="flex items-center gap-3">
                            <CommentEditButton onClick={() => setEdit(false)} />
                        </div>
                    }
                </form>
                :
                <>
                    {comment.deleted ?
                        <div className="flex flex-col w-full">
                            <div className={`flex flex-col flex min-w-0 bg-white border-1 border-solid border-gray-200 rounded-md w-full`}>
                                <div className="px-3 py-1 italic text-gray-300 text-sm flex items-center gap-2">
                                    <MdOutlineCommentsDisabled />
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        </div>
                        :
                        <>
                            <div className="flex flex-col w-full">
                                {/* Comment area */}
                                <div className={`flex flex-col flex min-w-0 bg-white border-1 border-solid border-gray-200 rounded-md w-full`}>
                                    <div className=" min-h-16 rounded-md w-full leading-base text-base px-3 py-1 border-2">
                                        {/* Header */}
                                        <div className={`my-0 w-full flex items-center justify-between text-base text-gray-600 ${editList && "relative z-0"}`}>
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

                                            <button className="hover:bg-gray-100 rounded-full p-1"
                                                onClick={() => { setEditList(true) }}
                                            >
                                                <BsThreeDots size={18} className="rounded-full cursor-pointer " />
                                            </button>

                                            {editList && user && user.id === comment.userId &&
                                                <div className="absolute top-[26px] right-1 left-auto z-[100] min-w-[250px]">
                                                    <div className="m-2 rounded-md bg-white max-w-[250px] shadow-md border-gray-200 border-2 border-solid ">
                                                        <div className="px-4 py-2 flex flex-col">
                                                            {/* Header */}
                                                            <div className="mb-2 border-b-2 border-gray-200 border-solid flex justify-end">
                                                                <button
                                                                    type="button"
                                                                    className="p-1.5 bg-transparent hover:bg-indigo-200 rounded-md"
                                                                    onClick={() => setEditList(false)}
                                                                >
                                                                    <IoIosClose size={18} />
                                                                </button>
                                                            </div>
                                                            <ul className="flex flex-col gap-1">
                                                                <li>
                                                                    <button
                                                                        type="button"
                                                                        className="px-2 py-1 text-left bg-transparent hover:bg-indigo-100 rounded-md text-base text-black hover:text-indigo-500 w-full"
                                                                        onClick={() => { setEdit(true); setEditList(false) }}
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        type="button"
                                                                        className="px-2 py-1 text-left bg-transparent hover:bg-indigo-100 rounded-md text-base text-black hover:text-indigo-500 w-full"
                                                                        onClick={() => { setDeleteComment(true); setEditList(false) }}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>

                                        {/* Content */}
                                        <div className="text-base max-h-[30vh] overflow-y-scroll">
                                            {comment.content}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* The number of likes and comments */}
                            <ReplyButton comment={comment} user={user} countLikes={countLikes} isLiked={isLiked} topicId={topicId} />
                        </>
                    }
                </>
            }
            {deleteComment &&
                <div
                    className="relative inset-0 z-[999] w-full"
                >
                    <div className="fixed inset-0 bg-black opacity-60" />
                    <div className="fixed inset-0 w-full flex items-center justify-center">
                        <div className="bg-white rounded-md max-w-[680px] min-w-[480px]">
                            <div className="p-4 flex flex-col gap-2 w-full">
                                {/* Header */}
                                <div className="w-full flex items-center justify-between border-b-2 pb-2 border-solid border-gray-200">
                                    <h1 className="text-2xl font-[700] text-black">
                                        Delete Comment
                                    </h1>
                                    <button className="bg-transparent hover:bg-indigo-200 text-black hover:text-indigo-400 rounded-md"
                                        onClick={() => setDeleteComment(false)}
                                    >
                                        <IoIosClose size={24} className="p-1 w-full h-full" />
                                    </button>
                                </div>

                                {/* Content */}
                                <CommentDeleteForm commentId={comment.id} topicId={topicId} onClick={() => setDeleteComment(false)} onClose={() => setDeleteComment(false)}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}