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

interface ProfileEditActionProps {
    errors: {
        name?: string[];
        bio?: string[];
        _form?: string[];
    },
    success?: boolean;
}

const ProfileEditActionSchema = z.object({
    name: z.string(),
    bio: z.string().max(200),
});

export async function ProfileEditAction(formState: ProfileEditActionProps, formData: FormData): Promise<ProfileEditActionProps> {
    const result = ProfileEditActionSchema.safeParse({
        name: formData.get("name"),
        bio: formData.get("bio"),
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
                _form: ["You must signin or login before doing this"]
            }
        };
    }

    const image = formData.get("image") as File;
    let publicUrl = "";

    // Post image to AWS S3
    if (image && image.size > 0) {
        try {
            const params = new PutObjectCommand({
                Bucket: env.S3_BUCKET_NAME,
                ContentType: "image/jpeg",
                Key: `${env.EDIT_PROFILE_PATH_FIRST}/${env.EDIT_PROFILE_PATH_SECOND}/${session.user.id}`
            })

            const presignedUrl = await getSignedUrl(client, params, {expiresIn: 60});

            const response = await fetch(presignedUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': image.type,
                },
                body: image,
            });

            if (!response.ok) {
                return {
                    errors: {
                        _form: ["Internal Server Error"]
                    }
                };
            }

            publicUrl = `https://${env.S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${env.EDIT_PROFILE_PATH_FIRST}/${env.EDIT_PROFILE_PATH_SECOND}/${session.user.id}`;

        } catch (err: unknown) {
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
                };
            }
        }
    }

    // update
    try {
        await db.user.update({
            where: {id: session.user.id},
            data: {
                name: result.data.name,
                bio: result.data.bio,
                image: publicUrl,
            }
        })
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

    revalidatePath(paths.profilePage(session.user.id));
    redirect(paths.profilePage(session.user.id));
}