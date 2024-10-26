"use client";
import { useFormStatus } from "react-dom";
import { AiOutlineLoading } from "react-icons/ai";

export default function CommentDeleteButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={`px-2 py-1 ${pending ? "bg-red-700 flex items-center gap-2" : "bg-red-500 hover:bg-red-700"} text-white rounded-md`}
        >
            {pending && <AiOutlineLoading className="animate-spin text-white" />}
            Yes, delete this comment.
        </button>
    )
}