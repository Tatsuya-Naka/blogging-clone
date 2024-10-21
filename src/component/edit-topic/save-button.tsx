import type { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { AiOutlineLoading } from "react-icons/ai";

interface EditSaveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isSaving: boolean;
}

export default function EditSaveButton({isSaving, ...props}: EditSaveButtonProps) {
    const {pending} = useFormStatus();

    return (
        <button
            type="submit"
            className={`mr-2 ${pending && isSaving ? "bg-blue-200 text-blue-500 cursor-progress flex items-center gap-3"  : "bg-transparent hover:bg-blue-200 hover:text-blue-500 text-black cursor-pointer"} font-[500] inline-block py-2 px-4 rounded-md text-center`}
            disabled={pending}
            {...props}
        >
            {pending && isSaving && <AiOutlineLoading className="w-full h-full animate-spin text-black"/>}
            Save
        </button>
    )
}