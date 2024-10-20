"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

export async function createTopic(formState: createTopicProps, formData: FormData): Promise<createTopicProps> {
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

    const bgImageFile = formData.get("coverImage") as File;

    if (bgImageFile) {
        try {
            // S3 
            const params = new PutObjectCommand({
                Bucket: env.S3_BUCKET_NAME,
                Key: `topic/${session.user.id}`,
                ContentType: 'image/jpeg',
            });

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

    // console.log(bgImageFile);

    redirect(paths.home());

    return {
        errors: {},
        success: true,
    }
}