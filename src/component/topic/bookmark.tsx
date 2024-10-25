"use client";

import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { BookmarkOnOrOff } from "~/server/api/queries/bookmark";

interface BookmarkOnOrOffOnTopicPageProps {
    isBookmarked: boolean;
    topicId: string;
    children: React.ReactNode;
}

export default function BookmarkOnOrOffOnTopicPage({ isBookmarked, topicId, children }: BookmarkOnOrOffOnTopicPageProps) {

    const handleBookmark = async() => {
        await BookmarkOnOrOff(topicId);
    }
    
    return (
        <button
            type="button"
            className="flex inline-flex md:flex-col text0gray-700 items-center leading-base m-0"
            onClick={handleBookmark}
        >
            <p className="w-10 h-10 p-2">
                {!!isBookmarked ?
                    <IoBookmark size={24} className="fill-black" />
                    :
                    <CiBookmark size={24} className="fill-black" />
                }
            </p>
            <span className="md:min-w-auto md:ml-0 md:block text-gray-700 flex inline-flex min-w-6 ml-1">
                {/* book mark */}
                {children}
            </span>
        </button>
    )
}