"use server";

import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import paths from "~/server/paths";

interface DeleteReadingListState {
    errors: {
        _form?: string[];
    },
    success?: boolean;
}

export async function DeleteReadingList(bookmarkId: string ,formState: DeleteReadingListState): Promise<DeleteReadingListState> {
    const session = await getServerAuthSession();
    if (!session) {
        return {
            errors: {
                _form: ["You must signin or login first before doing this."]
            }
        };
    }

    try {
        await db.bookmark.delete({
            where: {id: bookmarkId}
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
                    _form: ["Something wrong."]
                }
            };
        }
    }

    revalidatePath(paths.readingListPage(session.user.id));

    return {
        errors: {},
        success: true,
    };
}