"use server";

import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import paths from "~/server/paths";

export async function BookmarkOnOrOff(topicId: string) {
    const session = await getServerAuthSession();

    try {
        if (session) {
            const bookmark = await db.bookmark.findFirst({
                where: {
                    topicId: topicId,
                    userId: session?.user.id,
                },
            });
            if (bookmark) {
                await db.bookmark.delete({
                    where: {
                        id: bookmark.id
                    }
                });
            }
            else {
                await db.bookmark.create({
                    data: {
                        userId: session?.user.id ?? "",
                        topicId: topicId,
                    }
                })
            }
        }

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        else {
            console.log("Something wrong");
        }
    }

    revalidatePath(paths.home());
}