type DownloadFile = {
  url: string;
  type: string;
  createdAt: Date;
};

export async function downloadFile({ url, type, createdAt }: DownloadFile) {
  const dateInfo = `${createdAt.getFullYear()}-${
    createdAt.getMonth() + 1
  }-${createdAt.getDate()}`;
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
