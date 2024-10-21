import { FcHighPriority } from "react-icons/fc";

export default async function TopicNotFound() {
    return (
        <div className="flex items-center justify-center gap-5 w-full ">
            <FcHighPriority className="text-2xl font-[700] animate-ping" />
            <h1 className="text-2xl font-[700]">
                Sorry, your requested purcahse record page is not found.
            </h1>
        </div>
    )
}