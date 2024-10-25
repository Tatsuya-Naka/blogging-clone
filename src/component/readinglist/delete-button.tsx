"use client";

import type { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { AiOutlineLoading } from "react-icons/ai";

export default function DeleteReadingListButton({...props}: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { pending } = useFormStatus();

    return (
        <button
            className={`text-white px-4 py-2 rounded-md ${pending ? "bg-red-700 flex items-cente gap-2" : "hover:bg-red-700 bg-red-500"}`}
            type="submit"
            disabled={pending}
            {...props}
        >
            {pending && <AiOutlineLoading className=" animate-spin text-white"/>}
            Yes, delete this.
        </button>
    )
}