import { S3Client } from "@aws-sdk/client-s3"
import { env } from "~/env"

export const client = new S3Client({
    credentials: {
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: env.AWS_ACCESS_KEY_ID,
    }
});