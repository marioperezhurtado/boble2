import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { nanoid } from "nanoid";
import { s3Client } from "./s3Client";

export const IMAGE_UPLOAD_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const VIDEO_UPLOAD_MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
export const AUDIO_UPLOAD_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

type UploadFile = {
  file: File
  key: string
  contentType: "image" | "audio" | "video"
  sizeLimit: number
};

async function uploadFile({ file, key, contentType, sizeLimit }: UploadFile) {
  // Create presigned post data
  const presignedPostData = await createPresignedPost(s3Client, {
    Bucket: "boble-files",
    Key: key,
    Conditions: [
      ["content-length-range", 0, sizeLimit],
      ["starts-with", "$Content-Type", `${contentType}/`],
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
}

export async function uploadImage(file: File) {
  const imageId = `image_${nanoid(24)}`;

  await uploadFile({
    file, key: imageId,
    contentType: "image",
    sizeLimit: IMAGE_UPLOAD_MAX_FILE_SIZE
  });

  return imageId;
}

export async function uploadVideo(file: File) {
  const documentId = `video_${nanoid(24)}`;

  await uploadFile({
    file, key: documentId,
    contentType: "video",
    sizeLimit: VIDEO_UPLOAD_MAX_FILE_SIZE
  });

  return documentId;
}

export async function uploadAudio(file: File) {
  const documentId = `audio_${nanoid(24)}`;

  await uploadFile({
    file, key: documentId,
    contentType: "audio",
    sizeLimit: AUDIO_UPLOAD_MAX_FILE_SIZE
  });

  return documentId;
}
