"use client";
import { AiOutlineLoading } from "react-icons/ai";

import { useFormStatus } from "react-dom";
import type { ButtonHTMLAttributes } from "react";

interface PublishButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    isSubmit: boolean;
}

export default function PublishButton({isSubmit, ...props}: PublishButtonProps) {
    const {pending} = useFormStatus();

    return (
        <button
            type="submit"
            className={`mr-2 ${pending && isSubmit ? "bg-blue-800 cursor-progress flex items-center gap-3" : "bg-blue-600 cursor-pointer" } text-white hover:bg-blue-800 font-[500] inline-block py-2 px-4 rounded-md text-center`}
            disabled={pending}
            {...props}
        >
            {pending && isSubmit && <AiOutlineLoading className="animate-spin text-white"/>}
            Publish
        </button>
    )
}