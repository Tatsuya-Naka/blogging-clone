import { useFormStatus } from "react-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface EditHideArchiveButtonProps {
    children: React.ReactNode;
}

export default function EditHideArchiveButton({children}: EditHideArchiveButtonProps) {
    const {pending} = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className={`${pending ? "bg-red-500 cursor-progress flex items-center gap-1" : "hover:bg-red-500 bg-red-600 cursor-pointer"} text-white px-4 py-2 text-base leading-base font-[500] flex items-center rounded-md`}
        >
            {pending && <AiOutlineLoading3Quarters size={24} className=" animate-spin"/>}
            {children}
        </button>
    )
}