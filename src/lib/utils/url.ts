import { env } from "$env/dynamic/public";

export function getFileUrl(fileId: string): string {
  return `${env.PUBLIC_S3_BUCKET_URL}/${fileId}`;
}
