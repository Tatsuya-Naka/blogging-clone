"use server";

import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import paths from "~/server/paths";

export async function LikeButtonSetting(topicId: string) {
    const session = await getServerAuthSession();

    if (session) {
        try {
            const like = await db.like.findFirst({
                where: { topicId: topicId, userId: session.user.id }
            });
            if (like) {
                await db.like.delete({
                    where: { id: like.id }
                })
            }
            else {
                await db.like.create({
                    data: {
                        topicId: topicId,
                        userId: session.user.id
                    }
                });
            }
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err.message);
            }
            else {
                console.log("Something wrong");
            }
        }
    }

    revalidatePath(paths.topicPage(topicId));
}

export async function CommentLikes(commentId: string, topicId: string) {
    const session = await getServerAuthSession();

    if (session) {
        try {
            const commentLike = await db.commentLike.findFirst({
                where: {commentId: commentId, userId: session.user.id, topicId: topicId},
            });
            if (commentLike) {
                await db.commentLike.delete({
                    where: {id: commentLike.id}
                })
            }
            else {
                await db.commentLike.create({
                    data: {
                        userId: session.user.id,
                        commentId,
                        topicId
                    }
                })
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err.message);
            }
            else {
                console.log("Something wrong");
            }
        }
    }

    revalidatePath(paths.topicPage(topicId));
}