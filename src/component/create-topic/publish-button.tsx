"use client";
import { AiOutlineLoading } from "react-icons/ai";

import { useFormStatus } from "react-dom";

export default function PublishButton() {
    const {pending} = useFormStatus();

    return (
        <button
            type="submit"
            className={`mr-2 ${pending ? "bg-blue-800 cursor-progress flex items-center gap-3" : "bg-blue-600 cursor-pointer" } text-white hover:bg-blue-800 font-[500] inline-block py-2 px-4 rounded-md text-center`}
            disabled={pending}
        >
            {pending && <AiOutlineLoading className="w-full h-full animate-spin text-white"/>}
            Publish
        </button>
    )
}