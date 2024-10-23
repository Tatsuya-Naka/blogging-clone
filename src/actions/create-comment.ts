"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import paths from "~/server/paths";

interface CreateCommentIDsProps {
    userId: string;
    topicId: string;
    parentId: string | null | undefined;
    ancestorId: string | null | undefined;
    leafId: string | null | undefined;
}

interface CreateCommentProps {
    errors: {
        comment?: string[],
        _form?: string[],
    },
    success?: boolean,
};

const CreateCommentSchema = z.object({
    comment: z.string().min(5),
});

export async function CreateComment({ userId, topicId, parentId, ancestorId, leafId }: CreateCommentIDsProps, formState: CreateCommentProps, formData: FormData): Promise<CreateCommentProps> {
    const result = CreateCommentSchema.safeParse({
        comment: formData.get("comment"),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const session = await getServerAuthSession();

    if (!session) {
        return {
            errors: {
                _form: ["You need to signin or login first before doing this"]
            }
        };
    }

    try {
        await db.comment.create({
            data: {
                content: result.data.comment,
                userId,
                userIcon: session.user.image ?? "",
                userName: session.user.name ?? "",
                topicId,
                parentId: parentId,
                ancestorId: ancestorId,
                leafId: leafId,
                isLast: true,
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
                    _form: ["Something happens"]
                }
            };
        }
    }

    // Update so that I can distinguish the last comment
    try {
        if (parentId) {
            await db.comment.update({
                where: { id: parentId },
                data: {
                    isLast: false,
                }
            })
        }
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
                    _form: ["Something happens"]
                }
            };
        }
    }

    revalidatePath(paths.topicPage(topicId));

    return {
        errors: {},
        success: true,
    }
}