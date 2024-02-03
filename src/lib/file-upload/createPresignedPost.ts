import { createPresignedPost as createPresignedPostS3, } from "@aws-sdk/s3-presigned-post";
import { s3Client } from "./s3Client";

type GetPresignedPostData = {
  key: string
  contentType: "image" | "audio" | "video" | "*"
  sizeLimit: number
};

export async function createPresignedPost({ key, contentType, sizeLimit }: GetPresignedPostData) {
  return createPresignedPostS3(s3Client, {
    Bucket: "boble-files",
    Key: key,
    Conditions: [
      ["content-length-range", 0, sizeLimit],
      ["starts-with", "$Content-Type", `${contentType}/`],
    ],
  });
}
