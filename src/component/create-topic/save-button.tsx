"use client";
import { AiOutlineLoading } from "react-icons/ai";
import { useFormStatus } from "react-dom";
import type { ButtonHTMLAttributes } from "react";

interface SaveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isSubmit: boolean;
}

export default function SaveButton({isSubmit, ...props}: SaveButtonProps) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            className={`mr-2 ${pending && !isSubmit ? "bg-blue-200 text-blue-500 cursor-progress flex items-center gap-3"  : "bg-transparent hover:bg-blue-200 hover:text-blue-500 text-black cursor-pointer"} font-[500] inline-block py-2 px-4 rounded-md text-center`}
            disabled={pending}
            {...props}
        >
            {pending && !isSubmit && <AiOutlineLoading className=" animate-spin text-black"/>}
            Save draft
        </button>
    )
}