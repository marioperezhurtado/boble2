import { s3Client } from "./s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function deleteFile(key: string) {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: "boble-files",
      Key: key,
    })
  );
}
