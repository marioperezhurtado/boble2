import { env } from "$env/dynamic/public";
import { env as envPrivate } from "$env/dynamic/private";
import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: "eu-west-3",
  endpoint: env.PUBLIC_S3_URL,
  forcePathStyle: true,
  credentials: {
    accessKeyId: envPrivate.S3_ACCESS_KEY_ID!,
    secretAccessKey: envPrivate.S3_SECRET_ACCESS_KEY!,
  },
});
