"use server";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { env } from "~/env";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import paths from "~/server/paths";
import { client } from "~/server/s3";

interface DeleteTopicState {
    errors: {
        _form?: string[];
    },
    success?: boolean;
}

export async function DeleteTopic(topicId: string): Promise<DeleteTopicState> {
    "use server";

    const session = await getServerAuthSession();
    if (!session) {
        return {
            errors: {
                _form: ["You need to signin or login before doing this action"]
            }
        };
    }

    let isExistBg = false;

    try {
        const topic = await db.topic.findFirst({
            where: { id: topicId }
        });
        if (!topic) {
            return {
                errors: {
                    _form: ["The topic is not found"]
                }
            }
        }
        if (topic?.bgImage) {
            isExistBg = true;
        }
    } catch (err) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something wrong']
                }
            }
        }
    }

    // Delete bgImage stored in AWS S3
    if (isExistBg) {
        try {
            const params = new DeleteObjectCommand({
                Bucket: env.S3_BUCKET_NAME,
                Key: `${env.CREATE_TOPIC_PATH}/${topicId}`,
            });
            const presignedUrl = await getSignedUrl(client, params, { expiresIn: 60 });

            const response = await fetch(presignedUrl, {
                method: "DELETE",
            });
            if (!response.ok) {
                return {
                    errors: {
                        _form: ["Internal Server Error"]
                    }
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                return {
                    errors: {
                        _form: [err.message]
                    }
                }
            }
            else {
                return {
                    errors: {
                        _form: ['Something wrong']
                    }
                }
            }
        }
    }

    // Delete data stored in database
    try {
        await db.topic.delete({
            where: { id: topicId }
        });
    } catch (err) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something wrong']
                }
            }
        }
    }

    // Go to Dashboard
    revalidatePath(paths.home());
    redirect(paths.home());

    return {
        errors: {},
        success: true,
    }
}