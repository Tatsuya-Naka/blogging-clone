import { RiHeartAdd2Line } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface TopicCenterProps {
    topicId: string;
}

export default async function TopicLeftSide({ topicId }: TopicCenterProps) {
    return (
        <div className="md:w-16 md:row-span-2">
            <div className="md:rounded-lg md:p-0 md:bg-gray-100 md:grid md:gap-5 md:sticky md:justify-stretch md:top-[128px] 
                            fixed shadow-md md:shadow-none rounded-md bg-white p-2 bottom-0 left-0 right-0 
                        ">
                <div className="md:grid flex md:gap-4 md:justify-stretch items-center justify-around">
                    {/* Like */}
                    <button
                        type="button"
                        className="flex inline-flex md:flex-col text0gray-700 items-center leading-base m-0"
                    >
                        <span className="w-10 h-10 p-2">
                            <RiHeartAdd2Line size={24} />
                        </span>

                        <span className="md:min-w-auto md:ml-0 md:block text-gray-700 flex inline-flex min-w-6 ml-1">
                            {/* Heart count */}
                            0
                        </span>
                    </button>

                    {/* Comment */}
                    <button
                        type="button"
                        className="flex inline-flex md:flex-col text0gray-700 items-center leading-base m-0"
                    >
                        <span className="w-10 h-10 p-2">
                            <FaRegComment size={24} />
                        </span>

                        <span className="md:min-w-auto md:ml-0 md:block text-gray-700 flex inline-flex min-w-6 ml-1">
                            {/* Heart count */}
                            0
                        </span>
                    </button>

                    {/* Book Mark */}
                    <button
                        type="button"
                        className="flex inline-flex md:flex-col text0gray-700 items-center leading-base m-0"
                    >
                        <span className="w-10 h-10 p-2">
                            <FaRegBookmark size={24} />
                        </span>
                        <span className="md:min-w-auto md:ml-0 md:block text-gray-700 flex inline-flex min-w-6 ml-1">
                            {/* Heart count */}
                            0
                        </span>
                    </button>

                    {/* Copy link, details */}
                    <button
                        type="button"
                        className="flex inline-flex md:flex-col hover:bg-white rounded-full text-gray-700 items-center leading-base m-0"
                    >
                        <span className="w-10 h-10 p-2">
                            <HiOutlineDotsHorizontal size={24} className="rounded-full" />
                        </span>
                    </button>

                </div>
            </div>
        </div>
    )
}