"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { env } from "~/env";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import paths from "~/server/paths";
import { client } from "~/server/s3";

interface createTopicProps {
    errors: {
        title?: string[];
        tags?: string[];
        content?: string[];
        _form?: string[];
    },
    success?: boolean;
}

const createTopicSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(20),
})

export async function createTopic(isSubmit: boolean, formState: createTopicProps, formData: FormData): Promise<createTopicProps> {
    "use server";

    const topic = createTopicSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content")
    });

    if (!topic.success) {
        return {
            errors: topic.error.flatten().fieldErrors,
        };
    }

    const session = await getServerAuthSession();
    if (!session) {
        return {
            errors: {
                _form: ["You must signin or login to do this"]
            }
        };
    }

    // Get a new post Id
    let postId = "";
    try {
        const createPost = await db.topic.create({
            data: {
                userId: session.user.id
            },
        });
        postId = createPost.id;
    } catch(err) {
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

    const bgImageFile = formData.get("coverImage") as File;
    let bgImageUrl = '';

    if (bgImageFile.size > 0) {
        try {
            // S3 
            const params = new PutObjectCommand({
                Bucket: env.S3_BUCKET_NAME,
                Key: `${env.CREATE_TOPIC_PATH}/${postId}`,
                ContentType: 'image/jpeg',
            });

            console.log("BGImageFile Type: ", bgImageFile.type);
            const presignedurl = await getSignedUrl(client, params, { expiresIn: 60 });

            const response = await fetch(presignedurl, {
                method: 'PUT',
                headers: {
                    "Content-Type": bgImageFile.type,
                },
                body: bgImageFile,
            });

            if (!response.ok) {
                return {
                    errors: {
                        _form: ["Internal server error"]
                    }
                };
            }

            bgImageUrl = `https://${env.S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${env.CREATE_TOPIC_PATH}/${postId}`;
        }
        catch (err) {
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
    }

    // Put all data
    // Tags 
    try {
        await db.topic.update({
            where: {id: postId},
            data: {
                bgImage: bgImageUrl,
                title: topic.data.title,
                content: topic.data.content,
                isPublic: isSubmit,
            }
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
                    _form: ["Something wrong"]
                }
            }
        }
    }

    revalidatePath(paths.topicPage(postId));
    redirect(paths.topicPage(postId));

    return {
        errors: {},
        success: true,
    }
}