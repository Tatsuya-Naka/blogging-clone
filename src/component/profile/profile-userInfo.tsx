import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import paths from "~/server/paths";
import ForMoreInfo from "./for-more-info";

interface ProfileUserInforProps {
    userId: string;
}

export default async function ProfileUserInfo({ userId }: ProfileUserInforProps) {
    const userInfoAndTopics = await db.user.findFirst({
        where: { id: userId },
        include: {
            _count: {select: {topics: true}},
            topics: {
                include: {
                    _count: {select: {comments: true}},
                },
            },
        },
    });

    if (!userInfoAndTopics) {
        redirect(paths.home())
    }
    const totalComments = userInfoAndTopics.topics.reduce(
        (sum, topics) => sum + topics._count.comments, 0
    );

    const session = await getServerAuthSession();

    return (
        <div className="w-full ">
            <ForMoreInfo userInfoAndTopics={userInfoAndTopics} totalComments={totalComments} userId={session?.user.id ?? ""}/>
        </div>

    )
}