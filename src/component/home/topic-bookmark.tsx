"use client";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { BookmarkOnOrOff } from "~/server/api/queries/bookmark";

interface TopicListButtonProps {
    topicId: string;
    isBookmarked: boolean;
}

export default function TopicListButton({ topicId, isBookmarked }: TopicListButtonProps) {
    const handleBookmark = async () => {
        await BookmarkOnOrOff(topicId);
    }

    return (
        <button
            type="button"
            className="inline-block rounded-md text-center bg-transparent hover:bg-gray-100 p-2 text-black"
            onClick={handleBookmark}
        >
            <span className="inline-flex">
                {isBookmarked ?
                    <IoBookmark size={18} className="fill-black font-[700]" />
                    :                    
                    <CiBookmark size={18} className="fill-black font-[700]" />
                }
            </span>
        </button>
    )
}