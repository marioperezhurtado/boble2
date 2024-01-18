import { type PresignedPost } from "@aws-sdk/s3-presigned-post";

type DownloadFile = {
  url: string;
  type: string;
  createdAt: Date;
};

export async function downloadFile({ url, type, createdAt }: DownloadFile) {
  const dateInfo = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}-${createdAt.getDate()}`;
  const timeInfo = `${createdAt.getHours()}-${createdAt.getMinutes()}-${createdAt.getSeconds()}`;

  // format: boble_<type>_<year>-<month>-<day>_<hour>-<minute>-<second>
  const fileName = `boble_${type}_${dateInfo}_${timeInfo}`;

  const response = await fetch(url);
  const blob = await response.blob();

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

export function formatFileSize(sizeInBytes: number) {
  const units = ["B", "KB", "MB", "GB", "TB"];

  if (sizeInBytes === 0) {
    return "0 B";
  }

  const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024));

  return `${Math.round(sizeInBytes / Math.pow(1024, i))} ${units[i]}`;
}

type UploadFile = {
  file: File;
  presignedPostData: PresignedPost;
};

export async function uploadFileFromClient({ file, presignedPostData }: UploadFile) {
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
