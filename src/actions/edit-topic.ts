"use server";

import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { env } from "~/env";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import paths from "~/server/paths";
import { client } from "~/server/s3";

interface EditTopicActionProps {
    errors: {
        title?: string[];
        content?: string[];
        _form?: string[];
    },
    success?: boolean;
};

const EditTopicActionSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(20),
});

export async function EditTopicAction(topicId: string, formState: EditTopicActionProps, formData: FormData): Promise<EditTopicActionProps> {
    "use server";
    const session = await getServerAuthSession();

    if (!session) {
        return {
            errors: {
                _form: ["You must signin or login before doing this!"]
            }
        }
    }

    let isBgExist = false;
    try {
        const topic = await db.topic.findFirst({
            where: { id: topicId }
        });
        if (topic) {
            isBgExist = true;
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
                    _form: ["Something wrong"]
                }
            }
        }
    }

    const result = EditTopicActionSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        };
    }

    // AWS S3 Update or Post
    const bgImageFile = formData.get("coverImage") as File;
    let bgImageUrl = '';
    if (bgImageFile.size > 0) {
        const params = new PutObjectCommand({
            Bucket: env.S3_BUCKET_NAME,
            Key: `${env.CREATE_TOPIC_PATH}/${topicId}`,
            ContentType: 'image/jpeg',
        });
        const presignedurl = await getSignedUrl(client, params, { expiresIn: 60 });

        const response = await fetch(presignedurl, {
            method: 'PUT',
            headers: {
                'Content-Type': bgImageFile.type,
            },
            body: bgImageFile
        });
        if (!response.ok) {
            return {
                errors: {
                    _form: ["Internal Server Error"]
                }
            };
        }

        bgImageUrl = `https://${env.S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${env.CREATE_TOPIC_PATH}/${topicId}`;

    } else {
        // DELETE bgImage stored in S3
        if (isBgExist) {
            const params = new DeleteObjectCommand({
                Bucket: env.S3_BUCKET_NAME,
                Key: `${env.CREATE_TOPIC_PATH}/${topicId}`,
            });
            const presignedurl = await getSignedUrl(client, params, { expiresIn: 60 });

            const response = await fetch(presignedurl, {
                method: "DELETE",
            });
            if (!response.ok) {
                return {
                    errors: {
                        _form: ["Internal Server Error"]
                    }
                };
            }
        }
    }

    // databse tags are not included yet
    try {
        await db.topic.update({
            where: { id: topicId },
            data: {
                title: result.data.title,
                content: result.data.content,
                bgImage: bgImageUrl,
            }
        })
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
                    _form: ["Something wrong"]
                }
            }
        }
    }

    revalidatePath(paths.topicPage(topicId));
    redirect(paths.topicPage(topicId));
}