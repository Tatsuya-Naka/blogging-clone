import { FaRegComment } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import BookmarkOnOrOffOnTopicPage from "./bookmark";
import TopicLikeButton from "./like-botton";

interface TopicLeftSideProps {
    topicId: string;
    comment: number;
    bookmark: number;
    isBookmarked: boolean;
    like: number;
    isLiked: boolean;
}

export default async function TopicLeftSide({ topicId, comment, bookmark, isBookmarked, like, isLiked }: TopicLeftSideProps) {
    return (
        <div className="md:w-16 md:row-span-2">
            <div className="md:rounded-lg md:p-0 md:bg-gray-100 md:grid md:gap-5 md:sticky md:justify-stretch md:top-[128px] 
                            fixed shadow-md md:shadow-none rounded-md bg-white p-2 bottom-0 left-0 right-0 
                        ">
                <div className="md:grid flex md:gap-4 md:justify-stretch items-center justify-around">
                    {/* Like */}
                    <TopicLikeButton isLiked={isLiked} topicId={topicId}>
                        {like}
                    </TopicLikeButton>

                    {/* Comment */}
                    <button
                        type="button"
                        className="flex inline-flex md:flex-col text0gray-700 items-center leading-base m-0"
                    >
                        <span className="w-10 h-10 p-2">
                            <FaRegComment size={24} />
                        </span>

                        <span className="md:min-w-auto md:ml-0 md:block text-gray-700 flex inline-flex min-w-6 ml-1">
                            {/* comment count */}
                            {comment}
                        </span>
                    </button>

                    {/* Book Mark */}
                    <BookmarkOnOrOffOnTopicPage isBookmarked={isBookmarked} topicId={topicId} >
                        {bookmark}
                    </BookmarkOnOrOffOnTopicPage>
                    

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