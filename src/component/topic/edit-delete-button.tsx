import { useFormStatus } from "react-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function EdtiDeleteButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={`${pending ? "bg-red-500 cursor-progress flex items-center gap-1" : "hover:bg-red-500 bg-red-600 cursor-pointer"} text-white px-4 py-2 text-base leading-base font-[500] flex items-center rounded-md`}
            disabled={pending}
        >
            {pending && <AiOutlineLoading3Quarters className="w-full h-full animate-spin"/>}
            Delete
        </button>
    )
}