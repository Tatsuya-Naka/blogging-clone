"use server";

import type { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import paths from "~/server/paths";

interface HideArchiveActionState {
    errors: {
        _form?: string[];
    },
    success?: boolean;
}

export async function HideArchiveAction(topic: Topic): Promise<HideArchiveActionState> {
    const session = await getServerAuthSession();
    if (!session) {
        return {
            errors: {
                _form: ["You need to signin or login before doing this"]
            }
        };
    }

    try {
        await db.topic.update({
            where: {id: topic.id},
            data: {
                isPublic: !topic.isPublic,
            }
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            };
        }
        else {
            return {
                errors: {
                    _form: ["Something wrong"]
                }
            };
        }
    }

    revalidatePath(paths.topicPage(topic.id));
    redirect(paths.topicPage(topic.id));
}