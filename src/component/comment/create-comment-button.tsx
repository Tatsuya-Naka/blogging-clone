"use client";
import { useFormStatus } from "react-dom";
import { AiOutlineLoading } from "react-icons/ai";

interface CreateCommentButtonProps {
    comment: string;
}

export default function CreateCommentButton({comment}: CreateCommentButtonProps) {
    const {pending} = useFormStatus();

    return (
        <button
            type="submit"
            className={`px-3 py-2 ${!!!comment || pending ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-800 text-white cursor-pointer"} ${pending && "flex flex-items-center gap-1"} text-white rounded-md`}
            disabled={!!!comment || pending}
        >
            {pending && <AiOutlineLoading className="w-full h-full animate-spin text-white"/>}
            Submit
        </button>
    )
}