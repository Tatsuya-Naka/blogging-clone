import { db } from "~/server/db";
import TopicNotFound from "./not-found";
import TopicLeftSide from "./left-side";
import TopicCenter from "./center-page";
import TopicRightSide from "./right-side";

interface TopicMainCompProps {
    topicId: string;
}

export default async function TopicMainComp({ topicId }: TopicMainCompProps) {
    const topic = await db.topic.findFirst({
        where: { id: topicId },
        include: {
            tags: true,
            user: true,
            comments: {
                include: {
                    user: true,
                }
            }
        }
    });

    if (!topic) {
        return <TopicNotFound />
    }

    return (
        <div className="text-base w-full max-w-[1380px] mx-auto grid md:gap-2 lg:gap-4 md:grid-cols-[4rem_1fr] lg:grid-cols-[4rem_7fr_3fr] md:p-4 ">
            {/* Left side bar */}
            <TopicLeftSide />
            {/* Center page */}
            <TopicCenter topic={topic} />
            {/* Right bar */}
            <TopicRightSide user={topic.user} />
        </div>
    )
}