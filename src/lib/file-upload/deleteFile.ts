import { env } from "$env/dynamic/public";
import { s3Client } from "./s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function deleteFile(key: string) {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: env.PUBLIC_S3_BUCKET_NAME,
      Key: key,
    })
  );
}
