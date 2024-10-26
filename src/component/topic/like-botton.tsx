"use client";

import { RiHeartAdd2Line } from "react-icons/ri";
import { IoMdHeart } from "react-icons/io";
import { LikeButtonSetting } from "~/server/api/queries/like";

interface TopicLikeButtonProps {
    isLiked: boolean;
    topicId: string;
    children: React.ReactNode;
}

export default function TopicLikeButton({ isLiked, topicId, children }: TopicLikeButtonProps) {
    const handleLikeButton = async() => {
        await LikeButtonSetting(topicId);
    }

    return (
        <button
            type="button"
            className="flex inline-flex md:flex-col text0gray-700 items-center leading-base m-0"
            onClick={handleLikeButton}
        >
            <span className="w-10 h-10 p-2">
                {isLiked ?
                    <IoMdHeart size={24} className="fill-red-500"/>
                :
                    <RiHeartAdd2Line size={24} className="fill-black"/>
                }
            </span>

            <span className="md:min-w-auto md:ml-0 md:block text-gray-700 flex inline-flex min-w-6 ml-1">
                {/* Heart count */}
                {children}
            </span>
        </button>
    )
}