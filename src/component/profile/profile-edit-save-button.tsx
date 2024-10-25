"use client";
import { useFormStatus } from "react-dom";
import { AiOutlineLoading } from "react-icons/ai";

interface ProfileEditSaveButtonProps {
    children: React.ReactNode;
}

export default function ProfileEditSaveButton({children}: ProfileEditSaveButtonProps) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            className={`text-white ${pending ? "bg-blue-800 flex items-center gap-2" : "bg-blue-700 hover:bg-blue-800"}  rounded-md inline-flex items-center justify-center m-1 w-full px-4 py-2 text-base font-[500] leading-base cursor-pointer`}
            disabled={pending}
        >
            {pending && <AiOutlineLoading size={24} className="flex items-center animate-spin text-white"/>}
            {children}
        </button>
    )
}