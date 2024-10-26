"use client";
import type { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { AiOutlineLoading } from "react-icons/ai";

export default function CommentEditButton({...props}: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { pending } = useFormStatus();

    return (
        <>
            <button
                type="submit"
                className={`px-3 py-2 ${pending ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-800 text-white cursor-pointer"} ${pending && "flex flex-items-center gap-1"} text-white rounded-md`}
                disabled={pending}
            >
                {pending && <AiOutlineLoading className="w-full h-full animate-spin text-white" />}
                Submit
            </button>
            <button
                type="button"
                className={`px-3 py-2 ${pending ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-700 cursor-pointer"} text-white rounded-md text-black`}
                disabled={pending}
                {...props}
            >
                dismiss
            </button>
        </>
    )
}