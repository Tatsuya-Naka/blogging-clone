"use client";
import type { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

export default function ReplyDismissButton({...props}: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { pending } = useFormStatus();

    return (
        <button
            type="button"
            className={`px-3 py-2 ${pending ? "opacity-60 cursor-not-allowed" : "bg-transparent cursor-pointer"} text-black rounded-md text-black`}
            disabled={pending}
            {...props}
        >
            Dismiss
        </button>
    )
}