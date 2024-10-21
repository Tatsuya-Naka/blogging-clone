import Link from "next/link"
import paths from "~/server/paths";

import PostDateFormatter from "../common/post-date-format";
import type { Topic } from "@prisma/client";

interface SearchTopicListsProps {
    topics: Topic[];
};

export default function SearchTopicLists({topics}: SearchTopicListsProps) {
    const lists = topics.map((topic) => {
        return (
            <li key={topic.id} className="p-2 border-b-2 border-b-solid border-b-gray-100">
                <Link
                    href={paths.topicPage(topic.id)}
                    className=""
                >
                    <p className="text-xs text-gray-500 ">
                        {/* User id */}
                        {topic.userId}
                    </p>
                    <p className="text-black font-[700] ">
                        {/* tipic title */}
                        {topic.title}
                    </p>
                    <p className="text-xs text-gray-500">
                        {/* Updated date */}
                        <PostDateFormatter date={topic.updatedAt}/>
                    </p>
                </Link>
            </li>
        )
    })
    return (
        <ul className="absolute top-10 right-0 left-0 bg-white rounded-md m-0 p-0 border-2 border-solid border-gray-100">
            {/* topic lists */}
            {lists}

            <footer className="bg-gray-200 rounded-b-md text-xs py-3 px-2 flex justify-between items-center ">
                <p className="text-sm">
                    Submit search for advanced filtering
                </p>
                <Link
                    href="https://github.com/Tatsuya-Naka"
                    className="text-sm font-[500] text-black"
                >
                    Powered by @Tatsuya
                </Link>
            </footer>
        </ul>
    )
}