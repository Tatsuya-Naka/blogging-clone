import { db } from "~/server/db";
import TopicNotFound from "./not-found";
import TopicLeftSide from "./left-side";
import TopicCenter from "./center-page";
import TopicRightSide from "./right-side";
import { getServerAuthSession } from "~/server/auth";

interface TopicMainCompProps {
    topicId: string;
}

export default async function TopicMainComp({ topicId }: TopicMainCompProps) {
    const session = await getServerAuthSession();

    const topic = await db.topic.findFirst({
        where: { id: topicId },
        include: {
            tags: true,
            user: true,
            comments: {
                include: {
                    user: true,
                }
            },
            _count: {select: {comments: {where: {deleted: false}}, bookmarks: true, likes: true}},
        }
    });

    let isBookedmarked = false;
    let isLiked = false;
    if (topic && session) {
        const bookmark = await db.bookmark.findFirst({
            where: {topicId: topic.id, userId: session.user.id},
        });
        if (bookmark) {
            isBookedmarked = true;
        }
        const like = await db.like.findFirst({
            where: {topicId: topic.id, userId: session.user.id}
        })
        if (like) {
            isLiked = true;
        }
    }

    if (!topic) {
        return <TopicNotFound />
    }

    return (
        <div className="text-base w-full max-w-[1380px] mx-auto grid md:gap-2 lg:gap-4 md:grid-cols-[4rem_1fr] lg:grid-cols-[4rem_7fr_3fr] md:p-4 ">
            {/* Left side bar */}
            <TopicLeftSide topicId={topic.id} comment={topic._count.comments} bookmark={topic._count.bookmarks} isBookmarked={isBookedmarked} like={topic._count.likes} isLiked={isLiked}/>
            {/* Center page */}
            <TopicCenter topic={topic} />
            {/* Right bar */}
            <TopicRightSide user={topic.user} />
        </div>
    )
}