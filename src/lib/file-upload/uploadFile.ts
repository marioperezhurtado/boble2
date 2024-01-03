import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { nanoid } from "nanoid";
import { s3Client } from "./s3Client";

export const IMAGE_UPLOAD_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const VIDEO_UPLOAD_MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
export const AUDIO_UPLOAD_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const DOCUMENT_UPLOAD_MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

type UploadFile = {
  file: File;
  key: string;
  contentType: "image/" | "audio/" | "video/" | "*/";
  sizeLimit: number;
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
  const imageId = `img_${nanoid(24)}`;

  await uploadFile({
    file,
    key: imageId,
    contentType: "image/",
    sizeLimit: IMAGE_UPLOAD_MAX_FILE_SIZE,
  });

  return imageId;
}

export async function uploadVideo(file: File) {
  const videoId = `video_${nanoid(24)}`;

  await uploadFile({
    file,
    key: videoId,
    contentType: "video/",
    sizeLimit: VIDEO_UPLOAD_MAX_FILE_SIZE,
  });

  return videoId;
}

export async function uploadAudio(file: File) {
  const audioId = `audio_${nanoid(24)}`;

  await uploadFile({
    file,
    key: audioId,
    contentType: "audio/",
    sizeLimit: AUDIO_UPLOAD_MAX_FILE_SIZE,
  });

  return audioId;
}

export async function uploadDocument(file: File) {
  const documentId = `doc_${nanoid(24)}`;

  await uploadFile({
    file,
    key: documentId,
    contentType: "*/",
    sizeLimit: DOCUMENT_UPLOAD_MAX_FILE_SIZE,
  });

  return documentId;
}
