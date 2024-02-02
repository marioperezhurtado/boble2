import { env } from "$env/dynamic/public";
import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: "eu-west-1",
  endpoint: env.PUBLIC_S3_URL,
  forcePathStyle: true,
  credentials: {
    accessKeyId: "S3RVER",
    secretAccessKey: "S3RVER",
  },
});
