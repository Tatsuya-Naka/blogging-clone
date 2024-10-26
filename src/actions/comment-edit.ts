"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import paths from "~/server/paths";

;

interface CommentEditState {
    errors: {
        comment?: string[];
        _form?: string[];
    },
    success?: boolean;
}

interface CommentEditActionProps {
    commentId: string;
    topicId: string;
}

const CommentEditSchema = z.object({
    comment: z.string().min(5),
});

export async function CommentEditAction({commentId, topicId}: CommentEditActionProps, formState: CommentEditState, formData: FormData): Promise<CommentEditState> {
    const session = await getServerAuthSession();
    if (!session) {
        return {
            errors: {
                _form: ["You must signin or login before doing this"]
            }
        };
    }

    const result = CommentEditSchema.safeParse({
        comment: formData.get("comment"),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        await db.comment.update({
            where: {id: commentId},
            data: {
                content: result.data.comment,
            }
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            };
        } else {
            return {
                errors: {
                    _form: ["Something wrong"]
                }
            };
        }
    }

    revalidatePath(paths.topicPage(topicId))

    return {
        errors: {},
        success: true,
    };
}