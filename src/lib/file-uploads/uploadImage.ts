import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { nanoid } from "nanoid";

const UPLOAD_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const s3Client = new S3Client({
  region: "eu-west-1",
  endpoint: "http://localhost:5000",
  forcePathStyle: true,
  credentials: {
    accessKeyId: "S3RVER",
    secretAccessKey: "S3RVER",
  },
});

export async function uploadImage(file: File) {
  const imageId = `img_${nanoid(24)}`;

  // Create presigned post data
  const presignedPostData = await createPresignedPost(s3Client, {
    Bucket: "boble-files",
    Key: imageId,
    Conditions: [
      ["content-length-range", 0, UPLOAD_MAX_FILE_SIZE],
      ["starts-with", "$Content-Type", "image/"],
    ],
  });

  // Add presigned post data to form data
  const { url, fields } = presignedPostData;

  const data: Record<string, any> = {
    ...fields,
    "Content-Type": file.type,
    file,
  };

  const formData = new FormData();

  for (const name in data) {
    formData.append(name, data[name]);
  }

  // Upload file
  await fetch(url, {
    method: "POST",
    body: formData,
  });

  return imageId;
}
