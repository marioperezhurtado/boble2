import { createTRPCRouter, protectedProcedure } from "$lib/trpc/server/trpc";
import { createPresignedPost } from "$lib/file-upload/createPresignedPost";
import { nanoid } from "nanoid";

export const IMAGE_UPLOAD_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const VIDEO_UPLOAD_MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
export const AUDIO_UPLOAD_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const DOCUMENT_UPLOAD_MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const presignedPostRouter = createTRPCRouter({
  image:
    protectedProcedure
      .mutation(() => createPresignedPost({
        key: `img_${nanoid(24)}`,
        contentType: "image",
        sizeLimit: IMAGE_UPLOAD_MAX_FILE_SIZE
      })),
  video:
    protectedProcedure
      .mutation(() => createPresignedPost({
        key: `vid_${nanoid(24)}`,
        contentType: "video",
        sizeLimit: VIDEO_UPLOAD_MAX_FILE_SIZE
      })),
  audio:
    protectedProcedure
      .mutation(() => createPresignedPost({
        key: `aud_${nanoid(24)}`,
        contentType: "audio",
        sizeLimit: AUDIO_UPLOAD_MAX_FILE_SIZE
      })),
  document:
    protectedProcedure
      .mutation(() => createPresignedPost({
        key: `doc_${nanoid(24)}`,
        contentType: "*",
        sizeLimit: DOCUMENT_UPLOAD_MAX_FILE_SIZE
      }))
});
