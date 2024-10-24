import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import paths from "~/server/paths";
import ForMoreInfo from "./for-more-info";

interface ProfileUserInforProps {
    userId: string;
}

export default async function ProfileUserInfo({ userId }: ProfileUserInforProps) {
    const session = await getServerAuthSession();

    const isUser = session?.user.id === userId;

    const userInfoAndTopics = await db.user.findFirst({
        where: { id: userId },
        include: {
            _count: {select: {topics: {
                where: isUser ? {} : {isPublic: true}
            }}},
            topics: {
                where: isUser ? {} : {isPublic: true},
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

    return (
        <div className="w-full">
            <ForMoreInfo userInfoAndTopics={userInfoAndTopics} totalComments={totalComments} userId={session?.user.id ?? ""}/>
        </div>

    )
}